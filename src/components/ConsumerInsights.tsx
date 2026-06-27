import { useEffect, useState, FormEvent } from "react";
import { Users, Heart, Frown, Sparkles, AlertCircle, RefreshCw, MessageSquarePlus, Smile } from "lucide-react";
import { SentimentAnalysis } from "../types";

interface ConsumerInsightsProps {
  industry: string;
  onNavigateTo: (screenId: string) => void;
  onShowNotification: (text: string) => void;
}

export default function ConsumerInsights({ industry, onNavigateTo, onShowNotification }: ConsumerInsightsProps) {
  const [brand, setBrand] = useState("Luminate");
  const [data, setData] = useState<SentimentAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  const fetchInsights = async (targetBrand: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand: targetBrand, industry })
      });
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      console.error("Error fetching sentiment analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(brand);
  }, [brand, industry]);

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setBrand(searchVal.trim());
      onShowNotification(`Running brand analysis for: "${searchVal.trim()}"`);
    }
  };

  const getSentimentColor = (sent: string) => {
    if (sent === "positive") return "text-[#00D180] bg-[#00D180]/10 border-2 border-[#111111]";
    if (sent === "neutral") return "text-amber-800 bg-[#FFE600]/10 border-2 border-[#111111]";
    return "text-[#FF3B30] bg-[#FF3B30]/10 border-2 border-[#111111]";
  };

  const sentiment = (data && data.distribution && data.emotions) ? data : {
    healthScore: 78,
    distribution: { positive: 65, neutral: 22, negative: 13 },
    emotions: { joy: 55, surprise: 20, sadness: 10, anger: 8, fear: 7 },
    painPoints: ["High shipping fee on minimum orders", "Slow support response during product launches"],
    desires: ["In-app customized size calculation tools", "Biodegradable materials for accessories"],
    recentComments: [],
    aiInsights: []
  };

  return (
    <div className="space-y-8">
      {/* Title with search bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-4 border-[#111111] pb-6 gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
            Sentiment Intelligence
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
            Social listening, review crawling, and emotional feedback loops
          </p>
        </div>

        <form onSubmit={handleSubmitSearch} className="flex gap-2 w-full lg:w-auto">
          <input 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search custom brand (e.g. Nike, Notion)..."
            className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
          />
          <button 
            type="submit"
            className="px-5 py-2.5 rounded bg-[#FFE600] text-black border-3 border-[#111111] font-black shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase tracking-widest"
          >
            Analyze Brand
          </button>
        </form>
      </div>

      {loading ? (
        <div className="space-y-8 animate-pulse p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-44 bg-white border-3 border-[#111111] rounded-xl shadow-[5px_5px_0px_0px_#111111]" />
            <div className="h-44 bg-white border-3 border-[#111111] rounded-xl shadow-[5px_5px_0px_0px_#111111]" />
            <div className="h-44 bg-white border-3 border-[#111111] rounded-xl shadow-[5px_5px_0px_0px_#111111]" />
          </div>
          <div className="h-96 bg-white border-3 border-[#111111] rounded-xl shadow-[5px_5px_0px_0px_#111111]" />
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Brand Health & Distribution Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Overall Health Score */}
            <div className="md:col-span-4 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl flex flex-col justify-between min-h-[180px]">
              <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">Brand Health Index</span>
              <div>
                <h3 className="text-5xl font-black text-[#111111] font-display">{sentiment.healthScore}<span className="text-sm font-normal text-slate-500">/100</span></h3>
                <p className="text-xs text-[#0040FF] font-bold mt-2">Analyzed: <strong className="text-[#FF3B30]">{brand}</strong> in {industry}</p>
              </div>
              <div className="h-3 w-full bg-slate-100 border-2 border-black rounded overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0040FF] to-[#00D180]" style={{ width: `${sentiment.healthScore}%` }} />
              </div>
            </div>

            {/* Middle: Sentiment Distribution */}
            <div className="md:col-span-4 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl flex flex-col justify-between min-h-[180px]">
              <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">Sentiment Spectrum</span>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-black uppercase">
                  <span className="text-[#00D180]">Positive: {sentiment.distribution.positive}%</span>
                  <span className="text-slate-600">Neutral: {sentiment.distribution.neutral}%</span>
                  <span className="text-[#FF3B30]">Negative: {sentiment.distribution.negative}%</span>
                </div>
                <div className="h-5 w-full bg-slate-100 border-2 border-[#111111] rounded flex overflow-hidden">
                  <div className="h-full bg-[#00D180] border-r-2 border-[#111111]" style={{ width: `${sentiment.distribution.positive}%` }} />
                  <div className="h-full bg-[#FFE600] border-r-2 border-[#111111]" style={{ width: `${sentiment.distribution.neutral}%` }} />
                  <div className="h-full bg-[#FF3B30]" style={{ width: `${sentiment.distribution.negative}%` }} />
                </div>
              </div>

              <p className="text-[10px] text-slate-500 font-bold">Feedback calculated based on social channels.</p>
            </div>

            {/* Right: Emotional Triggers Bar Chart */}
            <div className="md:col-span-4 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl flex flex-col justify-between min-h-[180px]">
              <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">Primary Emotions</span>
              
              <div className="grid grid-cols-5 gap-2 items-end h-20 pt-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full bg-[#00D180] border-2 border-black rounded" style={{ height: `${sentiment.emotions.joy}px` }} />
                  <span className="text-[8px] font-mono uppercase text-slate-600 font-bold">Joy</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full bg-[#FFE600] border-2 border-black rounded" style={{ height: `${sentiment.emotions.surprise}px` }} />
                  <span className="text-[8px] font-mono uppercase text-slate-600 font-bold">Surp</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full bg-[#0040FF] border-2 border-black rounded" style={{ height: `${sentiment.emotions.sadness}px` }} />
                  <span className="text-[8px] font-mono uppercase text-slate-600 font-bold">Sad</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full bg-[#FF3B30] border-2 border-black rounded" style={{ height: `${sentiment.emotions.anger}px` }} />
                  <span className="text-[8px] font-mono uppercase text-slate-600 font-bold">Angr</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full bg-slate-800 border-2 border-black rounded" style={{ height: `${sentiment.emotions.fear}px` }} />
                  <span className="text-[8px] font-mono uppercase text-slate-600 font-bold">Fear</span>
                </div>
              </div>
            </div>

          </div>

          {/* Detailed Pain Points & Desires Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Pain Points */}
            <div className="bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl border-l-[10px] border-l-[#FF3B30]">
              <h4 className="text-sm font-black uppercase tracking-wider text-[#FF3B30] border-b-2 border-[#111111] pb-3 flex items-center gap-2 font-display">
                <Frown className="w-5 h-5 text-[#FF3B30] stroke-[3px]" /> Key Consumer Pain Points
              </h4>
              <ul className="mt-4 space-y-3 text-xs text-[#111111] font-bold">
                {sentiment.painPoints.map((pain, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start p-2.5 bg-[#FAF8F5] border-2 border-[#111111] rounded shadow-[2px_2px_0px_0px_#111111]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B30] border border-black mt-1 flex-shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desires */}
            <div className="bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl border-l-[10px] border-l-[#00D180]">
              <h4 className="text-sm font-black uppercase tracking-wider text-[#0040FF] border-b-2 border-[#111111] pb-3 flex items-center gap-2 font-display">
                <Smile className="w-5 h-5 text-[#00D180] stroke-[3px]" /> Core Customer Desires
              </h4>
              <ul className="mt-4 space-y-3 text-xs text-[#111111] font-bold">
                {sentiment.desires.map((desire, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start p-2.5 bg-[#FAF8F5] border-2 border-[#111111] rounded shadow-[2px_2px_0px_0px_#111111]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00D180] border border-black mt-1 flex-shrink-0" />
                    <span>{desire}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Social feed & AI recommendation block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Social Posts Feed */}
            <div className="lg:col-span-7 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl">
              <h4 className="text-sm font-black uppercase tracking-wider text-[#111111] border-b-2 border-[#111111] pb-3 font-display">
                Live Feed Analysis
              </h4>
              <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {sentiment.recentComments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-[#FAF8F5] border-2 border-[#111111] text-xs space-y-2 rounded-xl shadow-[3px_3px_0px_0px_#111111]">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-700 font-bold">
                      <span>{comment.platform} • Emotion: <strong className="text-[#0040FF]">{comment.emotion}</strong></span>
                      <span className={`px-2 py-0.5 rounded uppercase text-[8px] font-black ${getSentimentColor(comment.sentiment)}`}>
                        {comment.sentiment}
                      </span>
                    </div>
                    <p className="text-[#111111] italic font-medium">"{comment.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights & Actions */}
            <div className="lg:col-span-5 bg-white border-3 border-[#111111] shadow-[5px_5px_0px_0px_#111111] p-6 rounded-2xl border-t-[12px] border-t-[#0040FF] flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-[#0040FF] border-b-2 border-[#111111] pb-3 flex items-center gap-2 font-display">
                  <Sparkles className="w-5 h-5 text-[#0040FF] stroke-[2px]" /> AI Strategic Insights
                </h4>
                <div className="mt-4 space-y-3 text-xs text-[#111111] leading-relaxed font-bold">
                  {sentiment.aiInsights.map((insight, idx) => (
                    <p key={idx} className="p-3 bg-[#FFE600]/10 border-2 border-[#111111] rounded-lg">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => {
                  onNavigateTo("copilot");
                  onShowNotification("Consulting Copilot for brand sentiment strategies");
                }}
                className="mt-6 w-full py-3 bg-[#0040FF] text-white border-3 border-[#111111] hover:bg-[#0040FF]/90 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#111111]"
              >
                Discuss with Copilot
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
