import React, { useState } from 'react';
import { TelemetrySource, PageId } from '../types/index.js';
import { Radio, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Activity, Database, Server } from 'lucide-react';

interface Props {
  sources: TelemetrySource[];
  onRefreshTelemetry: () => void;
  isRefreshing: boolean;
  onNavigate: (page: PageId) => void;
}

export const DataSourcesPage: React.FC<Props> = ({
  sources,
  onRefreshTelemetry,
  isRefreshing,
  onNavigate
}) => {
  const [telemetryLogs, setTelemetryLogs] = useState<{ time: string; source: string; message: string }[]>([
    { time: '10:02:14', source: 'Qualys VMDR', message: 'Vulnerability scan complete. 184 CVEs normalized. Open CVSS 9.8 flagged.' },
    { time: '10:01:45', source: 'Azure AD', message: 'IAM audit log synchronized. 29 accounts detected lacking FIDO2 MFA.' },
    { time: '10:00:12', source: 'CrowdStrike', message: 'Sensor health check: 3,550 active endpoints. 1,450 sensor gaps reported.' },
    { time: '09:58:30', source: 'Prisma Cloud', message: 'CSPM continuous audit: S3 bucket KYC archive read-policy flag updated.' },
    { time: '09:55:00', source: 'Mandiant OTX', message: 'Threat feed sync: 420 active ransomware & banking trojan campaigns tracked.' }
  ]);

  const handleManualRefresh = () => {
    onRefreshTelemetry();
    const newLog = {
      time: new Date().toLocaleTimeString(),
      source: 'Telemetry Pipeline',
      message: 'Batch normalization triggered. Mathematical models recalculated risk and financial exposure.'
    };
    setTelemetryLogs(prev => [newLog, ...prev.slice(0, 7)]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <Radio className="w-4 h-4" />
              <span>Simulated Ingestion Connectors</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Enterprise Security Telemetry Sources</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Demo Mode — Synthetic Enterprise Telemetry: CYBERNEXUS AI continuously aggregates signals from vulnerability scanners, SIEM logs, IAM directories, EDR agents, and threat intelligence.
            </p>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Ingesting Feeds...' : 'Refresh Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map(src => {
          const isDegraded = src.health === 'Degraded';
          return (
            <div
              key={src.id}
              className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">{src.type}</span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className={`w-2 h-2 rounded-full ${isDegraded ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                    <span className={isDegraded ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}>
                      {src.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{src.name}</h3>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Records Ingested:</span>
                    <span className="text-slate-900 font-medium truncate max-w-[170px] text-right">{src.ingestedRecords}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coverage:</span>
                    <span className="text-slate-900 font-bold">{src.coveragePct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Telemetry:</span>
                    <span className="text-slate-700">{src.lastSync}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className={isDegraded ? 'text-amber-600' : 'text-emerald-600'}>
                  {isDegraded ? 'Coverage Gap Detected' : 'Feed Nominal'}
                </span>
                <span className="text-slate-400 font-mono">API v2.4</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Live Stream Feed Log */}
      <div className="bg-slate-900 text-white rounded-lg p-5">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Normalized Security Ingestion Stream
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">● LIVE INGESTION ACTIVE</span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
          {telemetryLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-3 py-1 border-b border-slate-800/60 text-slate-300">
              <span className="text-slate-500 shrink-0">{log.time}</span>
              <span className="text-blue-400 font-semibold shrink-0">[{log.source}]</span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
