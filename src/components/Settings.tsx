import { useState } from "react";
import { Bolt, Key, Eye, HelpCircle, ShieldAlert, CheckCircle } from "lucide-react";

interface SettingsProps {
  industry: string;
  onSetIndustry: (val: string) => void;
  onShowNotification: (text: string) => void;
}

export default function Settings({ industry, onSetIndustry, onShowNotification }: SettingsProps) {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [mockMode, setMockMode] = useState(true);

  const handleSaveSettings = () => {
    onShowNotification("Application parameters updated! Recalculating metrics...");
  };

  const industriesList = [
    "SaaS & Enterprise B2B",
    "E-Commerce & Digital Retail",
    "Web3 & Blockchain Decentralization",
    "Healthtech & Personal Wellness",
    "Sustainable Goods & Green Tech"
  ];

  return (
    <div className="space-y-8 text-left max-w-4xl">
      {/* Title */}
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white font-display">
          Global Settings
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-[#bdc2ff] font-mono mt-1">
          Configure marketing sector variables, API gates, and simulation protocols
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings options */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Bolt className="w-4 h-4 text-cyan-300" /> Marketing Parameters
            </h3>

            {/* Industry vertical selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Target Industry Vertical</label>
              <div className="space-y-2">
                {industriesList.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => {
                      onSetIndustry(ind);
                      onShowNotification(`Industry vertical changed to: "${ind}"`);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-semibold flex justify-between items-center ${
                      industry === ind 
                        ? "bg-white/10 border-cyan-400 text-white" 
                        : "bg-white/2 border-white/5 text-slate-400 hover:border-white/10"
                    }`}
                  >
                    <span>{ind}</span>
                    {industry === ind && <CheckCircle className="w-4 h-4 text-cyan-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-6 py-3 rounded-lg bg-cyan-400 text-slate-950 hover:bg-[#a2e7ff] text-xs font-bold uppercase tracking-widest transition-all"
              >
                Save Custom Settings
              </button>
            </div>
          </div>
        </div>

        {/* Informational panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#bdc2ff] flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Key className="w-4 h-4" /> API Key Integration
            </h3>
            <p className="text-xs text-[#c5c5d8] leading-relaxed">
              Google Gemini API keys are automatically managed and injected via the secure platform secrets panel. 
            </p>
            <div className="p-3.5 bg-[#12131b]/60 border border-[#bdc2ff]/10 rounded-xl flex items-center gap-2 text-[10px] font-mono text-[#bdc2ff]">
              <Eye className="w-4.5 h-4.5" />
              <span>STATUS: KEY SECURED VIA OS PANEL</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 text-xs text-[#c5c5d8] leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-300">Data Isolation:</strong> All proprietary competitor lists and creative uploads are isolated server-side and never saved to public logs.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
