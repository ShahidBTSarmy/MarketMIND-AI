import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Sparkles, HelpCircle, AlertCircle, Trash2 } from "lucide-react";
import { CopilotMessage } from "../types";

interface MarketingCopilotProps {
  industry: string;
  onShowNotification: (text: string) => void;
}

export default function MarketingCopilot({ industry, onShowNotification }: MarketingCopilotProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "init_msg",
      role: "assistant",
      content: `Hello! I am your MarketMind AI strategic consultant. I have loaded active cross-channel data vectors for the **${industry}** sector.\n\nAsk me specific questions like:\n- *"Why is my campaign failing?"*\n- *"Which audience demographic should I target?"*\n- *"What emerging trends should I prioritize next week?"*\n- *"Where should I allocate my remaining $10K budget?"*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const commonPrompts = [
    { text: "Why is my campaign failing?", label: "Campaign Audit" },
    { text: "Where should I allocate budget?", label: "Budget Reallocation" },
    { text: "What trends are emerging?", label: "Emerging Trends" },
    { text: "What content should I publish next week?", label: "Content Schedule" }
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: CopilotMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          industry
        })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: `ai_${Date.now()}`,
        role: "assistant",
        content: data.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("Error communicating with Copilot:", err);
      setMessages(prev => [...prev, {
        id: `ai_err_${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I had difficulty routing that advice query. Check your secret API credentials inside Settings.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init_${Date.now()}`,
        role: "assistant",
        content: `Conversation logs refreshed. Focused sector: **${industry}**. What tactical objective can I analyze for you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    onShowNotification("Conversation memory cleared.");
  };

  return (
    <div className="space-y-8 flex flex-col">
      {/* Title */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-4 border-[#111111] pb-6 gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#111111] font-display">
            Strategic Copilot
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#0040FF] font-mono mt-1 font-extrabold">
            Enterprise-grade virtual business consultant and ad performance auditor
          </p>
        </div>
        <button 
          onClick={handleClearChat}
          className="px-4 py-2 bg-[#FF3B30] text-white border-3 border-[#111111] font-black shadow-[4px_4px_0px_0px_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-xs uppercase tracking-wider flex items-center gap-2"
          title="Clear Chat Logs"
        >
          <Trash2 className="w-4 h-4 text-white stroke-[2.5px]" />
          <span>Clear Memory</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Chat Feed */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white border-3 border-[#111111] rounded-2xl shadow-[5px_5px_0px_0px_#111111] overflow-hidden h-[550px] md:h-[650px]">
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex gap-4 max-w-3xl ${m.role === 'user' ? 'ml-auto flex-row-reverse text-right' : 'text-left'}`}
              >
                <div className={`w-10 h-10 border-3 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex items-center justify-center flex-shrink-0 ${
                  m.role === 'user' 
                    ? 'bg-[#0040FF] text-white' 
                    : 'bg-[#FFE600] text-black'
                }`}>
                  {m.role === 'user' ? <User className="w-5 h-5 stroke-[2.5px]" /> : <Bot className="w-5 h-5 stroke-[2.5px]" />}
                </div>

                <div className={`p-4 border-2 border-[#111111] text-xs leading-relaxed space-y-1 relative shadow-[3px_3px_0px_0px_#111111] ${
                  m.role === 'user' 
                    ? 'bg-[#EEF2FF] text-[#111111] font-bold rounded-2xl rounded-tr-none' 
                    : 'bg-[#FAF8F5] text-[#111111] font-semibold rounded-2xl rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{m.content}</p>
                  <span className="text-[8px] font-mono text-slate-600 block pt-1 font-bold">{m.timestamp}</span>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 border-3 border-[#111111] shadow-[2px_2px_0px_0px_#111111] bg-[#FFE600] text-black flex items-center justify-center flex-shrink-0 animate-bounce">
                  <Bot className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <div className="p-4 border-2 border-[#111111] bg-[#FFE600]/10 text-xs text-[#111111] font-bold rounded-2xl rounded-tl-none shadow-[3px_3px_0px_0px_#111111] flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#0040FF] animate-spin" />
                  <span>Synthesizing tactical recommendation matrix...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Form input */}
          <div className="p-4 border-t-3 border-[#111111] bg-[#FAF8F5] flex items-center gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              placeholder="Ask Copilot a strategic question..."
              className="flex-1 px-4 py-3 rounded bg-white border-2 border-[#111111] text-xs text-[#111111] font-bold focus:outline-none focus:bg-[#FFE600]/5 focus:border-[#FF3B30] transition-all"
            />
            <button 
              onClick={() => handleSendMessage(input)}
              disabled={loading || !input.trim()}
              className="p-3 bg-[#FFE600] text-black border-2 border-[#111111] hover:bg-[#FFE600]/80 disabled:opacity-50 transition-all font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#111111] disabled:shadow-none disabled:translate-x-0 active:translate-x-0.5 active:translate-y-0.5"
            >
              <Send className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>
        </div>

        {/* Right Side: Quick Action Prompts */}
        <div className="lg:col-span-4 space-y-6 text-left overflow-y-auto pr-1">
          <div className="bg-white border-3 border-[#111111] p-5 rounded-2xl shadow-[5px_5px_0px_0px_#111111] space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#111111] flex items-center gap-1.5 border-b-2 border-[#111111] pb-2 font-display">
              <HelpCircle className="w-5 h-5 text-[#0040FF] stroke-[2.5px]" /> Consult Common Prompts
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {commonPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.text)}
                  className="w-full text-left p-3.5 bg-[#FAF8F5] border-2 border-[#111111] rounded-xl hover:bg-[#FFE600]/15 hover:border-[#FF3B30] text-xs text-slate-800 transition-all flex flex-col gap-1.5 shadow-[3px_3px_0px_0px_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none group"
                >
                  <span className="text-[9px] font-mono text-[#0040FF] font-black uppercase tracking-wider">{p.label}</span>
                  <span className="text-[#111111] font-extrabold group-hover:text-[#0040FF] transition-colors">{p.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-3 border-[#111111] bg-[#EDFDF6] text-xs text-[#111111] font-bold leading-relaxed shadow-[4px_4px_0px_0px_#00D180] rounded-xl">
            <strong className="text-[#00D180] font-black uppercase tracking-wider block mb-1">💡 Pro Tip:</strong> 
            Specify budget figures and target platform references inside your query parameters to enable precise ad simulation metrics.
          </div>
        </div>

      </div>
    </div>
  );
}
