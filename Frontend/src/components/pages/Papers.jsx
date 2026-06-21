import { useState } from "react";
import { Card, Pill, Btn, SectionTitle, TabBar, StatCard, PageWrap, Select } from "../ui";

const PAPERS = [
  { name: "Data Structures — End Sem 2024", meta: "AKTU · Sem 5 · Dec 2024", type: "End-sem", typeColor: "blue", tags: [["DP","teal"],["Trees","purple"],["Graphs","blue"]] },
  { name: "OS — End Sem 2024", meta: "AKTU · Sem 5 · Dec 2024", type: "End-sem", typeColor: "blue", tags: [["Scheduling","green"],["Deadlock","amber"]] },
  { name: "DBMS — Mid Sem 2024", meta: "AKTU · Sem 5 · Sep 2024", type: "Mid-sem", typeColor: "purple", tags: [["SQL","purple"],["ER Diagram","teal"]] },
  { name: "Data Structures — End Sem 2023", meta: "AKTU · Sem 5 · Dec 2023", type: "End-sem", typeColor: "blue", tags: [["Hashing","teal"],["Sorting","blue"]] },
  { name: "CN — Viva Questions Bank 2024", meta: "Dept. · Sem 5 · Jan 2024", type: "Viva", typeColor: "amber", tags: [["OSI Model","amber"],["TCP/IP","green"]] },
];

const TOPICS = [
  { name: "Dynamic programming", count: 22, pct: 90, hot: true, color: "bg-blue-500/55" },
  { name: "Trees & BST", count: 19, pct: 77, hot: true, color: "bg-blue-500/50" },
  { name: "Graph algorithms", count: 17, pct: 68, color: "bg-blue-500/45" },
  { name: "Sorting algorithms", count: 15, pct: 60, color: "bg-blue-500/40" },
  { name: "Hashing", count: 11, pct: 44, color: "bg-blue-500/35" },
  { name: "Heaps & priority queue", count: 9, pct: 36, color: "bg-blue-500/30" },
  { name: "Linked lists", count: 7, pct: 28, color: "bg-violet-500/40" },
  { name: "Stacks & queues", count: 5, pct: 20, color: "bg-violet-500/35" },
];

const PREDICTIONS = [
  { icon: "🔥", bg: "bg-amber-500/12", name: "Dynamic programming — knapsack & LCS", note: "5 of last 6 years · missed 2022 · due again", conf: 92, confColor: "bg-amber-400" },
  { icon: "📈", bg: "bg-blue-500/12", name: "Graph — Dijkstra & Bellman-Ford", note: "4 consecutive years · alternates question type", conf: 80, confColor: "bg-blue-400" },
  { icon: "🌿", bg: "bg-emerald-500/10", name: "AVL tree rotations & B-tree ops", note: "10–15 mark question · 3 of last 4 years", conf: 72, confColor: "bg-emerald-400" },
  { icon: "📷", bg: "bg-teal-500/10", name: "Hashing — collision resolution", note: "Skipped last year · high recurrence pattern", conf: 65, confColor: "bg-teal-400" },
];

function PaperRow({ paper, onNavigate }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#f5efdc] border border-black/10 rounded-xl mb-1.5 hover:border-white/15 transition-colors">
      <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 text-base shrink-0">📄</div>
      <div className="flex-1">
        <div className="text-sm font-medium">{paper.name}</div>
        <div className="text-[11px] text-[#5a6a85] mt-0.5 flex items-center gap-1.5">
          {paper.meta} · <Pill color={paper.typeColor} className="text-[10px]">{paper.type}</Pill>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap mr-3">
        {paper.tags.map(([t, c]) => <Pill key={t} color={c} className="text-[10px]">{t}</Pill>)}
      </div>
      <div className="flex gap-1.5">
        <Btn variant="ghost" size="sm">👁️ Preview</Btn>
        <Btn variant="ghost" size="sm" onClick={() => onNavigate("doubts")}>Practise 🧠</Btn>
      </div>
    </div>
  );
}

function Analyser({ onNavigate }) {
  return (
    <div>
      {/* Subject/Sem filters */}
      <div className="flex gap-2 items-center mb-4 flex-wrap">
        <Select options={["Data Structures","OS","DBMS","CN","ML"]} />
        <Select options={["Sem 5","Sem 4","Sem 3"]} />
        <span className="text-xs text-[#5a6a85]">47 papers analysed · 2019–2024</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard value="47" label="Papers analysed" />
        <StatCard value="6" label="Years covered" />
        <StatCard value="23" label="Unique topics" />
        <StatCard value="8" label="High-prob topics" deltaColor="text-emerald-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Topic frequency */}
        <Card>
          <SectionTitle>📊 Most repeated topics (2019–2024)</SectionTitle>
          {TOPICS.map((t) => (
            <div key={t.name} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#1a2540]">{t.name}</span>
                <span className="text-[11px] text-[#5a6a85] flex items-center gap-1.5">
                  {t.count}×
                  {t.hot && <Pill color="amber" className="text-[10px] py-0">🔥 Hot</Pill>}
                </span>
              </div>
              <div className="h-2 bg-[#f5efdc] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </Card>

        {/* Predictions */}
        <Card>
          <SectionTitle>🎯 Predicted for next exam</SectionTitle>
          {PREDICTIONS.map((p) => (
            <div key={p.name} className={`flex items-start gap-2.5 p-2.5 rounded-xl mb-1.5 border border-black/10 ${p.bg}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 ${p.bg}`}>{p.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium leading-snug">{p.name}</div>
                <div className="text-[11px] text-[#5a6a85] mt-0.5">{p.note}</div>
                <div className="h-1 bg-[#f5efdc] rounded-full mt-1.5 overflow-hidden">
                  <div className={`h-full rounded-full ${p.confColor}`} style={{ width: `${p.conf}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#5a6a85]">{p.conf}% confidence</span>
                  <button
                    onClick={() => onNavigate("doubts")}
                    className="text-[10px] text-blue-400 hover:text-blue-300 cursor-pointer bg-transparent border-0"
                  >
                    Study ↗️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

export default function Papers({ onNavigate }) {
  const [tab, setTab] = useState("Browse papers");

  return (
    <PageWrap title="Papers & PYQ Analyser" subtitle="Previous year papers with AI-powered topic analysis and exam predictions">
      <TabBar tabs={["Browse papers", "📊 PYQ Analyser"]} active={tab} onChange={setTab} />

      {tab === "Browse papers" ? (
        <div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <Select options={["All subjects","Data Structures","OS","DBMS","CN"]} />
            <Select options={["All years","2024","2023","2022","2021"]} />
            <Select options={["All types","End-sem","Mid-sem","Viva"]} />
            <Btn size="sm" className="ml-auto" onClick={() => {}}>⬆️ Upload paper</Btn>
          </div>
          {PAPERS.map((p, i) => <PaperRow key={i} paper={p} onNavigate={onNavigate} />)}
        </div>
      ) : (
        <Analyser onNavigate={onNavigate} />
      )}
    </PageWrap>
  );
}
