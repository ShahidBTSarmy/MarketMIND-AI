import { useState, FormEvent } from "react";
import { Sparkles, Users, Compass, ShieldAlert, Heart, RefreshCw, Layers } from "lucide-react";
import { CustomerPersona } from "../types";

interface PersonaGeneratorProps {
  onShowNotification: (text: string) => void;
}

export default function PersonaGenerator({ onShowNotification }: PersonaGeneratorProps) {
  const [description, setDescription] = useState("Gen Z software developers who buy high-end ergonomic desk setups and retro keycaps");
  const [persona, setPersona] = useState<CustomerPersona | null>({
    name: "Alex, the Tech-Enthusiast Creator",
    age: 26,
    profession: "Lead Frontend Engineer & Hobbyist Streamer",
    goals: [
      "Build a pristine, clean, ergonomic work-from-home setup",
      "Source rare, unique retro keycaps and limited edition mechanical keyboards",
      "Optimize workspace ergonomics to prevent repetitive strain injuries"
    ],
    painPoints: [
      "Struggling to find high-end aesthetic components that are in stock",
      "Overwhelming options with generic, low-quality desk accessories",
      "Extended screen time leading to physical fatigue and posture issues"
    ],
    interests: ["Ergonomics", "Mechanical Keyboards", "Retro Tech", "Minimalist Design", "SaaS Tools"],
    preferredPlatforms: ["Reddit (r/MechanicalKeyboards)", "YouTube Desk Tours", "X/Twitter", "Instagram Design Pages"],
    buyingTriggers: [
      "Visually stunning workspace desk mat setups shared on design accounts",
      "Authentic community recommendations on developer subreddits",
      "Direct value propositions highlighting structural posture health benefits"
    ],
    marketingRecommendations: [
      "Target Alex with aesthetic macro lifestyle photography showcasing the desktop accessories in real, clean environments.",
      "Partner with technical micro-influencers for authentic desk setup build vlogs instead of paying for high-production corporate commercials.",
      "Emphasize precise specifications, premium manufacturing materials, and posture benefits in the copy."
    ],
    avatarSeed: "alex-tech"
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description })
      });
      const data = await response.json();
      setPersona(data);
      onShowNotification("Intelligent buyer profile successfully synthesized!");
    } catch (err) {
      console.error("Error creating customer persona:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b-4 border-[#111111] pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
          Customer Persona Generator
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
          Synthesize hyper-specific buyer profiles and buying triggers from target audience specs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input box */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <form onSubmit={handleGenerate} className="glass-panel p-6 rounded-2xl border-3 border-[#111111] bg-white space-y-4 text-left shadow-[5px_5px_0px_0px_#111111]">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0040FF]" /> Synthesis Criteria
            </h3>
            <p className="text-xs text-slate-800 font-medium">
              Describe your target audience. The more specific, the more tailored the strategic recommendations.
            </p>

            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g. Yoga practitioners in Berlin who purchase sustainably harvested incense..."
              className="w-full px-4 py-3 rounded-lg bg-white border-3 border-[#111111] text-xs text-[#111111] focus:outline-none focus:bg-[#FFE600]/10 focus:border-[#FF3B30] transition-all resize-none font-sans"
            />

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#FFE600] text-black border-3 border-[#111111] font-bold shadow-[4px_4px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-[#0040FF]" />}
              {loading ? "Generating Profile..." : "Synthesize Buyer Profile"}
            </button>
          </form>
        </div>

        {/* Persona Display Sheet */}
        <div className="lg:col-span-8">
          {persona ? (
            <div className="glass-panel p-8 rounded-3xl border-3 border-[#111111] bg-white text-left space-y-6 relative overflow-hidden animate-fadeIn shadow-[6px_6px_0px_0px_#111111]">
              {/* Profile card header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#111111] pb-6">
                <div className="flex items-center gap-4">
                  {/* Avatar using Unsplash with dynamic seeding */}
                  <img 
                    src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`}
                    alt={persona.name} 
                    className="w-16 h-16 rounded-full object-cover border-3 border-[#111111] shadow-[3px_3px_0px_0px_#FFE600]"
                  />
                  <div>
                    <h3 className="text-3xl font-black text-[#111111] font-display uppercase tracking-tight">{persona.name}</h3>
                    <p className="text-xs text-[#0040FF] font-mono font-bold">Age: {persona.age} • Profession: {persona.profession}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {persona.preferredPlatforms.map((plat, idx) => (
                    <span key={idx} className="bg-[#FAF8F5] border-2 border-[#111111] text-black px-2.5 py-1 rounded text-[10px] font-mono font-bold">
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Persona Goals and Painpoints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#00D180] flex items-center gap-1.5 font-mono">
                    <Heart className="w-4 h-4" /> Core Goals & Needs
                  </h4>
                  <ul className="space-y-2 bg-[#FAF8F5] p-4 border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] text-xs text-[#111111] font-medium">
                    {persona.goals.map((goal, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#00D180] border border-black mt-1.5 flex-shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#FF3B30] flex items-center gap-1.5 font-mono">
                    <ShieldAlert className="w-4 h-4" /> Frustrations & Pain Points
                  </h4>
                  <ul className="space-y-2 bg-[#FAF8F5] p-4 border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] text-xs text-[#111111] font-medium">
                    {persona.painPoints.map((pain, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#FF3B30] border border-black mt-1.5 flex-shrink-0" />
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Buying triggers */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] flex items-center gap-1.5 font-mono">
                  <Compass className="w-4 h-4 text-[#0040FF]" /> Buying Triggers & Preferences
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {persona.buyingTriggers.map((trig, idx) => (
                    <span key={idx} className="bg-[#FFE600]/10 border-2 border-[#111111] text-black font-black px-3 py-1.5 rounded-lg text-xs shadow-[2px_2px_0px_0px_#111111]">
                      {trig}
                    </span>
                  ))}
                </div>
              </div>

              {/* Marketing strategy */}
              <div className="space-y-3 pt-4 border-t-2 border-[#111111]">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0040FF] flex items-center gap-1.5 font-mono">
                  <Layers className="w-4 h-4" /> Strategic Marketing Guidance
                </h4>
                <div className="space-y-2.5">
                  {persona.marketingRecommendations.map((rec, idx) => (
                    <p key={idx} className="text-xs text-[#111111] leading-relaxed bg-[#FAF8F5] border-2 border-[#111111] p-4 shadow-[2px_2px_0px_0px_#111111] font-medium">
                      {rec}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border-3 border-[#111111] text-center text-slate-500 bg-[#FAF8F5] flex flex-col items-center justify-center min-h-[400px] shadow-[4px_4px_0px_0px_#111111]">
              <Users className="w-10 h-10 mb-3 text-slate-800" />
              <h4 className="text-sm font-black text-[#111111] uppercase tracking-wider">Awaiting Criteria Input</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto font-medium">
                Configure your target audience parameters on the left and click 'Synthesize Buyer Profile' to launch generative pipeline logic.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
