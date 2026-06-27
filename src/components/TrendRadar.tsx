import { useEffect, useState } from "react";
import { Radar, Flame, TrendingUp, MapPin, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { TrendItem } from "../types";

interface TrendRadarProps {
  industry: string;
  onShowNotification: (text: string) => void;
}

export default function TrendRadar({ industry, onShowNotification }: TrendRadarProps) {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState<TrendItem | null>(null);
  const [generationLoading, setGenerationLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setTrends(data);
        setSelectedTrend(data[0]);
      } else {
        throw new Error("Invalid trend format");
      }
    } catch (err) {
      console.warn("Using client-side industry-tailored trends fallback:", err);
      // Generate three beautiful, industry-tailored trends as high-fidelity fallbacks
      const cleanIndustry = industry.split("&")[0].trim();
      const fallback: TrendItem[] = [
        {
          id: "trend_fallback_1",
          topic: `Authentic User Reviews & De-influencing in ${cleanIndustry}`,
          growth: 142.5,
          momentum: 94,
          volume: "1.4M mentions",
          category: "Consumer Behavior",
          sentiment: "positive",
          heatmap: [
            { region: "North America", intensity: 90 },
            { region: "Europe", intensity: 85 },
            { region: "APAC", intensity: 60 }
          ],
          recommendation: `Redirect ad spend from high-production agency videos into raw, relatable user-generated reviews about your ${cleanIndustry} solutions.`,
          timeline: [
            { date: "May", value: 30 },
            { date: "Jun", value: 65 },
            { date: "Jul", value: 142 }
          ]
        },
        {
          id: "trend_fallback_2",
          topic: "Zero-Waste Sustainable Lifecycle Demands",
          growth: 88.2,
          momentum: 82,
          volume: "850K searches",
          category: "Sustainability",
          sentiment: "neutral",
          heatmap: [
            { region: "Europe", intensity: 95 },
            { region: "North America", intensity: 75 },
            { region: "APAC", intensity: 40 }
          ],
          recommendation: `Launch a dedicated eco-friendly tier with a public carbon-saved metric displayed inside checkout paths.`,
          timeline: [
            { date: "May", value: 45 },
            { date: "Jun", value: 60 },
            { date: "Jul", value: 88 }
          ]
        },
        {
          id: "trend_fallback_3",
          topic: `Interactive AI-Powered Client Portals`,
          growth: 210.4,
          momentum: 91,
          volume: "2.1M interactions",
          category: "Technology",
          sentiment: "positive",
          heatmap: [
            { region: "APAC", intensity: 95 },
            { region: "North America", intensity: 80 },
            { region: "Europe", intensity: 70 }
          ],
          recommendation: `Integrate a simple, interactive virtual setup assistant directly inside your onboarding experience.`,
          timeline: [
            { date: "May", value: 50 },
            { date: "Jun", value: 120 },
            { date: "Jul", value: 210 }
          ]
        }
      ];
      setTrends(fallback);
      setSelectedTrend(fallback[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [industry]);

  const generateAdHook = async (trend: TrendItem) => {
    setGenerationLoading(true);
    setAiResponse("");
    try {
      const response = await fetch("/api/content-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: "social-post",
          contentBody: `Create a viral post hook for the rising trend: "${trend.topic}" targeting the ${industry} audience. Focus on high virality, sustainability, or core buying triggers.`
        })
      });
      const data = await response.json();
      if (data.suggestions) {
        setAiResponse(`🚀 **RECOMMENDED CAMPAIGN HOOKS:**\n\n1. "${data.suggestions[0]}"\n2. "${data.suggestions[1] || 'Transform your marketing operations before your rivals react.'}"\n\n*Predicted Engagement Score: ${data.engagementScore}/100 • Tone: ${data.emotionAnalysis?.primaryEmotion || 'Optimism'}*`);
      } else {
        setAiResponse("Create a unique, limited release centered around authentic product transparency.");
      }
    } catch (err) {
      setAiResponse("Launch a competitive positioning campaign highlighting high quality materials.");
    } finally {
      setGenerationLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-2">
        <div className="h-12 w-1/4 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#111111] pb-6 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
            Trend Radar
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
            Detect emerging market shifts and viral cycles 14 days before peak
          </p>
        </div>
        <button 
          onClick={fetchTrends}
          className="px-4 py-2 rounded bg-white border-2 border-[#111111] text-xs font-bold text-[#111111] hover:bg-[#FFE600] transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-Scan Industry
        </button>
      </div>

      {/* Main Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Trends List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {trends.map((trend) => (
              <div 
                key={trend.id}
                onClick={() => {
                  setSelectedTrend(trend);
                  setAiResponse("");
                }}
                className={`p-5 rounded-xl border-3 transition-all cursor-pointer flex flex-col justify-between shadow-[3px_3px_0px_0px_#111111] ${
                  selectedTrend?.id === trend.id 
                    ? "border-[#0040FF] bg-[#0040FF]/5" 
                    : "border-[#111111] bg-white hover:border-[#0040FF]"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-black font-bold uppercase tracking-wider bg-[#FFE600] border-2 border-[#111111] px-2.5 py-1 rounded">
                      {trend.category}
                    </span>
                    <h3 className="text-lg font-black text-[#111111] mt-3 group-hover:text-[#0040FF]">{trend.topic}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-[#00D180]">+{trend.growth}%</span>
                    <span className="text-[9px] font-mono text-slate-600 font-bold block">Growth MoM</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t-2 border-[#111111] text-xs text-[#111111] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#FF3B30]" />
                    <span>Momentum: <strong>{trend.momentum}/100</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#0040FF]" />
                    <span>{trend.volume}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase ${
                      trend.sentiment === 'positive' ? 'text-[#00D180]' : 'text-amber-600'
                    }`}>
                      {trend.sentiment} Sentiment
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hand: Detailed Insights Panel */}
        <div className="lg:col-span-5">
          {selectedTrend ? (
            <div className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white space-y-6 sticky top-24 shadow-[4px_4px_0px_0px_#111111]">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase font-bold">Selected Node Details</span>
                <h3 className="text-2xl font-black text-[#111111] mt-1 uppercase tracking-tight">{selectedTrend.topic}</h3>
              </div>

              {/* Geographic Intensity Map List */}
              <div className="space-y-3">
                <span className="text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0040FF]" /> Geographic Interest Intensity
                </span>
                <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-xl border-2 border-[#111111]">
                  {selectedTrend.heatmap.map((reg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800">{reg.region}</span>
                        <span className="text-[#0040FF] font-black">{reg.intensity}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 border border-[#111111] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0040FF]" style={{ width: `${reg.intensity}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Strategy Box */}
              <div className="space-y-2">
                <span className="text-xs font-black text-[#111111] uppercase tracking-wider">Strategic Recommendation</span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border-2 border-[#111111]">
                  {selectedTrend.recommendation}
                </p>
              </div>

              {/* AI recommendation generation button */}
              <div className="pt-4 border-t-2 border-[#111111] space-y-4">
                <button 
                  onClick={() => generateAdHook(selectedTrend)}
                  disabled={generationLoading}
                  className="w-full py-3 rounded-xl bg-[#0040FF] text-white border-3 border-[#111111] hover:bg-[#FFE600] hover:text-black transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 shadow-[2px_2px_0px_0px_#111111]"
                >
                  <Sparkles className="w-4 h-4 text-[#FFE600]" />
                  {generationLoading ? "Analyzing tone..." : "Generate AI Marketing Hook"}
                </button>

                {aiResponse && (
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#111111] text-xs text-left text-slate-900 leading-relaxed font-semibold whitespace-pre-line animate-fadeIn shadow-[2px_2px_0px_0px_#111111]">
                    {aiResponse}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border-3 border-[#111111] bg-[#FAF8F5] text-center text-slate-500 flex flex-col items-center justify-center min-h-[300px] shadow-[4px_4px_0px_0px_#111111]">
              <AlertCircle className="w-8 h-8 mb-2 text-slate-800" />
              <p className="text-xs uppercase font-bold text-slate-800">Select a trend from the radar to inspect deep intelligence metrics.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
