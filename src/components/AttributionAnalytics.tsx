import { useEffect, useState } from "react";
import { Coins, Activity, RefreshCw, BarChart2 } from "lucide-react";
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
      if (resData && resData.channels && resData.channels.length > 0) {
        setData(resData);
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      console.warn("Using client-side fallback attribution analytics:", err);
      const fallback: AttributionData = {
        channels: [
          { channel: "Google Ads", contribution: 35, spend: 12000, revenue: 54000, roi: 4.5, conversions: 620 },
          { channel: "Meta Ads", contribution: 28, spend: 10000, revenue: 38000, roi: 3.8, conversions: 490 },
          { channel: "Instagram Organic", contribution: 15, spend: 1500, revenue: 18000, roi: 12.0, conversions: 210 },
          { channel: "LinkedIn Paid", contribution: 12, spend: 6000, revenue: 15600, roi: 2.6, conversions: 115 },
          { channel: "Email Direct", contribution: 10, spend: 800, revenue: 24000, roi: 30.0, conversions: 440 }
        ],
        journeys: [
          { path: ["Organic Search", "Meta Ad", "Direct Purchase"], percentage: 42 },
          { path: ["Email Newsletter", "Direct Purchase"], percentage: 28 },
          { path: ["Instagram Video", "Google Ad", "Direct Purchase"], percentage: 18 }
        ],
        recommendations: [
          "Reallocate $3,000 from LinkedIn Paid to Meta Ads to leverage lower CPC rates.",
          "Expand Instagram Organic creator integrations as it is currently returning an outstanding 12.0x ROI.",
          "Integrate automated abandoned cart emails to capture high attribution multi-touch user journeys."
        ]
      };
      setData(fallback);
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
        <div className="h-12 w-1/4 bg-[#111111]/10 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-72 bg-[#111111]/5 rounded-xl border-2 border-[#111111]/10" />
          <div className="h-72 bg-[#111111]/5 rounded-xl border-2 border-[#111111]/10" />
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
      {/* Title block matching Bauhaus style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#111111] pb-6 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
            Attribution Analytics
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
            Track multi-touch conversion attribution scores and channel contribution indices
          </p>
        </div>
        <button 
          onClick={fetchAttribution}
          className="px-4 py-2.5 rounded bg-white border-2 border-[#111111] text-xs font-bold text-[#111111] hover:bg-[#FFE600] transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-Calculate attribution
        </button>
      </div>

      {/* Main metrics breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Channel Contribution table */}
        <div className="lg:col-span-8 p-6 rounded-2xl border-3 border-[#111111] bg-white shadow-[5px_5px_0px_0px_#111111]">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#111111] border-b-2 border-[#111111] pb-3 mb-4 flex items-center gap-2 font-display">
            <BarChart2 className="w-4 h-4 text-[#0040FF]" /> Cross-Channel Value Contributions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#111111] text-slate-700">
                  <th className="py-3 font-mono uppercase font-bold">Channel</th>
                  <th className="py-3 font-mono uppercase font-bold">Contribution Share</th>
                  <th className="py-3 font-mono uppercase font-bold">Spend</th>
                  <th className="py-3 font-mono uppercase font-bold">Revenue</th>
                  <th className="py-3 font-mono uppercase text-right font-bold">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100 text-[#111111] font-bold">
                {attr.channels.map((chan, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-all">
                    <td className="py-4 font-black text-[#111111]">{chan.channel}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black w-10 text-slate-800">{chan.contribution}%</span>
                        <div className="w-24 h-2 bg-slate-200 border border-[#111111] rounded overflow-hidden">
                          <div className="h-full bg-[#0040FF]" style={{ width: `${chan.contribution}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono font-black">${chan.spend.toLocaleString()}</td>
                    <td className="py-4 font-mono font-black text-[#0040FF]">${chan.revenue.toLocaleString()}</td>
                    <td className="py-4 font-mono text-[#00D180] text-right font-black">{chan.roi}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Multi-Touch Journey Paths */}
        <div className="lg:col-span-4 p-6 rounded-2xl border-3 border-[#111111] bg-white shadow-[5px_5px_0px_0px_#111111] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#111111] border-b-2 border-[#111111] pb-3 mb-4 flex items-center gap-2 font-display">
              <Activity className="w-4 h-4 text-[#FF3B30]" /> Multi-Touch Conversion Journeys
            </h3>
            
            <div className="space-y-4">
              {attr.journeys.map((journey, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] space-y-2">
                  <div className="flex justify-between text-[9px] font-mono text-slate-600 font-bold">
                    <span>PATH NODE MAP #{idx+1}</span>
                    <span className="text-[#0040FF] font-black">{journey.percentage}% of converts</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-[#111111] font-bold">
                    {journey.path.map((node, nIdx) => (
                      <span key={nIdx} className="flex items-center gap-1.5">
                        <span className="bg-white border border-[#111111] px-2 py-0.5 rounded text-slate-800">{node}</span>
                        {nIdx < journey.path.length - 1 && <span className="text-slate-500 text-[10px]">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-[#111111] pt-4 mt-6 text-[10px] font-mono text-slate-600 font-bold uppercase flex justify-between">
            <span>Core Model</span>
            <span className="text-[#0040FF] font-black">Data-Driven W-Shape</span>
          </div>
        </div>

      </div>

      {/* Algorithmic budget suggestions */}
      <div className="p-6 rounded-2xl border-3 border-[#111111] bg-white shadow-[5px_5px_0px_0px_#111111]">
        <h4 className="text-sm font-black uppercase tracking-wider text-[#FF3B30] border-b-2 border-[#111111] pb-3 flex items-center gap-2 font-display">
          <Coins className="w-4 h-4 text-[#FF3B30]" /> Dynamic Budget Optimization Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {attr.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-[#FAF8F5] border-2 border-[#111111] rounded-xl text-xs text-[#111111] font-semibold leading-relaxed relative overflow-hidden flex flex-col justify-between shadow-[2px_2px_0px_0px_#111111]">
              <p>"{rec}"</p>
              <div className="mt-4 pt-3 border-t-2 border-[#111111] flex justify-between items-center text-[9px] font-mono uppercase text-[#0040FF] font-black">
                <span>Confidence Index: 94%</span>
                <span className="hover:underline cursor-pointer">APPLY NOW →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
