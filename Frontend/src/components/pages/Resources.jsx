import { useState } from "react";
import { Card, Pill, Btn, SectionTitle, FilterChips, PageWrap } from "../ui";

const RESOURCES = [
  { title: "Data Structures — Complete Notes", meta: "Sem 5 · DS · 4.2 MB", tags: [["Trees","blue"],["Graphs","purple"],["DP","teal"]], contributor: "RK", contribName: "Rahul K.", downloads: 142, bg: "bg-red-500/10", color: "text-red-400", icon: "📄" },
  { title: "OS — Process Management Unit 4", meta: "Sem 5 · OS · 2.8 MB", tags: [["Scheduling","green"],["Deadlock","amber"]], contributor: "SM", contribName: "Sneha M.", downloads: 98, bg: "bg-emerald-500/10", color: "text-emerald-400", icon: "📄" },
  { title: "DBMS — Normalization & SQL Queries", meta: "Sem 5 · DBMS · 1.9 MB", tags: [["1NF–BCNF","purple"],["SQL","teal"]], contributor: "AJ", contribName: "Arjun J.", downloads: 76, bg: "bg-violet-500/10", color: "text-violet-400", icon: "📊" },
  { title: "CN — TCP/IP & Routing Protocols", meta: "Sem 5 · CN · 3.1 MB", tags: [["TCP","teal"],["Routing","blue"]], contributor: "PD", contribName: "Priya D.", downloads: 64, bg: "bg-teal-500/10", color: "text-teal-400", icon: "💻" },
  { title: "DS Lab Manual — All Experiments", meta: "Sem 5 · DS Lab · 5.4 MB", tags: [["Lab","amber"],["C++","gray"]], contributor: "NK", contribName: "Nikhil K.", downloads: 53, bg: "bg-amber-500/10", color: "text-amber-400", icon: "⚙️" },
];

const SEM_FILTERS = ["All", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
const TYPE_FILTERS = ["Notes", "Lab", "Assignments", "Tutorials"];

export default function Resources({ onNavigate }) {
  const [semFilter, setSemFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState(null);

  return (
    <PageWrap
      title="Notes & Resources"
      subtitle="Semester-wise academic materials shared by students"
      action={<Btn onClick={() => {}}>⬆️ Upload</Btn>}
    >
      {/* Search + filters */}
      <div className="flex gap-2.5 mb-3">
        <input
          placeholder="🔍 Search notes, subjects…"
          className="bg-[#ece4c8] border border-black/10 rounded-lg px-3 py-2 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-white/20 transition-colors w-72"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <FilterChips chips={SEM_FILTERS} active={semFilter} onChange={setSemFilter} />
        <div className="w-px h-4 bg-white/10" />
        <FilterChips chips={TYPE_FILTERS} active={typeFilter} onChange={setTypeFilter} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {RESOURCES.map((r, i) => (
          <div key={i} className="bg-[#f5efdc] border border-black/10 rounded-xl p-3.5 hover:border-white/15 transition-colors cursor-pointer">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2.5 ${r.bg} ${r.color}`}>
              {r.icon}
            </div>
            <div className="text-sm font-medium text-[#1a2540] mb-1 leading-snug">{r.title}</div>
            <div className="text-[11px] text-[#5a6a85] mb-2">{r.meta}</div>
            <div className="flex gap-1 flex-wrap mb-2.5">
              {r.tags.map(([tag, color]) => <Pill key={tag} color={color}>{tag}</Pill>)}
            </div>
            <div className="flex items-center gap-2 pt-2.5 border-t border-black/10">
              <div className="flex items-center gap-1.5 text-[11px] text-[#5a6a85]">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-semibold ${r.bg} ${r.color}`}>{r.contributor}</div>
                {r.contribName}
              </div>
              <span className="text-[11px] text-[#5a6a85] ml-auto">↓ {r.downloads}</span>
              <Btn variant="ghost" size="sm" onClick={() => onNavigate("doubts")}>Explain 🧠</Btn>
            </div>
          </div>
        ))}

        {/* Upload placeholder */}
        <div className="bg-[#f5efdc] border border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[160px] hover:border-white/25 transition-colors">
          <span className="text-2xl text-[#5a6a85]">⬆️</span>
          <span className="text-sm text-[#5a6a85]">Upload a resource</span>
          <span className="text-[11px] text-[#5a6a85]">PDF, DOCX, ZIP supported</span>
        </div>
      </div>
    </PageWrap>
  );
}
