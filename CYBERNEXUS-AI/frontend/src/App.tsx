import React, { useState, useEffect } from 'react';
import { PageId, EnterpriseMetrics, FinancialBreakdown, RiskDriver, Vulnerability, Asset, Control, AIRecommendation, ScenarioPreset, TelemetrySource, FrameworkScore, ComplianceControlMapping } from './types/index.js';
import { api } from './services/api.js';
import { Navbar } from './components/Navbar.js';
import { Sidebar } from './components/Sidebar.js';
import { AssistantDrawer } from './components/AssistantDrawer.js';
import { ExecutiveDemoModal } from './components/ExecutiveDemoModal.js';
import { ExplainabilityModal, ExplainabilityData } from './components/ExplainabilityModal.js';
import { DataRefreshBanner } from './components/DataRefreshBanner.js';

// Pages
import { LandingPage } from './pages/LandingPage.js';
import { OverviewPage } from './pages/OverviewPage.js';
import { RiskQuantificationPage } from './pages/RiskQuantificationPage.js';
import { RiskDriversPage } from './pages/RiskDriversPage.js';
import { AttackPathsPage } from './pages/AttackPathsPage.js';
import { AssetsPage } from './pages/AssetsPage.js';
import { VulnerabilitiesPage } from './pages/VulnerabilitiesPage.js';
import { ControlsPage } from './pages/ControlsPage.js';
import { RecommendationsPage } from './pages/RecommendationsPage.js';
import { ScenarioSimulatorPage } from './pages/ScenarioSimulatorPage.js';
import { InvestmentOptimizerPage } from './pages/InvestmentOptimizerPage.js';
import { CompliancePage } from './pages/CompliancePage.js';
import { ReportsPage } from './pages/ReportsPage.js';
import { DataSourcesPage } from './pages/DataSourcesPage.js';

