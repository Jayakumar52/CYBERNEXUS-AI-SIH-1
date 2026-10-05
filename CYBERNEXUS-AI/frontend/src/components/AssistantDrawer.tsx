import React, { useState } from 'react';
import { X, Send, Sparkles, HelpCircle, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api.js';
import { AssistantResponse, PageId } from '../types/index.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

const PRESET_PROMPTS = [
  'What is our highest financial cyber risk today?',
  'Where should we spend ₹1 crore?',
  'What happens if we enable MFA for privileged users?',
  'Which asset has the highest risk?',
  'Which vulnerabilities contribute most to expected losses?',
  'What risk can be reduced by patching critical vulnerabilities?'
];

export const AssistantDrawer: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{
    id: string;
    role: 'user' | 'assistant';
    text: string;
    response?: AssistantResponse;
  }[]>([
    {
      id: 'init-1',
      role: 'assistant',
      text: 'Welcome to CYBERNEXUS AI Decision Intelligence. Ask any question regarding enterprise cyber risk exposure, asset vulnerabilities, what-if scenarios, or investment optimization.'
    }
  ]);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const q = (questionText || query).trim();
    if (!q || loading) return;

    const userMsgId = 'usr-' + Date.now();
    setConversation(prev => [...prev, { id: userMsgId, role: 'user', text: q }]);
    setQuery('');
    setLoading(true);

    try {
      const resp = await api.queryAssistant(q);
      setConversation(prev => [
        ...prev,
        {
          id: 'ast-' + Date.now(),
          role: 'assistant',
          text: resp.answer,
          response: resp
        }
      ]);
    } catch (err) {
      setConversation(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          text: 'Unable to query decision engine. Please try selecting one of the preset prompts below.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Ask CYBERNEXUS AI</h2>
              <p className="text-xs text-slate-500">Deterministic Natural Language Cyber Decision Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompts bar */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200 overflow-x-auto whitespace-nowrap space-x-2 flex">
          {PRESET_PROMPTS.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Key Metrics cards inside assistant response */}
                {msg.response && msg.response.keyMetrics && msg.response.keyMetrics.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2">
                    {msg.response.keyMetrics.map((km, i) => (
                      <div key={i} className="p-2 bg-white rounded border border-slate-200">
                        <div className="text-[11px] text-slate-500">{km.label}</div>
                        <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">{km.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Action Button */}
                {msg.response && msg.response.suggestedAction && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => {
                        onNavigate(msg.response!.suggestedAction!.targetPage as PageId);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-xs font-semibold transition-colors"
                    >
                      <span>{msg.response.suggestedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Follow-up Prompts */}
              {msg.response && msg.response.followUpQuestions && (
                <div className="mt-2 space-y-1 w-full max-w-[90%]">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Suggested Questions</div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.response.followUpQuestions.map((fq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(fq)}
                        className="text-left text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded border border-slate-200 transition-colors"
                      >
                        {fq}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-200 max-w-[70%]">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Querying local cyber risk engine & financial models...</span>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-3.5 border-t border-slate-200 bg-white">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask about risk, budget, MFA, vulnerabilities..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-1.5 text-[10px] text-slate-400 text-center">
            Local deterministic NLP engine · 100% free & open-source · SIH Hackathon Demo
          </div>
        </div>
      </div>
    </div>
  );
};
