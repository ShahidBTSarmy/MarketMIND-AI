import { useState, FormEvent } from "react";
import { Sparkles, Coins, HelpCircle, AlertCircle, RefreshCw, BarChart2 } from "lucide-react";
import { CampaignInputs, CampaignPredictions } from "../types";

interface CampaignPredictorProps {
  onShowNotification: (text: string) => void;
}

export default function CampaignPredictor({ onShowNotification }: CampaignPredictorProps) {
  const [inputs, setInputs] = useState<CampaignInputs>({
    budget: 5000,
    platform: "Meta Ads (Instagram / FB)",
    audience: "Millennials and Gen Z interested in athletic streetwear and sustainable fashion",
    location: "United States (Metro Hubs)",
    creativeType: "Short Form Portrait Video / TikTok Style",
    campaignObjective: "Conversions / Product Purchase Sales"
  });

  const [predictions, setPredictions] = useState<CampaignPredictions | null>({
    predictedReach: "125,000 - 240,000",
    ctr: 3.8,
    conversions: 2450,
    revenue: 122500,
    roi: 4.9,
    confidenceScore: 89,
    aiInsights: [
      "The combination of Millennial/Gen Z target specs and Meta video layout yields an optimal alignment with current viral streetwear trends.",
      "Direct conversion checkout flow reduces dropouts, leading to a conversion probability increase of 14%."
    ],
    optimizationTips: [
      "Rotate at least 3 distinct video creative hooks within the first 3 seconds to mitigate immediate scrolling bounce rates.",
      "Exclude non-metropolitan postal codes to maximize efficiency of your ad spend budget towards high-income hubs."
    ]
  });
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });
      const data = await response.json();
      if (data && data.predictedReach) {
        setPredictions(data);
        onShowNotification("Campaign simulation model calculation complete!");
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      console.warn("Using client-side dynamic simulation fallback:", err);
      const budget = Number(inputs.budget) || 3000;
      const reachNum = budget * 4.5;
      const ctr = inputs.platform.toLowerCase().includes("meta") ? 1.9 : 2.5;
      const conversions = Math.round(reachNum * (ctr / 100) * 0.12);
      const revenue = conversions * 85;
      const roi = parseFloat((revenue / budget).toFixed(1)) || 3.1;
      
      setPredictions({
        predictedReach: `${Math.round(reachNum).toLocaleString()} - ${Math.round(reachNum * 1.5).toLocaleString()}`,
        ctr,
        conversions,
        revenue,
        roi,
        confidenceScore: 88,
        aiInsights: [
          `Targeting "${inputs.audience}" on ${inputs.platform} is expected to yield peak CTR during mid-week mornings.`,
          `Your selected creative style "${inputs.creativeType}" aligns optimally with target demographics in ${inputs.location}.`
        ],
        optimizationTips: [
          "Increase budget by 15% to clear audience fatigue bottlenecks within the first 10 days.",
          "Implement short form user-generated content assets to double the predicted CTR."
        ]
      });
      onShowNotification("Simulation computed locally (offline mode)!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b-4 border-[#111111] pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
          Campaign Success Predictor
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
          Simulate performance metrics and revenue outcomes before deploying media capital
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Inputs Form */}
        <form onSubmit={handlePredict} className="lg:col-span-5 glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white space-y-5 text-left shadow-[5px_5px_0px_0px_#111111]">
          <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-3">
            <BarChart2 className="w-5 h-5 text-[#FF3B30]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[#111111]">Simulation Engine Parameters</h3>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold flex justify-between">
              <span>Campaign Budget ($)</span>
              <span className="text-[#111111] font-black">${inputs.budget.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="500"
              value={inputs.budget}
              onChange={(e) => setInputs({...inputs, budget: Number(e.target.value)})}
              className="w-full h-1.5 bg-slate-200 border border-[#111111] rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
            />
          </div>

          {/* Platform */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Target Media Platform</label>
            <select 
              value={inputs.platform}
              onChange={(e) => setInputs({...inputs, platform: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
            >
              <option>Meta Ads (Instagram / FB)</option>
              <option>Google Ads (Search/Shopping)</option>
              <option>TikTok Ads (In-Feed Video)</option>
              <option>LinkedIn Paid Campaigns</option>
              <option>YouTube Direct Bumper Ads</option>
            </select>
          </div>

          {/* Objective */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Campaign Objective</label>
            <select 
              value={inputs.campaignObjective}
              onChange={(e) => setInputs({...inputs, campaignObjective: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
            >
              <option>Conversions / Product Purchase Sales</option>
              <option>Lead Generation / Contact Signups</option>
              <option>Brand Sentiment & Recall Awareness</option>
              <option>Website Traffic / Blog Retargeting</option>
            </select>
          </div>

          {/* Audience */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Target Audience Profile</label>
            <textarea 
              rows={2}
              value={inputs.audience}
              onChange={(e) => setInputs({...inputs, audience: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Location Geo</label>
            <input 
              type="text"
              value={inputs.location}
              onChange={(e) => setInputs({...inputs, location: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
            />
          </div>

          {/* Creative */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Creative Asset Type</label>
            <input 
              type="text"
              value={inputs.creativeType}
              onChange={(e) => setInputs({...inputs, creativeType: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all font-sans font-bold"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#FF3B30] text-white border-3 border-[#111111] font-black shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Calculating Sim Matrix..." : "Calculate Success Forecast"}
          </button>
        </form>

        {/* Right Side: Prediction Output */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {predictions ? (
            <div className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white space-y-6 text-left animate-fadeIn shadow-[6px_6px_0px_0px_#111111]">
              <div className="flex justify-between items-center border-b-2 border-[#111111] pb-3">
                <span className="text-xs font-mono text-slate-600 uppercase tracking-widest font-bold">Simulation Assessment Complete</span>
                <span className="bg-[#00D180] border-2 border-[#111111] text-black font-black text-[10px] font-mono uppercase px-2.5 py-1 rounded">
                  Confidence Score: {predictions.confidenceScore}%
                </span>
              </div>

              {/* Primary ROI Metric block */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Predicted CTR</span>
                  <span className="text-2xl font-black text-[#FF3B30]">{predictions.ctr}%</span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Conversions</span>
                  <span className="text-2xl font-black text-black">{predictions.conversions.toLocaleString()}</span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-[#111111]">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1 font-bold">Estimated ROI</span>
                  <span className="text-2xl font-black text-[#00D180]">{predictions.roi}x</span>
                </div>
              </div>

              {/* Detailed metrics read out */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] rounded-xl space-y-1">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block font-bold font-mono">Expected Reach Reach</span>
                  <span className="text-lg font-bold text-black">{predictions.predictedReach} users</span>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-2 border-[#111111] rounded-xl space-y-1">
                  <span className="text-[9px] font-mono text-slate-600 uppercase block font-bold font-mono">Expected Revenue</span>
                  <span className="text-lg font-bold text-black">${predictions.revenue.toLocaleString()}</span>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-[#0040FF] uppercase tracking-wider font-bold">AI Behavioral Signals</h4>
                <div className="space-y-2">
                  {predictions.aiInsights.map((insight, idx) => (
                    <p key={idx} className="p-3 bg-[#FAF8F5] border-2 border-[#111111] rounded-lg text-xs text-[#111111] font-medium shadow-[2px_2px_0px_0px_#111111]">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>

              {/* Optimization advice */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-[#00D180] uppercase tracking-wider font-bold">Campaign Optimization Actions</h4>
                <div className="space-y-2">
                  {predictions.optimizationTips.map((tip, idx) => (
                    <p key={idx} className="p-3 bg-[#00D180]/10 border-2 border-[#111111] rounded-lg text-xs text-[#111111] font-medium shadow-[2px_2px_0px_0px_#111111]">
                      {tip}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border-3 border-[#111111] bg-[#FAF8F5] text-center text-slate-500 flex flex-col items-center justify-center min-h-[400px] shadow-[4px_4px_0px_0px_#111111]">
              <HelpCircle className="w-10 h-10 mb-3 text-slate-800" />
              <h4 className="text-sm font-black text-[#111111] uppercase tracking-wider">Awaiting Simulation Configuration</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto font-medium">
                Select budget, audience, platforms, and click 'Calculate Success Forecast' to initiate the neural campaign model calculations.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
