import { useState } from "react";
import { CardSm, Pill, SectionTitle, PageWrap, Avatar } from "../ui";

const INITIAL_MESSAGES = [
  { from: "ai", text: "Hi Aryan! Ask me anything from your Sem 5 syllabus — I can explain concepts, trace through code, or walk you through PYQ questions step by step." },
  { from: "user", text: "Can you explain dynamic programming with the knapsack problem?" },
  {
    from: "ai",
    subject: "DS · Sem 5",
    text: "DP breaks a problem into overlapping subproblems and caches results to avoid recomputation.\n\nFor 0/1 Knapsack — given items with weights and values, and bag capacity W, maximise value:",
    code: "dp[i][w] = max(\n  dp[i-1][w],\n  dp[i-1][w - wt[i]] + val[i]\n)\ni = item index, w = current capacity",
    actions: ["▶ Trace example", "📄 PYQ on this", "💬 Ask community"],
  },
];

const SUBJECTS = ["All subjects", "Data Structures", "OS", "DBMS", "CN", "ML", "Web dev"];

const PREDICTIONS = [
  { icon: "🔥", title: "Dynamic programming", meta: "92% — likely this exam" },
  { icon: "📈", title: "Graph algorithms", meta: "80% — high confidence" },
  { icon: "🌿", title: "AVL trees", meta: "72% — due again" },
];

export default function AiDoubts({ onNavigate }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [loading, setLoading] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: q }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai", text: `Good question! Let me explain ${q.toLowerCase().includes("tree") ? "trees" : "this concept"} in the context of your ${subject === "All subjects" ? "Sem 5" : subject} syllabus step by step…` }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <PageWrap title="AI Doubt Solver" subtitle="Course-aware AI tutor referencing your Sem 5 syllabus">
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 280px" }}>

        {/* Chat */}
        <div className="bg-[#f5efdc] border border-black/10 rounded-xl flex flex-col overflow-hidden">
          {/* Subject chips */}
          <div className="flex gap-1.5 px-3.5 py-2.5 border-b border-black/10 overflow-x-auto">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-3 py-1 rounded-full text-xs border transition-all whitespace-nowrap cursor-pointer
                  ${subject === s
                    ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                    : "border-black/10 text-[#5a6a85] bg-transparent hover:bg-black/5"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 flex flex-col gap-3 min-h-[320px] overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 items-start ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                {m.from === "ai" ? (
                  <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center text-sm shrink-0">🧠</div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-[10px] font-semibold text-white shrink-0">AK</div>
                )}
                <div className="max-w-[80%]">
                  <div className={`px-3 py-2.5 rounded-xl text-sm leading-relaxed
                    ${m.from === "ai"
                      ? "bg-[#ece4c8] text-[#1a2540] rounded-tl-sm"
                      : "bg-violet-500/20 text-[#1a2540] rounded-tr-sm"
                    }`}>
                    {m.subject && <Pill color="teal" className="text-[10px] mb-2 block w-fit">{m.subject}</Pill>}
                    {m.text.split("\n\n").map((p, j) => <p key={j} className={j > 0 ? "mt-2" : ""}>{p}</p>)}
                    {m.code && (
                      <pre className="bg-[#f5efdc] border border-black/10 rounded-lg p-2.5 mt-2 font-mono text-[11px] text-blue-300 leading-relaxed overflow-x-auto">
                        {m.code}
                      </pre>
                    )}
                  </div>
                  {m.actions && (
                    <div className="flex gap-1.5 flex-wrap mt-1.5">
                      {m.actions.map((a, j) => (
                        <button
                          key={j}
                          onClick={() => j === 1 ? onNavigate("papers") : j === 2 ? onNavigate("community") : null}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-black/10 bg-transparent text-[#5a6a85] hover:bg-black/5 hover:text-[#1a2540] transition-all cursor-pointer"
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center text-sm shrink-0">🧠</div>
                <div className="bg-[#ece4c8] px-3 py-2.5 rounded-xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 150, 300].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full bg-[#5a6a85] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-black/10 flex gap-2 items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="Ask a doubt, paste code, or describe what you're stuck on…"
              className="flex-1 bg-[#ece4c8] border border-black/10 rounded-lg px-3 py-2 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none resize-none h-10 leading-normal font-['DM_Sans',sans-serif]"
            />
            <button
              onClick={send}
              className="px-4 h-10 bg-violet-500/80 hover:bg-violet-600 text-white border-0 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap"
            >
              Ask AI
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-2.5">
          <CardSm>
            <SectionTitle>🎯 Predicted topics</SectionTitle>
            {PREDICTIONS.map((p) => (
              <button
                key={p.title}
                onClick={() => onNavigate("papers")}
                className="w-full flex items-center gap-2.5 p-2 bg-[#ece4c8] rounded-lg mb-1.5 border border-transparent hover:border-black/10 transition-all cursor-pointer text-left"
              >
                <span className="text-lg">{p.icon}</span>
                <div>
                  <div className="text-xs font-medium text-[#1a2540]">{p.title}</div>
                  <div className="text-[11px] text-[#5a6a85] mt-0.5">{p.meta}</div>
                </div>
              </button>
            ))}
          </CardSm>

          <CardSm>
            <SectionTitle>📄 Recent PYQs</SectionTitle>
            {["DS End-sem 2024", "OS End-sem 2024", "DBMS Mid-sem 2024"].map((q) => (
              <button
                key={q}
                onClick={() => onNavigate("papers")}
                className="w-full text-left py-1.5 border-b border-black/10 last:border-0 text-sm text-[#1a2540] hover:text-blue-400 transition-colors cursor-pointer bg-transparent"
              >
                {q} ↗
              </button>
            ))}
          </CardSm>

          <CardSm>
            <SectionTitle>💬 Active doubts</SectionTitle>
            {["Process vs thread", "3NF vs BCNF", "TCP flow control"].map((q) => (
              <button
                key={q}
                onClick={() => onNavigate("community")}
                className="w-full text-left py-1.5 border-b border-black/10 last:border-0 text-sm text-[#1a2540] hover:text-blue-400 transition-colors cursor-pointer bg-transparent"
              >
                {q} ↗
              </button>
            ))}
          </CardSm>
        </div>
      </div>
    </PageWrap>
  );
}
