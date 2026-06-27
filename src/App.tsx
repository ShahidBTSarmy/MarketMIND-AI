import { useState, useEffect } from "react";
import { 
  Sparkles, 
  LayoutDashboard, 
  Radar, 
  Heart, 
  Compass, 
  BarChart2, 
  FileText, 
  Users, 
  Activity, 
  Coins, 
  Bot, 
  Bolt, 
  ChevronRight, 
  Bell, 
  LogOut,
  X,
  Menu,
  Home
} from "lucide-react";

// Component imports
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import TrendRadar from "./components/TrendRadar";
import ConsumerInsights from "./components/ConsumerInsights";
import CompetitorIntel from "./components/CompetitorIntel";
import CampaignPredictor from "./components/CampaignPredictor";
import PersonaGenerator from "./components/PersonaGenerator";
import AttributionAnalytics from "./components/AttributionAnalytics";
import MarketForecasting from "./components/MarketForecasting";
import ContentAnalyzer from "./components/ContentAnalyzer";
import MarketingCopilot from "./components/MarketingCopilot";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

export default function App() {
  const [isAppLaunched, setIsAppLaunched] = useState(false);
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [industry, setIndustry] = useState("SaaS & Enterprise B2B");
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auto-clear toast notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const triggerNotification = (text: string) => {
    setNotification(text);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "trends", label: "Trend Radar", icon: Radar },
    { id: "sentiment", label: "Consumer Insights", icon: Heart },
    { id: "competitors", label: "Competitor Intel", icon: Compass },
    { id: "predictor", label: "Campaign Predictor", icon: Activity },
    { id: "content", label: "Content Analyzer", icon: FileText },
    { id: "personas", label: "Customer Personas", icon: Users },
    { id: "attribution", label: "Attribution Analytics", icon: Coins },
    { id: "forecasting", label: "Market Forecasting", icon: BarChart2 },
    { id: "copilot", label: "Marketing Copilot", icon: Bot },
    { id: "reports", label: "Reports", icon: AwardReports }, // Map to reports
    { id: "settings", label: "Settings", icon: Bolt }
  ];

  // Map temporary placeholder due to custom name
  function AwardReports(props: any) {
    return <FileText {...props} />;
  }

  const handleStartTrial = () => {
    setIsAppLaunched(true);
    triggerNotification("Welcome to the MarketMind AI Operating System!");
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard industry={industry} onNavigateTo={setActiveScreen} onShowNotification={triggerNotification} />;
      case "trends":
        return <TrendRadar industry={industry} onShowNotification={triggerNotification} />;
      case "sentiment":
        return <ConsumerInsights industry={industry} onNavigateTo={setActiveScreen} onShowNotification={triggerNotification} />;
      case "competitors":
        return <CompetitorIntel industry={industry} onShowNotification={triggerNotification} />;
      case "predictor":
        return <CampaignPredictor onShowNotification={triggerNotification} />;
      case "personas":
        return <PersonaGenerator onShowNotification={triggerNotification} />;
      case "attribution":
        return <AttributionAnalytics onShowNotification={triggerNotification} />;
      case "forecasting":
        return <MarketForecasting industry={industry} onShowNotification={triggerNotification} />;
      case "content":
        return <ContentAnalyzer onShowNotification={triggerNotification} />;
      case "copilot":
        return <MarketingCopilot industry={industry} onShowNotification={triggerNotification} />;
      case "reports":
        return <Reports industry={industry} onShowNotification={triggerNotification} />;
      case "settings":
        return <Settings industry={industry} onSetIndustry={setIndustry} onShowNotification={triggerNotification} />;
      default:
        return <Dashboard industry={industry} onNavigateTo={setActiveScreen} onShowNotification={triggerNotification} />;
    }
  };

  // If not entered Command Center yet, showcase landing page
  if (!isAppLaunched) {
    return <LandingPage onStartTrial={handleStartTrial} />;
  }

  return (
    <div className="bauhaus-grid-bg text-[#111111] font-sans min-h-screen flex relative overflow-x-hidden">

      {/* Sidebar for Desktop */}
      <aside className="hidden xl:flex flex-col justify-between w-72 bg-[#111111] border-r-4 border-[#111111] p-6 sticky top-0 h-screen z-20 text-white">
        <div className="space-y-8">
          {/* Logo block */}
          <button 
            onClick={() => {
              setIsAppLaunched(false);
              triggerNotification("Returned to Homepage.");
            }}
            className="w-full flex items-center gap-3 bg-[#FF3B30] p-3 border-3 border-[#111111] shadow-[4px_4px_0px_0px_#FFE600] text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-left"
          >
            <div className="p-1 bg-[#111111] border-2 border-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#FFE600]" />
            </div>
            <div>
              <span className="font-display text-lg font-black tracking-tighter block uppercase text-white leading-none">MARKETMIND</span>
              <span className="text-[8px] font-mono tracking-widest text-[#FFE600] uppercase block mt-1">BAUHAUS EDITION</span>
            </div>
          </button>

          {/* Developer badge */}
          <div className="p-4 bg-[#FFE600] border-3 border-[#111111] shadow-[4px_4px_0px_0px_#FF3B30] text-[#111111]">
            <span className="text-[9px] font-mono tracking-wider uppercase block font-black text-black">Architect-in-Chief</span>
            <span className="text-xl font-black uppercase tracking-tighter block mt-0.5 font-display text-black">Shahid Pasha</span>
          </div>

          {/* Navigation link stacks */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveScreen(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 border-3 transition-all duration-150 text-left font-black uppercase tracking-wider text-xs ${
                    isActive 
                      ? "bg-[#FFE600] text-[#111111] border-[#111111] shadow-[3px_3px_0px_0px_#FF3B30]" 
                      : "bg-[#222222] text-[#EAE6DF] border-transparent hover:border-[#111111] hover:bg-[#FFE600] hover:text-[#111111]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4.5 h-4.5 ${
                      isActive ? "text-[#0040FF]" : "text-[#eae6df]"
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#111111] stroke-[3px]" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit App footer */}
        <div className="border-t-3 border-[#111111] pt-4">
          <button 
            onClick={() => {
              setIsAppLaunched(false);
              triggerNotification("Logged out of Marketing Command Center.");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#FF3B30] text-white border-3 border-[#111111] shadow-[3px_3px_0px_0px_#0040FF] hover:translate-x-1 hover:shadow-[1px_1px_0px_0px_#0040FF] transition-all text-xs font-black uppercase tracking-wider text-left"
          >
            <LogOut className="w-4.5 h-4.5 text-white" />
            <span>Exit System</span>
          </button>
        </div>
      </aside>

      {/* Mobile/Tablet Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="xl:hidden fixed inset-0 bg-[#111111]/80 backdrop-blur-sm z-30" 
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`xl:hidden fixed top-0 bottom-0 left-0 w-72 bg-[#111111] border-r-4 border-[#111111] p-6 z-40 transform transition-transform duration-300 flex flex-col justify-between text-white ${
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setIsAppLaunched(false);
                setMobileSidebarOpen(false);
                triggerNotification("Returned to Homepage.");
              }}
              className="flex items-center gap-3 bg-[#FF3B30] p-2 border-2 border-[#111111] text-white text-left hover:scale-[1.02] transition-transform"
            >
              <div className="p-1 bg-[#111111]">
                <Sparkles className="w-5 h-5 text-[#FFE600]" />
              </div>
              <span className="font-display text-sm font-black uppercase tracking-tighter">MARKETMIND</span>
            </button>
            <button onClick={() => setMobileSidebarOpen(false)} className="p-2 border-3 border-[#111111] bg-[#FFE600] text-[#111111]">
              <X className="w-5 h-5 stroke-[3px]" />
            </button>
          </div>

          {/* Developer badge for mobile */}
          <div className="p-3 bg-[#FFE600] border-3 border-[#111111] text-[#111111]">
            <span className="text-[8px] font-mono tracking-wider uppercase block font-black">Architect-in-Chief</span>
            <span className="text-sm font-black uppercase tracking-tight block mt-0.5">Shahid Pasha</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveScreen(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 border-3 text-xs font-black uppercase tracking-wider text-left transition-all duration-150 ${
                    isActive 
                      ? "bg-[#FFE600] text-[#111111] border-[#111111] shadow-[3px_3px_0px_0px_#FF3B30]" 
                      : "bg-[#222222] text-[#eae6df] border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <IconComp className="w-4.5 h-4.5" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={() => {
            setIsAppLaunched(false);
            setMobileSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#FF3B30] text-white border-3 border-[#111111] text-xs font-black uppercase tracking-wider"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Exit System</span>
        </button>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-10 backdrop-blur-md bg-[#FAF8F5]/80 border-b-4 border-[#111111] py-4 px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="xl:hidden p-2 border-3 border-[#111111] bg-[#FFE600] text-[#111111] hover:bg-[#FF3B30] hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5 stroke-[2.5px]" />
            </button>
            
            {/* Industry focus vertical label */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase text-slate-600 font-bold">Active Sector Vector:</span>
              <span className="px-3 py-1 bg-[#0040FF] border-3 border-[#111111] text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#111111]">
                {industry}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Back to Homepage Button */}
            <button
              onClick={() => {
                setIsAppLaunched(false);
                triggerNotification("Returned to Homepage.");
              }}
              className="px-4 py-2 bg-[#FFE600] text-black border-3 border-[#111111] font-black uppercase tracking-wider text-xs shadow-[3px_3px_0px_0px_#FF3B30] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-2"
              title="Go to Website Homepage"
            >
              <Home className="w-4 h-4 text-black stroke-[3px]" />
              <span className="hidden md:inline">Go to Homepage</span>
              <span className="md:hidden">Home</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00D180] border-3 border-[#111111] shadow-[3px_3px_0px_0px_#111111] text-[#111111]">
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-[#111111]">
                Built by <strong className="text-black font-black underline decoration-2 decoration-[#FF3B30]">Shahid Pasha</strong>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border-3 border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-xs font-mono font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#00D180] animate-pulse" />
              <span>BAUHAUS_OS SECURED</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel View with generous spacing and alignment */}
        <div className="flex-1 p-6 md:p-12 max-w-7xl w-full mx-auto pb-24">
          {renderActiveScreen()}
        </div>
      </main>

      {/* Animated Toast Notifications Overlay */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-indigo-400/30 bg-[#0d0e16] text-white flex items-center gap-3.5 shadow-2xl shadow-indigo-900/30 max-w-md animate-slideIn">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Bell className="w-4 h-4 text-indigo-300 animate-swing" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-[#a2e7ff] block uppercase tracking-wider">SYSTEM INDICATOR</span>
            <span className="text-xs font-semibold">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:bg-white/5 rounded ml-2">
            <X className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
