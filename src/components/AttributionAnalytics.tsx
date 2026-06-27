import { useEffect, useState } from "react";
import { Coins, Activity, TrendingUp, RefreshCw, BarChart2, ShieldAlert } from "lucide-react";
import { AttributionData } from "../types";

interface AttributionAnalyticsProps {
  onShowNotification: (text: string) => void;
}

export default function AttributionAnalytics({ onShowNotification }: AttributionAnalyticsProps) {
  const [data, setData] = useState<AttributionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAttribution = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/attribution");
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      console.error("Error fetching attribution analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttribution();
  }, []);

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

  const attr = (data && data.channels) ? data : {
    channels: [],
    journeys: [],
    recommendations: []
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white font-display">
            Attribution Analytics
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#a2e7ff] font-mono mt-1">
            Track multi-touch conversion attribution scores and channel contribution indices
          </p>
        </div>
        <button 
          onClick={fetchAttribution}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-Calculate attribution
        </button>
      </div>

      {/* Main metrics breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Channel Contribution table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#a2e7ff]" /> Cross-Channel Value Contributions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-500">
                  <th className="py-3 font-mono uppercase">Channel</th>
                  <th className="py-3 font-mono uppercase">Contribution Share</th>
                  <th className="py-3 font-mono uppercase">Spend</th>
                  <th className="py-3 font-mono uppercase">Revenue</th>
                  <th className="py-3 font-mono uppercase text-right">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#c5c5d8]">
                {attr.channels.map((chan, idx) => (
                  <tr key={idx} className="hover:bg-white/1 transition-all">
                    <td className="py-4 font-bold text-white">{chan.channel}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold w-10 text-slate-200">{chan.contribution}%</span>
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${chan.contribution}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono">${chan.spend.toLocaleString()}</td>
                    <td className="py-4 font-mono text-[#a2e7ff]">${chan.revenue.toLocaleString()}</td>
                    <td className="py-4 font-mono text-emerald-400 text-right font-bold">{chan.roi}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Multi-Touch Journey Paths */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-300" /> Multi-Touch Conversion Journeys
            </h3>
            
            <div className="space-y-4">
              {attr.journeys.map((journey, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>PATH NODE MAP #{idx+1}</span>
                    <span className="text-[#a2e7ff] font-bold">{journey.percentage}% of converts</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-white">
                    {journey.path.map((node, nIdx) => (
                      <span key={nIdx} className="flex items-center gap-1.5">
                        <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-200">{node}</span>
                        {nIdx < journey.path.length - 1 && <span className="text-slate-500 text-[10px]">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6 text-[10px] font-mono text-slate-500 uppercase flex justify-between">
            <span>Core Model</span>
            <span className="text-cyan-300 font-bold">Data-Driven W-Shape</span>
          </div>
        </div>

      </div>

      {/* Algorithmic budget suggestions */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5">
        <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 border-b border-white/5 pb-3 flex items-center gap-2">
          <Coins className="w-4 h-4 text-emerald-300" /> Dynamic Budget Optimization Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {attr.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-xs text-[#c5c5d8] leading-relaxed relative overflow-hidden flex flex-col justify-between">
              <p>"{rec}"</p>
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono uppercase text-emerald-400 font-bold">
                <span>Confidence Index: 94%</span>
                <span>APPLY NOW →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
