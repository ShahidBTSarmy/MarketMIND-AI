import { useEffect, useState, FormEvent } from "react";
import { Search, Sparkles, Activity, ShieldAlert, TrendingUp, RefreshCw } from "lucide-react";
import { CompetitorData } from "../types";

interface CompetitorIntelProps {
  industry: string;
  onShowNotification: (text: string) => void;
}

export default function CompetitorIntel({ industry, onShowNotification }: CompetitorIntelProps) {
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCompName, setNewCompName] = useState("");

  const fetchCompetitors = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      const data = await response.json();
      setCompetitors(data);
    } catch (err) {
      console.error("Error fetching competitor data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors();
  }, [industry]);

  const handleAddCompetitor = (e: FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    // Dynamically insert a new competitor mock tracker
    const added: CompetitorData = {
      id: `comp_${Date.now()}`,
      name: newCompName.trim(),
      marketShare: 12,
      growthRate: 8.5,
      pricingAlerts: ["Introduced basic quarterly subscription tier with 10% saving"],
      recentLaunches: ["New mobile application optimized for Android"],
      shareOfVoice: 9,
      adSpendScore: 4,
      sentimentScore: 68,
      socialFollowing: [
        { platform: "LinkedIn", count: "30K", growth: "+5.1%" }
      ],
      recommendation: `Aggressively position your brand's unique capabilities against ${newCompName.trim()}'s limited visual options.`
    };

    setCompetitors(prev => [...prev, added]);
    onShowNotification(`Competitor tracker initiated for: "${newCompName.trim()}"`);
    setNewCompName("");
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-2">
        <div className="h-12 w-1/4 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-72 bg-white/5 rounded-xl" />
          <div className="h-72 bg-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-4 border-[#111111] pb-6 gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
            Competitor Intelligence
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
            Track pricing alterations, launch signals, and market share indices
          </p>
        </div>

        {/* Competitor creation field */}
        <form onSubmit={handleAddCompetitor} className="flex gap-2 w-full lg:w-auto">
          <input 
            type="text" 
            value={newCompName}
            onChange={(e) => setNewCompName(e.target.value)}
            placeholder="Add competitor brand name..."
            className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
          />
          <button 
            type="submit"
            className="px-5 py-2.5 rounded bg-[#FFE600] text-black border-3 border-[#111111] font-black shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase tracking-widest"
          >
            Add Tracker
          </button>
        </form>
      </div>

      {/* Competitor Matrix Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {competitors.map((comp) => (
          <div key={comp.id} className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white flex flex-col justify-between space-y-6 shadow-[5px_5px_0px_0px_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300">
            
            {/* Header Scorecard */}
            <div className="flex justify-between items-start border-b-2 border-[#111111] pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">Active Competitor Node</span>
                <h3 className="text-2xl font-black text-[#111111] mt-1 uppercase tracking-tight">{comp.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono uppercase text-slate-600 font-bold block">Market Share</span>
                <span className="text-2xl font-black text-[#0040FF]">{comp.marketShare}%</span>
              </div>
            </div>

            {/* Metrics division */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Growth MoM</span>
                <span className={`text-lg font-black ${comp.growthRate > 0 ? "text-[#00D180]" : "text-[#FF3B30]"}`}>
                  {comp.growthRate > 0 ? `+${comp.growthRate}%` : `${comp.growthRate}%`}
                </span>
              </div>
              <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Share of Voice</span>
                <span className="text-lg font-black text-[#0040FF]">{comp.shareOfVoice}%</span>
              </div>
            </div>

            {/* Alerts Log */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-black text-[#FF3B30] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#FF3B30]" /> Pricing & Launch Signals
              </span>
              <div className="bg-[#FAF8F5] p-4 border-2 border-[#111111] text-xs space-y-3 shadow-[2px_2px_0px_0px_#111111] text-[#111111] font-medium">
                {comp.pricingAlerts.map((alert, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500 border border-black mt-1.5 flex-shrink-0" />
                    <p className="italic">"{alert}"</p>
                  </div>
                ))}
                {comp.recentLaunches.map((launch, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-[#0040FF]">
                    <span className="w-2 h-2 rounded-full bg-[#0040FF] border border-black mt-1.5 flex-shrink-0" />
                    <p className="italic">Launch: "{launch}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="space-y-2 bg-[#FFE600]/10 border-2 border-[#111111] p-4 rounded-xl text-xs text-[#111111] shadow-[2px_2px_0px_0px_#111111]">
              <span className="text-[10px] font-mono font-black text-[#0040FF] uppercase block mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#0040FF]" /> Positioning Strategy
              </span>
              <p className="leading-relaxed text-[#111111] font-semibold">{comp.recommendation}</p>
            </div>

          </div>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white shadow-[6px_6px_0px_0px_#111111]">
        <h4 className="text-sm font-black uppercase tracking-wider text-[#111111] border-b-2 border-[#111111] pb-3 mb-4 font-display">
          Cross-Channel Positioning Matrix
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#111111] text-slate-700">
                <th className="py-3 font-mono uppercase font-bold">Competitor Name</th>
                <th className="py-3 font-mono uppercase font-bold">Ad Spend Efficiency</th>
                <th className="py-3 font-mono uppercase font-bold">Social Sentiment</th>
                <th className="py-3 font-mono uppercase font-bold">Primary Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100 text-[#111111] font-bold">
              {competitors.map((comp) => (
                <tr key={comp.id}>
                  <td className="py-4 font-black text-[#111111]">{comp.name}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-850">{comp.adSpendScore}/10</span>
                      <div className="w-16 h-2 bg-slate-200 border border-[#111111] rounded overflow-hidden">
                        <div className="h-full bg-[#0040FF]" style={{ width: `${comp.adSpendScore * 10}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-[#00D180] font-black">{comp.sentimentScore}/100</span>
                  </td>
                  <td className="py-4 font-mono text-[#0040FF]">
                    {comp.socialFollowing[0]?.platform || "LinkedIn"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
