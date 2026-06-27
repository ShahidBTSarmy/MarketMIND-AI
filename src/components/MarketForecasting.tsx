import { useEffect, useState } from "react";
import { Compass, Sparkles, TrendingUp, HelpCircle, RefreshCw, Layers } from "lucide-react";
import { MarketForecast } from "../types";

interface MarketForecastingProps {
  industry: string;
  onShowNotification: (text: string) => void;
}

export default function MarketForecasting({ industry, onShowNotification }: MarketForecastingProps) {
  const [data, setData] = useState<MarketForecast | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/forecasting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      console.error("Error fetching market forecast:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [industry]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-2">
        <div className="h-12 w-1/4 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-56 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const forecast = (data && data.forecasts) ? data : {
    forecasts: [],
    executiveSummary: ""
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white font-display">
            Market Forecasting
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#bdc2ff] font-mono mt-1">
            Analyze predicted market demand waves and growth probabilities
          </p>
        </div>
        <button 
          onClick={fetchForecast}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-Project Market
        </button>
      </div>

      {/* Executive summary block */}
      <div className="glass-panel p-6 rounded-2xl border border-[#bdc2ff]/20 bg-indigo-500/5 relative overflow-hidden text-left">
        <div className="absolute -right-24 -top-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4 text-[#a2e7ff]" /> AI Executive Forecast Summary
        </h3>
        <p className="text-sm text-[#e3e1ed] leading-relaxed max-w-4xl font-medium">
          {forecast.executiveSummary}
        </p>
      </div>

      {/* Grid timelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {forecast.forecasts.map((fc, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-72 hover:border-[#bdc2ff]/30 transition-all duration-300 group">
            
            {/* Period Indicator */}
            <div className="flex justify-between items-start border-b border-white/5 pb-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{fc.period} Projection</span>
              <span className="text-[10px] bg-indigo-500/10 border border-indigo-400/20 text-[#bdc2ff] font-bold px-2 py-0.5 rounded uppercase font-mono">
                Match
              </span>
            </div>

            {/* Demand scores */}
            <div className="space-y-2 my-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Demand Score</span>
                <span className="text-2xl font-black text-white font-display">{fc.demandScore}<span className="text-xs font-normal text-slate-500">/100</span></span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#7886ff] to-[#bdc2ff]" style={{ width: `${fc.demandScore}%` }} />
              </div>
            </div>

            {/* Factors */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Catalyst Drivers</span>
              <div className="space-y-1">
                {fc.factors.map((f, fIdx) => (
                  <p key={fIdx} className="text-[10px] text-[#c5c5d8] leading-relaxed italic line-clamp-1">
                    • {f}
                  </p>
                ))}
              </div>
            </div>

            {/* Opportunity probability */}
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-500 uppercase">Opportunity Score</span>
              <span className="text-[#a2e7ff] font-bold">{fc.opportunityScore}% Probable</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
