import { useState, FormEvent } from "react";
import { Sparkles, FileText, Activity, AlertTriangle, RefreshCw, BarChart2, CheckCircle } from "lucide-react";
import { ContentAnalysisResult } from "../types";

interface ContentAnalyzerProps {
  onShowNotification: (text: string) => void;
}

export default function ContentAnalyzer({ onShowNotification }: ContentAnalyzerProps) {
  const [contentType, setContentType] = useState<'ad-copy' | 'blog' | 'social-post' | 'landing-page'>('ad-copy');
  const [contentBody, setContentBody] = useState(
    "Stop wasting hours guessing what works. Introducing our zero-waste organic clothing collection. Ethically tailored, exceptionally soft, and delivered directly to your doorstep with 100% biodegradable packaging. Click to claim your exclusive 15% discount code."
  );

  const [result, setResult] = useState<ContentAnalysisResult | null>({
    engagementScore: 88,
    readability: "Grade 9 (Highly Engaging & Clear)",
    emotionAnalysis: {
      primaryEmotion: "Inspiration & Confidence",
      intensity: 82
    },
    viralityPotential: "High",
    conversionProbability: 74,
    suggestions: [
      "Replace 'Stop wasting hours guessing what works' with a more positive action phrase like 'Instantly unlock high-performance ad copy that converts'.",
      "Highlight the '100% biodegradable packaging' as a distinct icon/bullet point in your landing page design rather than burying it inside body copy."
    ]
  });
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: FormEvent) => {
    e.preventDefault();
    if (!contentBody.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/content-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType, contentBody })
      });
      const data = await response.json();
      if (data && data.toneMetrics) {
        setResult(data);
        onShowNotification("Copy analysis complete! Engagement metrics rendered.");
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      console.warn("Using client-side dynamic analyzer fallback:", err);
      const text = contentBody.toLowerCase();
      let tone = "Professional";
      let clarity = 80;
      let persuasion = 75;
      let intensity = 72;
      let viralityPotential = "Moderate";
      let conversionProbability = 68;
      let suggestions = [
        "Include a clearer call-to-action (CTA) such as 'Start Free Trial' or 'Claim Discount' at the very end of your paragraph.",
        "Add a concrete statistic or customer proof point to increase the credibility of your claims."
      ];

      if (text.includes("free") || text.includes("now") || text.includes("buy") || text.includes("sale")) {
        tone = "High Conversion";
        clarity = 85;
        persuasion = 88;
        viralityPotential = "High";
        conversionProbability = 82;
        suggestions = [
          "Avoid using multiple exclamation marks to maintain your brand's editorial authority.",
          "Frame the offering's value around time saved rather than just low cost."
        ];
      }

      setResult({
        toneMetrics: { tone, clarity, persuasion, intensity },
        viralityPotential,
        conversionProbability,
        suggestions
      });
      onShowNotification("Copy analysis simulated locally (offline mode)!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b-4 border-[#111111] pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
          Content Analyzer
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
          Audit copy engagement scores, reading grades, and emotional resonance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Pane */}
        <form onSubmit={handleAnalyze} className="lg:col-span-5 glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white space-y-4 text-left shadow-[5px_5px_0px_0px_#111111]">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2 border-b-2 border-[#111111] pb-3">
            <FileText className="w-4 h-4 text-[#0040FF]" /> Copy Audit Input
          </h3>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Copy Format</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ad-copy', label: 'Ad Copy' },
                { id: 'blog', label: 'Blog Article' },
                { id: 'social-post', label: 'Social Post' },
                { id: 'landing-page', label: 'Landing Page' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setContentType(opt.id as any)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    contentType === opt.id 
                      ? "bg-[#FFE600] border-3 border-[#111111] text-[#111111] shadow-[2px_2px_0px_0px_#111111]" 
                      : "bg-white border-2 border-slate-300 text-slate-600 hover:border-[#111111] hover:text-[#111111]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Content Body</label>
            <textarea 
              rows={8}
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              placeholder="Paste your ad copy, landing page draft, or blog intro paragraph here..."
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all resize-none font-sans"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#00D180] text-[#111111] border-3 border-[#111111] font-black shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-white" />}
            {loading ? "Auditing Vocabulary..." : "Audit Copy Quality"}
          </button>
        </form>

        {/* Results Pane */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {result ? (
            <div className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white space-y-6 text-left animate-fadeIn shadow-[6px_6px_0px_0px_#111111]">
              <div className="flex justify-between items-center border-b-2 border-[#111111] pb-3">
                <span className="text-xs font-mono text-slate-600 uppercase tracking-widest font-bold">Audit Scorecard</span>
                <span className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded font-bold border-2 border-[#111111] ${
                  result.viralityPotential === 'Low' ? 'bg-[#FAF8F5] text-slate-600' : 'bg-[#00D180] text-[#111111]'
                }`}>
                  Virality Potential: {result.viralityPotential}
                </span>
              </div>

              {/* Grid indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Engagement Score</span>
                  <span className="text-2xl font-black text-[#0040FF]">{result.engagementScore}<span className="text-xs text-slate-500 font-medium">/100</span></span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Readability Index</span>
                  <span className="text-xs font-bold text-slate-800 block truncate mt-1">{result.readability}</span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Conversion Prob</span>
                  <span className="text-2xl font-black text-black">{result.conversionProbability}%</span>
                </div>
              </div>

              {/* Emotional analysis */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#111111] text-xs space-y-2">
                <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">Primary Emotional Response</span>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#0040FF]">{result.emotionAnalysis.primaryEmotion}</span>
                  <span className="text-xs text-[#FF3B30] font-mono font-bold">{result.emotionAnalysis.intensity}% Intensity</span>
                </div>
                <div className="h-2 w-full bg-slate-200 border border-[#111111] overflow-hidden">
                  <div className="h-full bg-[#FF3B30]" style={{ width: `${result.emotionAnalysis.intensity}%` }} />
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-mono text-[#111111] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4 text-[#00D180]" /> Actionable Copy Alterations
                </h4>
                <div className="space-y-2.5">
                  {result.suggestions.map((sug, idx) => (
                    <p key={idx} className="p-4 bg-[#FAF8F5] border-2 border-[#111111] text-xs text-[#111111] leading-relaxed shadow-[2px_2px_0px_0px_#111111] font-medium">
                      {sug}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border-3 border-[#111111] bg-[#FAF8F5] text-center text-slate-500 flex flex-col items-center justify-center min-h-[400px] shadow-[4px_4px_0px_0px_#111111]">
              <FileText className="w-10 h-10 mb-3 text-slate-800" />
              <h4 className="text-sm font-black text-[#111111] uppercase tracking-wider">Awaiting Vocabulary Audit</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto font-medium">
                Paste your copywriting draft or marketing content paragraph on the left and click 'Audit Copy Quality'.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
