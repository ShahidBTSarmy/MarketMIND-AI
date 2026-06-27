import { useState } from "react";
import { 
  Bot, 
  TrendingUp, 
  Users, 
  Activity, 
  Compass, 
  ShieldCheck, 
  Award, 
  Coins, 
  Zap, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  ChevronDown, 
  Play, 
  MessageSquare,
  BarChart3,
  Search,
  Check
} from "lucide-react";

interface LandingPageProps {
  onStartTrial: () => void;
}

export default function LandingPage({ onStartTrial }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "MarketMind AI helped us identify a massive consumer shift towards sustainability two weeks before any competitor did. Our campaign CTR spiked by 140%.",
      author: "Sarah Jenkins",
      role: "VP of Marketing, GreenVibe Co",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "The campaign predictor is eerily accurate. Our forecasted ROI was 4.2x and the actual campaign returned 4.35x. This is literally foresight in a box.",
      author: "Marcus Chen",
      role: "Growth Director, Apex Retail Group",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    }
  ];

  const faqs = [
    {
      question: "How does MarketMind AI predict marketing campaign performance?",
      answer: "We query deep server-side neural models powered by Google's latest Gemini models. By training on multi-platform history, real-time consumer intent trends, and location demographics, our platform simulates media campaigns to generate CTR, Conversion, and ROI estimations with up to 94% historical accuracy."
    },
    {
      question: "Is my business marketing data kept secure and private?",
      answer: "Yes, absolutely. MarketMind AI is designed with enterprise-grade data isolation pipelines. Your integrated campaign analytics, private competitor lists, and proprietary brand information are never used to train public models. We adhere to SOC-2 Type II standards."
    },
    {
      question: "Can I connect custom APIs and Google Analytics directly?",
      answer: "Indeed. The platform supports native OAuth integrations with Google Analytics 4, Meta Ads Manager, LinkedIn Campaign Manager, HubSpot, and custom API webhooks for absolute unified attribution scoring."
    }
  ];

  const featuresList = [
    {
      title: "Live Market Intelligence",
      description: "Continuous ingestion of search terms, blog publications, and social media mentions across 12 unique dimensions.",
      icon: Activity,
      cardBg: "#FFECEB",
      accentColor: "#FF3B30",
      iconBg: "#FF3B30",
      iconColor: "#FFFFFF"
    },
    {
      title: "Consumer Sentiment Tracking",
      description: "Real-time emotional mapping that parses comments and reviews into positive, neutral, negative categories and primary desires.",
      icon: Users,
      cardBg: "#EEF2FF",
      accentColor: "#0040FF",
      iconBg: "#0040FF",
      iconColor: "#FFFFFF"
    },
    {
      title: "Competitor Intelligence",
      description: "Autonomous website tracking, pricing change triggers, social media growth curves, and strategic positioning alerts.",
      icon: Search,
      cardBg: "#FFFEE6",
      accentColor: "#FFE600",
      iconBg: "#FFE600",
      iconColor: "#111111"
    },
    {
      title: "AI Campaign Forecasting",
      description: "Simulate exact returns on ad spends (ROAS) before deploying budget. Refine platforms, locations, and creatives with instant confidence indicators.",
      icon: TrendingUp,
      cardBg: "#EDFDF6",
      accentColor: "#00D180",
      iconBg: "#00D180",
      iconColor: "#111111"
    },
    {
      title: "Marketing Copilot",
      description: "An active on-demand strategic consultant trained to solve audience targeting problems, budget reallocations, and copywriting audits.",
      icon: Bot,
      cardBg: "#FFF0FA",
      accentColor: "#FF2E93",
      iconBg: "#FF2E93",
      iconColor: "#FFFFFF"
    },
    {
      title: "Predictive Analytics",
      description: "Anticipate market momentum shifts and user interest spikes up to 6 months in advance with detailed growth probabilities.",
      icon: Compass,
      cardBg: "#F5F3FF",
      accentColor: "#8B5CF6",
      iconBg: "#8B5CF6",
      iconColor: "#FFFFFF"
    },
    {
      title: "ROI Optimization",
      description: "Algorithmic recommendations to reallocate under-utilized B2B channels to high-affordance consumer campaigns.",
      icon: Coins,
      cardBg: "#FFF7ED",
      accentColor: "#F97316",
      iconBg: "#F97316",
      iconColor: "#FFFFFF"
    },
    {
      title: "Enterprise Security",
      description: "Strict SOC-2 level encryption, role-based controls, custom multi-factor gates, and complete private data isolation.",
      icon: ShieldCheck,
      cardBg: "#ECFDF5",
      accentColor: "#059669",
      iconBg: "#059669",
      iconColor: "#FFFFFF"
    }
  ];

  return (
    <div className="bauhaus-grid-bg text-[#111111] font-sans overflow-x-hidden selection:bg-[#FFE600] selection:text-black min-h-screen relative">
      {/* Decorative Bauhaus shapes */}
      <div className="absolute top-[15%] left-[5%] w-16 h-16 bg-[#FFE600] border-4 border-[#111111] rounded-full shadow-[4px_4px_0px_0px_#111111] hidden md:block" />
      <div className="absolute top-[25%] right-[8%] w-24 h-24 bg-[#FF3B30] border-4 border-[#111111] shadow-[6px_6px_0px_0px_#111111] hidden md:block rotate-12" />
      <div className="absolute bottom-[20%] right-[12%] w-20 h-20 bg-[#0040FF] border-4 border-[#111111] shadow-[5px_5px_0px_0px_#111111] hidden md:block" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF8F5]/85 border-b-4 border-[#111111] py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF3B30] border-3 border-[#111111] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#111111]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl font-black tracking-tight text-black block">MARKETMIND</span>
              <span className="text-[9px] font-mono tracking-widest text-[#0040FF] uppercase block -mt-1 font-extrabold">BAUHAUS EDITION</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-black uppercase tracking-wider text-[#111111]">
            <a href="#features" className="hover:text-[#0040FF] transition-colors">Platform</a>
            <a href="#testimonials" className="hover:text-[#FF3B30] transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-[#00D180] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onStartTrial}
              className="px-5 py-2.5 bg-white text-black border-3 border-[#111111] font-black uppercase tracking-wider text-xs shadow-[3px_3px_0px_0px_#111111] hover:bg-[#FFE600] transition-all"
            >
              Demo Preview
            </button>
            <button 
              onClick={onStartTrial}
              className="px-5 py-2.5 bg-[#0040FF] text-white border-3 border-[#111111] font-black uppercase tracking-wider text-xs shadow-[3px_3px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Launch Platform
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFE600] border-3 border-[#111111] text-xs font-black text-[#111111] uppercase tracking-wider mb-4 shadow-[3px_3px_0px_0px_#111111]">
            <Zap className="w-4 h-4 text-black" /> NEXT-GEN ENTERPRISE SYSTEM
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-black text-black tracking-tighter leading-none uppercase">
            STOP GUESSING.<br/>
            <span className="px-4 py-2 bg-[#FF3B30] text-white border-4 border-[#111111] inline-block shadow-[8px_8px_0px_0px_#111111] transform -rotate-1 my-3">
              START PREDICTING.
            </span>
          </h1>

          {/* Prominent Built By Shahid Pasha showcase */}
          <div className="my-6 py-4 px-8 bg-[#FAF8F5] border-3 border-[#111111] shadow-[6px_6px_0px_0px_#0040FF] inline-block max-w-xl mx-auto transform rotate-1 transition-transform hover:rotate-0">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#0040FF] block uppercase font-extrabold">ENGINEERING MASTERPIECE</span>
            <span className="text-2xl md:text-4xl font-black tracking-tight text-black uppercase font-display block mt-1">
              Built by <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B30] via-[#0040FF] to-[#00D180] drop-shadow-sm font-black">Shahid Pasha</span>
            </span>
            <div className="mt-2.5 flex justify-center flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono font-bold uppercase">
              <span className="text-[#FF3B30]">• Bauhaus Design</span>
              <span className="text-[#0040FF]">• GenZ Maximalist</span>
              <span className="text-[#00D180]">• Ultra Saturated</span>
            </div>
          </div>

          <p className="text-base md:text-xl text-slate-800 font-medium max-w-2xl mx-auto leading-relaxed">
            AI-powered marketing intelligence platform that discovers trends, predicts campaign performance, analyzes consumer sentiment, and recommends actions before your competitors react.
          </p>

          <div className="pt-6 flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <button 
              onClick={onStartTrial}
              className="px-8 py-4 bg-[#FF3B30] text-white border-4 border-[#111111] text-sm font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#111111] transition-all flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5 stroke-[3px]" />
            </button>
            <button 
              onClick={onStartTrial}
              className="px-8 py-4 bg-[#FFE600] text-black border-4 border-[#111111] text-sm font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#111111] transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-black text-black" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Dashboard Visual Mockup Preview */}
        <div className="mt-16 max-w-6xl mx-auto rounded-none overflow-hidden border-4 border-[#111111] bg-[#FAF8F5] p-3 md:p-6 shadow-[10px_10px_0px_0px_#111111] relative group">
          <div className="flex items-center gap-2 px-4 py-3 border-b-4 border-[#111111] mb-6 bg-[#FFE600] text-left">
            <span className="w-4 h-4 rounded-full bg-[#FF3B30] border-2 border-black" />
            <span className="w-4 h-4 rounded-full bg-[#FFE600] border-2 border-black" />
            <span className="w-4 h-4 rounded-full bg-[#0040FF] border-2 border-black" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-black ml-4 font-black">MARKETMIND_DASHBOARD_LIVE_STREAM</span>
            <span className="ml-auto text-[10px] font-mono text-black bg-[#00D180] border-2 border-black px-2 py-0.5 font-bold uppercase">SYSTEM ONLINE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left p-2 text-black">
            <div className="p-5 bg-white border-3 border-[#111111] shadow-[4px_4px_0px_0px_#0040FF] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#0040FF] uppercase font-black">Trend Momentum</span>
                <span className="text-xs text-black font-black bg-[#00D180] px-1 border border-black">+14.2%</span>
              </div>
              <p className="text-lg font-black text-black uppercase tracking-tight">Augmented Reality Try-On</p>
              <div className="h-4 w-full bg-[#111111]/10 border-2 border-black overflow-hidden">
                <div className="h-full bg-[#FF3B30] border-r-2 border-black" style={{ width: "88%" }} />
              </div>
              <p className="text-[10px] text-slate-700 font-bold">Opportunity Index: 91/100 • Critical Surge</p>
            </div>

            <div className="p-5 bg-[#FFE600] border-3 border-[#111111] shadow-[4px_4px_0px_0px_#111111] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-black uppercase font-black">Sentiment Health</span>
                <span className="text-xs text-white bg-[#0040FF] border border-black px-1 font-black">Positive</span>
              </div>
              <p className="text-lg font-black text-black uppercase tracking-tight">Brand Health: 78/100</p>
              <div className="flex gap-2 h-10 items-end border-b-2 border-black pb-1">
                <div className="w-full h-[60%] bg-[#FF3B30] border-2 border-black" />
                <div className="w-full h-[80%] bg-[#0040FF] border-2 border-black" />
                <div className="w-full h-[95%] bg-[#00D180] border-2 border-black" />
                <div className="w-full h-[30%] bg-black" />
              </div>
              <p className="text-[10px] text-slate-800 font-bold">Active channels: Twitter, Reddit, Insta</p>
            </div>

            <div className="p-5 bg-white border-3 border-[#111111] shadow-[4px_4px_0px_0px_#FF3B30] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#FF3B30] uppercase font-black">AI Copilot Status</span>
                <span className="text-[10px] text-black px-1.5 py-0.5 border-2 border-black bg-[#FFE600] font-black">READY</span>
              </div>
              <p className="text-xs text-slate-800 font-bold leading-relaxed">"Competitor shift observed: Apex Analytics price discount plan in EMEA detected."</p>
              <button 
                onClick={onStartTrial}
                className="w-full py-2 bg-[#FF3B30] text-white hover:bg-black text-[10px] uppercase tracking-wider font-black border-2 border-[#111111] transition-all shadow-[2px_2px_0px_0px_#111111]"
              >
                Launch Live Consulting
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 border-t-3 border-[#111111] bg-[#FFE600]/10 flex items-center justify-between text-xs text-black font-bold">
            <span>Powered by Gemini 3.5 AI Engine</span>
            <span className="text-[#0040FF] font-black hover:underline cursor-pointer uppercase tracking-wider" onClick={onStartTrial}>Enter Interactive Environment →</span>
          </div>
        </div>
      </section>

      {/* Sections 1 to 7: Features Bento Grid */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t-4 border-[#111111] relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">
            COMPREHENSIVE SUITE
          </h2>
          <p className="text-slate-800 font-bold text-lg">
            An integrated machine-learning stack replacing 8 distinct analytics and consulting systems. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div 
                key={idx}
                className="p-6 border-3 border-[#111111] transition-all duration-200 space-y-4 group flex flex-col justify-between"
                style={{ 
                  backgroundColor: feature.cardBg,
                  boxShadow: "5px 5px 0px 0px #111111"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${feature.accentColor}`;
                  e.currentTarget.style.transform = "translate(-3px, -3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "5px 5px 0px 0px #111111";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div className="space-y-4 text-left">
                  <div 
                    className="w-14 h-14 border-3 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_0px_#111111] transition-transform group-hover:scale-110" 
                    style={{ backgroundColor: feature.iconBg }}
                  >
                    <IconComp className="w-7 h-7 stroke-[2.5px]" style={{ color: feature.iconColor }} />
                  </div>
                  <h3 className="text-xl font-black text-black uppercase tracking-tight font-display group-hover:translate-x-1 transition-transform">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-900 font-bold leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Decorative Bauhaus graphic strip to enhance colors */}
                <div className="pt-2">
                  <div className="h-2 w-full border-2 border-black overflow-hidden flex">
                    <div className="h-full flex-1" style={{ backgroundColor: feature.accentColor }} />
                    <div className="h-full w-4 bg-black" />
                    <div className="h-full w-2 bg-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROI Optimization / Deep Analytics Showcase Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white border-4 border-[#111111] shadow-[10px_10px_0px_0px_#FF3B30] p-8 md:p-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="px-3 py-1 bg-[#FFE600] border-2 border-black text-xs font-black text-black uppercase tracking-wider">
              Channel Attribution & ROI
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-black text-black uppercase leading-none tracking-tight">
              KNOW WHERE EVERY DOLLAR CONVERTS
            </h3>
            <p className="text-slate-800 font-medium text-sm leading-relaxed">
              Our multi-touch attribution models track customer conversion journeys across organic, search, paid social, and newsletter channels. Predict channel ROI multipliers up to 90 days in advance and reallocate budgets dynamically.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 font-bold text-slate-800 text-xs">
                <CheckCircle className="w-5 h-5 text-[#00D180] stroke-[3px]" />
                <span>Dynamic Multi-Touch Journey Attribution graphs</span>
              </div>
              <div className="flex items-center gap-3 font-bold text-slate-800 text-xs">
                <CheckCircle className="w-5 h-5 text-[#00D180] stroke-[3px]" />
                <span>Algorithmic budget optimization recommendation engine</span>
              </div>
              <div className="flex items-center gap-3 font-bold text-slate-800 text-xs">
                <CheckCircle className="w-5 h-5 text-[#00D180] stroke-[3px]" />
                <span>Auto-export ready raw tables and visual reports</span>
              </div>
            </div>
            <button 
              onClick={onStartTrial}
              className="mt-4 px-6 py-3.5 bg-[#0040FF] text-white border-3 border-[#111111] font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_#111111] hover:bg-black transition-all"
            >
              Analyze Attribution Live
            </button>
          </div>

          <div className="lg:col-span-7 bg-[#FAF8F5] border-3 border-[#111111] p-6 shadow-[6px_6px_0px_0px_#111111] space-y-5">
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3">
              <span className="text-xs font-black text-black uppercase tracking-wider">Estimated ROI Analytics by Channel</span>
              <span className="text-[10px] font-mono text-slate-700 font-bold uppercase">Quarterly Projection</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-black">
                  <span className="text-slate-800">Meta Ads (Instagram & FB)</span>
                  <span className="text-black bg-[#FFE600] px-1 border border-black">4.8x ROI (Predicted)</span>
                </div>
                <div className="h-4 w-full bg-[#111111]/10 border-2 border-black overflow-hidden">
                  <div className="h-full bg-[#FF3B30]" style={{ width: "84%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-black">
                  <span className="text-slate-800">Google Ads (Search Intent)</span>
                  <span className="text-black bg-[#FFE600] px-1 border border-black">3.5x ROI (Predicted)</span>
                </div>
                <div className="h-4 w-full bg-[#111111]/10 border-2 border-black overflow-hidden">
                  <div className="h-full bg-[#0040FF]" style={{ width: "65%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-black">
                  <span className="text-slate-800">LinkedIn Paid</span>
                  <span className="text-black bg-[#FFE600] px-1 border border-black">2.1x ROI (Predicted)</span>
                </div>
                <div className="h-4 w-full bg-[#111111]/10 border-2 border-black overflow-hidden">
                  <div className="h-full bg-black" style={{ width: "42%" }} />
                </div>
              </div>

              <div className="p-3.5 bg-[#00D180] border-2 border-black text-black text-xs font-bold shadow-[2px_2px_0px_0px_#111111]">
                <strong>Optimizer Suggestion:</strong> Moving $4,500 of LinkedIn ad budget to Meta Ads could raise overall campaign conversion by 18.2% within 30 days.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center border-t-4 border-[#111111]">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#0040FF] font-black uppercase">UNPARALLELED VALUE</span>
          <h2 className="font-display text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">TRUSTED BY VISIONARY BRANDS</h2>
          <p className="text-slate-800 font-bold">Hear from high-growth enterprise marketing teams making real-world breakthroughs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, idx) => (
            <div key={idx} className="p-8 bg-white border-3 border-[#111111] shadow-[6px_6px_0px_0px_#111111] text-left space-y-6 flex flex-col justify-between hover:shadow-[6px_6px_0px_0px_#FF3B30] transition-all">
              <p className="text-base text-black font-medium leading-relaxed italic">"{test.quote}"</p>
              <div className="flex items-center gap-4 pt-4 border-t-2 border-[#111111]">
                <img src={test.image} alt={test.author} className="w-12 h-12 rounded-full object-cover border-2 border-black shadow-[2px_2px_0px_0px_#111111]" />
                <div>
                  <h4 className="text-sm font-black text-black uppercase">{test.author}</h4>
                  <p className="text-xs text-slate-700 font-bold">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t-4 border-[#111111] text-left">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#0040FF] font-black uppercase">CLEAR CLARIFICATIONS</span>
          <h2 className="font-display text-4xl md:text-6xl font-black text-black uppercase tracking-tighter text-center">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-3 border-[#111111] bg-white shadow-[4px_4px_0px_0px_#111111] overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FFE600]/10 transition-all"
              >
                <span className="text-sm md:text-base font-black text-black uppercase tracking-tight">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-black stroke-[3px] transition-transform ${activeFaq === idx ? "transform rotate-180" : ""}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-slate-800 font-semibold leading-relaxed border-t-2 border-[#111111] bg-[#FAF8F5]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-24 text-center px-6 border-t-4 border-[#111111] bg-[#FFE600] relative">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-black">
          <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter">PREDICT YOUR MARKETING SUCCESS</h2>
          <p className="text-base md:text-xl font-bold text-slate-900 max-w-2xl mx-auto">Join thousands of high-velocity growth agencies and enterprise brands executing strategy backed by modern AI insights.</p>
          <div className="pt-6">
            <button 
              onClick={onStartTrial}
              className="px-8 py-4 bg-[#FF3B30] text-white border-4 border-[#111111] text-xs md:text-sm font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#111111] transition-all inline-flex items-center gap-2"
            >
              Start Free Trial Now <ArrowRight className="w-5 h-5 stroke-[3px]" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t-4 border-[#111111] bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-2">
            <span className="font-display text-xl font-black text-white block uppercase tracking-wider">MARKETMIND AI</span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-mono text-[#EAE6DF]/60">
              <span>© 2026 MarketMind AI Inc. All rights reserved. Bauhaus Intelligence Lab.</span>
              <span className="inline-block text-[11px] font-mono font-black text-[#FFE600] border-2 border-[#FFE600] px-2 py-0.5 bg-black/40 rounded shadow-[2px_2px_0px_0px_#FF3B30] whitespace-nowrap">
                Built by Shahid Pasha.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
