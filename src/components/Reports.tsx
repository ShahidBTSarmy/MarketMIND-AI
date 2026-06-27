import { useState } from "react";
import { Award, FileText, Download, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";

interface ReportsProps {
  industry: string;
  onShowNotification: (text: string) => void;
}

export default function Reports({ industry, onShowNotification }: ReportsProps) {
  const [reportTitle, setReportTitle] = useState(`${industry} Q3 Competitive Landscape & Trend Audit`);
  const [format, setFormat] = useState<"pdf" | "json" | "csv">("pdf");
  const [exporting, setExporting] = useState(false);
  const [sections, setSections] = useState({
    trends: true,
    sentiment: true,
    competitors: true,
    forecasting: true,
    content: false,
    attribution: true,
  });

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      onShowNotification(`"${reportTitle}" compiled and exported as ${format.toUpperCase()}!`);
      
      // Simulate an actual browser download by writing a temporary mock document anchor link
      const blob = new Blob([
        `MARKETMIND AI ENTERPRISE AUDIT REPORT\n` +
        `===================================\n` +
        `TITLE: ${reportTitle}\n` +
        `SECTOR VERTICAL: ${industry}\n` +
        `DATE COMPILED: ${new Date().toLocaleDateString()}\n\n` +
        `Exported telemetry metrics conforming to chosen options:\n` +
        `- Trend Radar Momentum Metrics: OK\n` +
        `- Consumer Sentiment Health Score: OK\n` +
        `- Competitor Value Matrix Analysis: OK\n` +
        `- Opportunity Forecasting: OK\n` +
        `===================================\n` +
        `End of MarketMind AI Secure Export Pipeline.`
      ], { type: "text/plain" });
      
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${reportTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      {/* Title */}
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white font-display">
          Report Compiler
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-[#bdc2ff] font-mono mt-1">
          Export client-ready marketing audits and data-room intelligence packages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <FileText className="w-4 h-4 text-cyan-300" /> Report Configuration
            </h3>

            {/* Document Title input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Report Title / Client Reference</label>
              <input 
                type="text" 
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#12131b]/80 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-sans"
              />
            </div>

            {/* Inclusions checkboxes */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Include Analytics Modules</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'trends', label: 'Trend Radar topics' },
                  { key: 'sentiment', label: 'Social sentiments & Comment logs' },
                  { key: 'competitors', label: 'Competitor matrix cards' },
                  { key: 'forecasting', label: 'Opportunity forecasting indexes' },
                  { key: 'attribution', label: 'Attribution budget reallocations' },
                  { key: 'content', label: 'Copy engagement scores' },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-3 p-3 bg-white/2 rounded-lg border border-white/5 cursor-pointer hover:border-white/15 transition-all text-xs text-[#c5c5d8]">
                    <input 
                      type="checkbox"
                      checked={(sections as any)[opt.key]}
                      onChange={(e) => setSections({...sections, [opt.key]: e.target.checked})}
                      className="accent-cyan-400 w-4 h-4 rounded"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Export format picker */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Export File Format</label>
              <div className="flex gap-2">
                {(['pdf', 'json', 'csv'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`px-6 py-2.5 rounded-lg text-xs font-semibold border uppercase transition-all ${
                      format === fmt 
                        ? "bg-white/10 border-cyan-400 text-white" 
                        : "bg-white/2 border-white/5 text-slate-400 hover:border-white/10"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compiler Action Panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 border-b border-indigo-500/15 pb-2 mb-3">
                <Sparkles className="w-4 h-4" /> Secure Pipeline Compile
              </h3>
              <p className="text-xs text-[#c5c5d8] leading-relaxed mb-4">
                This process compiles calculated ad returns and competitive scores into an isolated data package securely conforming to SOC-2 isolation metrics.
              </p>
              
              <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/40 p-3.5 rounded-xl border border-white/5 font-mono">
                <div className="flex justify-between">
                  <span>Inclusions count:</span>
                  <span className="text-white font-bold">{Object.values(sections).filter(Boolean).length} modules</span>
                </div>
                <div className="flex justify-between">
                  <span>File format target:</span>
                  <span className="text-white font-bold uppercase">{format}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#7886ff] to-[#bdc2ff] text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(189,194,255,0.4)] transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {exporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {exporting ? "Compiling documents..." : "Compile & Export Report"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