export default function App() {
  const [showLanding, setShowLanding] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Modals and Drawers
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [explainabilityData, setExplainabilityData] = useState<ExplainabilityData | null>(null);
  const [isExplainabilityOpen, setIsExplainabilityOpen] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState<{ message: string; timestamp: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Application Data States
  const [metrics, setMetrics] = useState<EnterpriseMetrics>({
    enterpriseRiskScore: 78,
    totalFinancialExposureCr: 18.4,
    expectedAnnualLossCr: 7.8,
    riskReductionOpportunityCr: 5.2,
    currentSecurityInvestmentCr: 2.0,
    currentRosiPct: 260,
    overallIncidentProbabilityPct: 42,
    cyberVaR95Cr: 12.6,
    activeAssetsCount: 10,
    openCriticalVulnsCount: 2,
    unmitigatedRiskDriversCount: 6,
    lastTelemetryTimestamp: new Date().toISOString()
  });

  const [financialBreakdown, setFinancialBreakdown] = useState<FinancialBreakdown>({
    downtimeCostCr: 2.5,
    dataBreachCostCr: 3.0,
    recoveryCostCr: 1.2,
    regulatoryImpactCr: 0.8,
    businessDisruptionCr: 1.5,
    reputationImpactCr: 0.7,
    totalFinancialImpactCr: 9.7
  });

  const [historicalTrend, setHistoricalTrend] = useState<any[]>([]);
  const [riskDrivers, setRiskDrivers] = useState<RiskDriver[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioPreset[]>([]);
  const [sources, setSources] = useState<TelemetrySource[]>([]);
  const [frameworks, setFrameworks] = useState<FrameworkScore[]>([]);
  const [mappings, setMappings] = useState<ComplianceControlMapping[]>([]);
  const [overallReadinessPct, setOverallReadinessPct] = useState(82);

  // Initial Load
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [dash, asts, vulns, rd, ctrls, recs, scens, src, comp] = await Promise.all([
        api.getDashboard(),
        api.getAssets(),
        api.getVulnerabilities(),
        api.getRiskDrivers(),
        api.getControls(),
        api.getRecommendations(),
        api.getScenarios(),
        api.getSources(),
        api.getCompliance()
      ]);

      if (dash) {
        setMetrics(dash.metrics);
        setFinancialBreakdown(dash.financialBreakdown);
        setHistoricalTrend(dash.historicalTrend || []);
      }
      if (asts) setAssets(asts);
      if (vulns) setVulnerabilities(vulns);
      if (rd) setRiskDrivers(rd);
      if (ctrls) setControls(ctrls);
      if (recs) setRecommendations(recs);
      if (scens) setScenarios(scens);
      if (src) setSources(src);
      if (comp) {
        setFrameworks(comp.frameworkScores || []);
        setMappings(comp.mappings || []);
        setOverallReadinessPct(comp.overallReadinessPct || 82);
      }
    } catch (e) {
      console.error('Failed to load initial data', e);
    }
  };

  const handleRefreshTelemetry = async () => {
    setIsRefreshing(true);
    try {
      const res = await api.refreshTelemetry();
      if (res.updatedMetrics) {
        setMetrics(res.updatedMetrics);
      }
      setRefreshNotice({
        message: res.message,
        timestamp: res.refreshedAt
      });
      // Re-fetch dashboard data
      const dash = await api.getDashboard();
      if (dash) {
        setMetrics(dash.metrics);
        setFinancialBreakdown(dash.financialBreakdown);
      }
    } catch (e) {
      console.error('Telemetry refresh failed', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpenExplainability = (data: ExplainabilityData) => {
    setExplainabilityData(data);
    setIsExplainabilityOpen(true);
  };

  if (showLanding) {
    return (
      <LandingPage
        onEnter={() => setShowLanding(false)}
        onLaunchDemo={() => {
          setShowLanding(false);
          setIsDemoModalOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar following 3-Zone contract */}
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onRefreshTelemetry={handleRefreshTelemetry}
        isRefreshing={isRefreshing}
        demoMode={demoMode}
        onToggleDemoMode={() => setDemoMode(prev => !prev)}
        onToggleLanding={() => setShowLanding(prev => !prev)}
      />

      {/* Telemetry Refresh Notification Banner */}
      {refreshNotice && (
        <DataRefreshBanner
          message={refreshNotice.message}
          timestamp={refreshNotice.timestamp}
          onDismiss={() => setRefreshNotice(null)}
        />
      )}

      {/* Main Workspace: Sidebar Navigation + Dynamic Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* 13-Module Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {/* Viewport Frame */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto w-full">
          {activePage === 'overview' && (
            <OverviewPage
              metrics={metrics}
              financialBreakdown={financialBreakdown}
              topRiskDrivers={riskDrivers}
              recentVulnerabilities={vulnerabilities}
              historicalTrend={historicalTrend}
              onNavigate={setActivePage}
              onOpenExplainability={handleOpenExplainability}
            />
          )}

          {activePage === 'risk-quantification' && (
            <RiskQuantificationPage
              metrics={metrics}
              financialBreakdown={financialBreakdown}
              assets={assets}
              onOpenExplainability={handleOpenExplainability}
            />
          )}

          {activePage === 'risk-drivers' && (
            <RiskDriversPage
              riskDrivers={riskDrivers}
              onNavigate={setActivePage}
              onOpenExplainability={handleOpenExplainability}
            />
          )}

          {activePage === 'attack-paths' && (
            <AttackPathsPage
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'assets' && (
            <AssetsPage
              assets={assets}
              onNavigate={setActivePage}
              onOpenExplainability={handleOpenExplainability}
            />
          )}

          {activePage === 'vulnerabilities' && (
            <VulnerabilitiesPage
              vulnerabilities={vulnerabilities}
              onNavigate={setActivePage}
              onOpenExplainability={handleOpenExplainability}
            />
          )}

          {activePage === 'controls' && (
            <ControlsPage
              controls={controls}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'recommendations' && (
            <RecommendationsPage
              recommendations={recommendations}
              onNavigate={setActivePage}
              onOpenExplainability={handleOpenExplainability}
            />
          )}

          {activePage === 'scenarios' && (
            <ScenarioSimulatorPage
              scenarios={scenarios}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'investment' && (
            <InvestmentOptimizerPage
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'compliance' && (
            <CompliancePage
              frameworks={frameworks}
              mappings={mappings}
              overallReadinessPct={overallReadinessPct}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'reports' && (
            <ReportsPage
              metrics={metrics}
              topRiskDrivers={riskDrivers}
              vulnerabilities={vulnerabilities}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'sources' && (
            <DataSourcesPage
              sources={sources}
              onRefreshTelemetry={handleRefreshTelemetry}
              isRefreshing={isRefreshing}
              onNavigate={setActivePage}
            />
          )}
        </main>
      </div>

      {/* Explainable AI Math Inspector ("Why?" button) */}
      <ExplainabilityModal
        isOpen={isExplainabilityOpen}
        onClose={() => setIsExplainabilityOpen(false)}
        data={explainabilityData}
      />

      {/* Natural Language Cyber Risk Assistant ("Ask CYBERNEXUS AI") */}
      <AssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onNavigate={setActivePage}
      />

      {/* 3-5 Minute Guided SIH Executive Presentation Walkthrough */}
      <ExecutiveDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigate={setActivePage}
      />
    </div>
  );
}
