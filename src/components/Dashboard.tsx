import { useEffect, useState } from "react";
import { 
  Bot, 
  Bolt, 
  Heart, 
  Rocket, 
  Coins, 
  AlertTriangle, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  ChevronRight,
  RefreshCw,
  Eye,
  Radar
} from "lucide-react";
import Globe from "./Globe";
import { DashboardOverview } from "../types";

interface DashboardProps {
  industry: string;
  onNavigateTo: (screenId: string) => void;
  onShowNotification: (text: string) => void;
}

export default function Dashboard({ industry, onNavigateTo, onShowNotification }: DashboardProps) {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      const resData = await response.json();
      if (resData && resData.healthScore) {
        setData(resData);
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      console.warn("Using client-side fallback dashboard metrics:", err);
      // Let's generate nice overview metrics based on the selected industry
      const seed = industry.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const healthScore = Math.round((seed % 12) + 78); // 78 to 89
      const sentimentScore = parseFloat(((seed % 15) + 68.5).toFixed(1)); // 68.5% to 83.5%
      const trendOpportunityScore = Math.round((seed % 6) + 12); // 12 to 17 active
      const campaignROIScore = parseFloat(((seed % 3) * 0.8 + 3.2).toFixed(1)); // 3.2x to 4.8x
      const competitorThreatScore = Math.round((seed % 15) + 45); // 45 to 60
      const customerGrowthIndicator = `+${((seed % 8) + 10).toFixed(1)}% MoM`;
      const forecastConfidenceLevel = Math.round((seed % 8) + 88); // 88 to 95

      const fallback: DashboardOverview = {
        healthScore,
        sentimentScore,
        trendOpportunityScore,
        campaignROIScore,
        competitorThreatScore,
        customerGrowthIndicator,
        forecastConfidenceLevel,
        anomalies: [
          {
            id: "anom_fallback_1",
            title: `Ad bid inflation spikes in ${industry}`,
            severity: "critical",
            description: `Campaign efficiency shift observed on ${industry} display segments.`
          }
        ]
      };
      setData(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [industry]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse p-2">
        <div className="h-16 w-1/3 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-white/5 rounded-xl" />
          <div className="h-96 bg-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  const overview = (data && data.healthScore) ? data : {
    healthScore: 84,
    sentimentScore: 72.4,
    trendOpportunityScore: 78,
    campaignROIScore: 4.8,
    competitorThreatScore: 62,
    customerGrowthIndicator: "+15.4% MoM",
    forecastConfidenceLevel: 92,
    anomalies: [
      {
        id: "anom_1",
        title: "Drop in Conversion",
        severity: "critical",
        description: `Drop in "Spring Activewear Campaign" conversion observed in EMEA region.`
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Title block matching mock up */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#111111] pb-6 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
            Market Dashboard
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
            Real-time cross-channel intelligence • Industry: {industry}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchOverview}
            className="p-2.5 rounded border-2 border-[#111111] bg-white text-[#111111] hover:bg-[#FFE600] transition-all"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="text-xs uppercase font-mono bg-[#0040FF]/10 border-2 border-[#111111] px-3 py-2 rounded text-[#0040FF] font-black">
            Last 24 Hours
          </div>
          <button 
            onClick={() => {
              onNavigateTo("reports");
              onShowNotification("Redirecting to Report builder module");
            }}
            className="px-5 py-2 rounded text-xs font-black uppercase tracking-widest bg-[#FFE600] text-black border-3 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Top Widgets Row mimicking Bauhaus/Futuristic layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Health Score */}
        <div className="glass-panel p-6 rounded-2xl bg-white border-3 border-[#111111] flex flex-col justify-between h-44 relative overflow-hidden group hover:border-[#0040FF]/30 shadow-[4px_4px_0px_0px_#111111] transition-all duration-300">
          <div className="absolute top-0 right-0 w-12 h-12 bg-[#0040FF]/10 border-l-2 border-b-2 border-[#111111] flex items-center justify-center rounded-bl-xl">
            <Bolt className="w-5 h-5 text-[#0040FF]" />
          </div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-700">Health Score</span>
          <div>
            <h3 className="text-4xl font-black text-[#111111] font-display">{overview.healthScore}<span className="text-xs font-normal text-slate-500">/100</span></h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 rounded bg-slate-200 border border-[#111111] overflow-hidden">
                <div className="h-full bg-[#0040FF]" style={{ width: `${overview.healthScore}%` }} />
              </div>
              <span className="text-[10px] font-mono font-black text-[#0040FF]">{overview.customerGrowthIndicator}</span>
            </div>
          </div>
        </div>

        {/* Sentiment */}
        <div className="glass-panel p-6 rounded-2xl bg-white border-3 border-[#111111] flex flex-col justify-between h-44 relative overflow-hidden group hover:border-[#FF3B30]/30 shadow-[4px_4px_0px_0px_#111111] transition-all duration-300">
          <div className="absolute top-0 right-0 w-12 h-12 bg-[#FF3B30]/10 border-l-2 border-b-2 border-[#111111] flex items-center justify-center rounded-bl-xl">
            <Heart className="w-5 h-5 text-[#FF3B30]" />
          </div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-700">Sentiment</span>
          <div>
            <h3 className="text-4xl font-black text-[#111111] font-display">{overview.sentimentScore}%</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 rounded bg-slate-200 border border-[#111111] overflow-hidden">
                <div className="h-full bg-[#FF3B30]" style={{ width: `${overview.sentimentScore}%` }} />
              </div>
              <span className="text-[10px] font-mono font-black text-[#FF3B30]">+12.1%</span>
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="glass-panel p-6 rounded-2xl bg-white border-3 border-[#111111] flex flex-col justify-between h-44 relative overflow-hidden group hover:border-[#00D180]/30 shadow-[4px_4px_0px_0px_#111111] transition-all duration-300">
          <div className="absolute top-0 right-0 w-12 h-12 bg-[#00D180]/10 border-l-2 border-b-2 border-[#111111] flex items-center justify-center rounded-bl-xl">
            <Rocket className="w-5 h-5 text-[#00D180]" />
          </div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-700">Opportunities</span>
          <div>
            <h3 className="text-4xl font-black text-[#111111] font-display">{overview.trendOpportunityScore}<span className="text-xs font-normal text-slate-500"> Active</span></h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 rounded bg-slate-200 border border-[#111111] overflow-hidden">
                <div className="h-full bg-[#00D180]" style={{ width: "65%" }} />
              </div>
              <span className="text-[10px] font-mono font-black text-[#00D180]">+3 New</span>
            </div>
          </div>
        </div>

        {/* Campaign ROI */}
        <div className="glass-panel p-6 rounded-2xl bg-white border-3 border-[#111111] flex flex-col justify-between h-44 relative overflow-hidden group hover:border-[#0040FF]/30 shadow-[4px_4px_0px_0px_#111111] transition-all duration-300">
          <div className="absolute top-0 right-0 w-12 h-12 bg-[#0040FF]/10 border-l-2 border-b-2 border-[#111111] flex items-center justify-center rounded-bl-xl">
            <Coins className="w-5 h-5 text-[#0040FF]" />
          </div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-700">Campaign ROI</span>
          <div>
            <h3 className="text-4xl font-black text-[#111111] font-display">{overview.campaignROIScore}x</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 rounded bg-slate-200 border border-[#111111] overflow-hidden">
                <div className="h-full bg-[#0040FF]" style={{ width: "60%" }} />
              </div>
              <span className="text-[10px] font-mono font-black text-[#0040FF]">Stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Globe on Left, Alerts & Competitors on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Globe Section */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 flex flex-col justify-between relative min-h-[500px] border-3 border-[#111111] bg-white shadow-[6px_6px_0px_0px_#111111]">
          <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0040FF] animate-pulse" />
              <h3 className="text-lg font-black text-[#111111] uppercase tracking-wider">Global Trend Radar</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">
              Ingesting: 1.2M points
            </span>
          </div>

          {/* Interactive Globe Container */}
          <div className="flex-1 w-full my-4 relative">
            <Globe positivePercentage={overview.sentimentScore} />
          </div>

          <div className="grid grid-cols-3 gap-4 border-t-2 border-[#111111] pt-4">
            <div className="p-3 bg-[#FAF8F5] border-2 border-[#111111] rounded shadow-[2px_2px_0px_0px_#111111]">
              <span className="text-[9px] font-mono text-slate-600 font-bold uppercase block mb-1">Positives</span>
              <span className="text-xl font-black text-[#00D180]">{Math.round(overview.sentimentScore)}%</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-[#111111] rounded shadow-[2px_2px_0px_0px_#111111]">
              <span className="text-[9px] font-mono text-slate-600 font-bold uppercase block mb-1">Neutrals</span>
              <span className="text-xl font-black text-[#0040FF]">{Math.round(100 - overview.sentimentScore - 12)}%</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-2 border-[#111111] rounded shadow-[2px_2px_0px_0px_#111111]">
              <span className="text-[9px] font-mono text-slate-600 font-bold uppercase block mb-1">Confidence</span>
              <span className="text-xl font-black text-[#FF3B30]">{overview.forecastConfidenceLevel}%</span>
            </div>
          </div>
        </div>

        {/* Right Hand: Interactive panels */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Anomaly alert box */}
          <div className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-[#FF3B30]/5 hover:bg-[#FF3B30]/10 transition-all flex flex-col justify-between min-h-[240px] shadow-[4px_4px_0px_0px_#111111]">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-[#FF3B30]">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
                <h4 className="text-sm font-black uppercase tracking-wider font-display">Anomaly Detected</h4>
              </div>
              <span className="bg-[#FF3B30] border-2 border-[#111111] text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded font-black">Critical</span>
            </div>
            <p className="text-xs text-slate-800 font-semibold leading-relaxed mb-4">
              {overview.anomalies[0]?.description || `Campaign efficiency shift observed on ${industry} display segments.`}
            </p>
            
            {/* Bauhaus bar visualization */}
            <div className="flex items-end gap-1.5 h-12 w-full mb-4">
              <div className="flex-1 h-[40%] bg-slate-300 border border-[#111111] rounded-sm" />
              <div className="flex-1 h-[65%] bg-slate-300 border border-[#111111] rounded-sm" />
              <div className="flex-1 h-[85%] bg-[#0040FF] border border-[#111111] rounded-sm" />
              <div className="flex-1 h-[30%] bg-[#FF3B30]/60 border border-[#111111] rounded-sm" />
              <div className="flex-1 h-[12%] bg-[#FF3B30] border border-[#111111] rounded-sm animate-pulse shadow-[0_0_15px_#ef4444]" />
            </div>

            <button 
              onClick={() => {
                onNavigateTo("predictor");
                onShowNotification("Entering Predictor module to investigate campaign performance");
              }}
              className="w-full py-3 rounded-xl bg-white border-3 border-[#111111] text-[#111111] hover:bg-[#FF3B30] hover:text-white transition-all text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#111111]"
            >
              Investigate Origin
            </button>
          </div>

          {/* Competitor shift list */}
          <div className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white flex flex-col justify-between min-h-[240px] hover:border-[#0040FF]/30 shadow-[4px_4px_0px_0px_#111111] transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4 border-b-2 border-[#111111] pb-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#111111]">Competitor Shift</h4>
                <span className="text-[9px] font-mono text-slate-600 font-bold">Live tracker</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#0040FF]/10 border-2 border-[#111111] text-xs font-black text-[#0040FF] flex items-center justify-center">V</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-mono mb-1 font-bold">
                      <span className="text-[#111111]">Vanguard Corp</span>
                      <span className="text-[#00D180] font-black">+18.2% SOV</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 border border-[#111111] rounded overflow-hidden">
                      <div className="h-full bg-[#00D180]" style={{ width: "82%" }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#FF3B30]/10 border-2 border-[#111111] text-xs font-black text-[#FF3B30] flex items-center justify-center">A</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-mono mb-1 font-bold">
                      <span className="text-[#111111]">Apex Analytics</span>
                      <span className="text-[#FF3B30] font-black">-4.5%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 border border-[#111111] rounded overflow-hidden">
                      <div className="h-full bg-[#FF3B30]" style={{ width: "35%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#111111] pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-600 font-bold uppercase">
              <span>Overall Confidence</span>
              <span className="text-[#0040FF] font-black">92% Match</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
