import { useState } from "react";
import { Pill, Btn, FilterChips, PageWrap, Avatar } from "../ui";

const THREADS = [
  { id: 1, tag: "Doubt", tagColor: "blue", subject: "OS", title: "Difference between process and thread in OS?", votes: 47, replies: 12, time: "2h ago" },
  { id: 2, tag: "Hackathon", tagColor: "amber", title: "SIH 2025 open — forming 6-member team, need ML + backend dev", votes: 28, replies: 8, time: "5h ago" },
  { id: 3, tag: "Doubt", tagColor: "purple", subject: "DBMS", title: "Can someone explain 3NF vs BCNF with example?", votes: 19, replies: 6, time: "1d ago" },
  { id: 4, tag: "Mentorship", tagColor: "green", title: "Looking for seniors who cleared GATE — need guidance on preparation", votes: 15, replies: 4, time: "2d ago" },
];

const COMMENTS = [
  { initials: "RK", colorIndex: 0, name: "Rahul Kumar", sem: "Sem 6", text: "A process is an independent program in execution with its own memory space. A thread is the smallest unit of execution within a process, sharing the process's memory. Multiple threads communicate faster than inter-process communication.", votes: 31 },
  { initials: "SM", colorIndex: 4, name: "Sneha Mishra", sem: "Sem 5", text: "Key difference: context switch between processes is heavy (saves full PCB) while between threads is lightweight (shared address space). Threads share heap but have separate stacks.", votes: 18 },
];

export default function Community({ onNavigate }) {
  const [activeThread, setActiveThread] = useState(THREADS[0]);
  const [filter, setFilter] = useState("All");

  return (
    <PageWrap
      title="Community"
      subtitle="Discuss doubts, share opportunities, find mentors"
      action={<Btn>+ New thread</Btn>}
    >
      <div className="mb-3">
        <FilterChips chips={["All","Doubts","Hackathon","Mentorship","Projects"]} active={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "340px 1fr" }}>
        {/* Thread list */}
        <div>
          {THREADS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveThread(t)}
              className={`w-full text-left p-3 rounded-xl mb-1.5 border transition-all duration-150 cursor-pointer
                ${activeThread.id === t.id
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-black/10 bg-[#f5efdc] hover:border-white/15"
                }`}
            >
              <div className="flex gap-1.5 mb-1.5">
                <Pill color={t.tagColor}>{t.tag}</Pill>
                {t.subject && <Pill color="gray">{t.subject}</Pill>}
              </div>
              <div className="text-sm font-medium leading-snug mb-1.5">{t.title}</div>
              <div className="flex items-center gap-2 text-[11px] text-[#5a6a85]">
                <span>↑ {t.votes}</span>
                <span>{t.replies} replies</span>
                <span>{t.time}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Thread detail */}
        <div className="bg-[#f5efdc] border border-black/10 rounded-xl p-4">
          {/* Thread header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex gap-1.5 mb-1.5">
                <Pill color={activeThread.tagColor}>{activeThread.tag}</Pill>
                {activeThread.subject && <Pill color="gray">{activeThread.subject} · Sem 5</Pill>}
              </div>
              <h2 className="font-['Syne',sans-serif] text-base font-semibold leading-snug">{activeThread.title}</h2>
              <p className="text-xs text-[#5a6a85] mt-1.5">Asked by Aryan K. · {activeThread.time}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <Btn variant="ghost" size="sm" onClick={() => onNavigate("doubts")}>Ask AI 🧠</Btn>
              <Btn variant="ghost" size="sm" onClick={() => onNavigate("messages")}>💌 DM</Btn>
              {activeThread.tag === "Hackathon" && (
                <Btn variant="ghost" size="sm" onClick={() => onNavigate("projects")}>Post to Projects ↗</Btn>
              )}
            </div>
          </div>

          {/* Comments */}
          {COMMENTS.map((c, i) => (
            <div key={i} className="flex gap-2.5 mb-3.5">
              <Avatar initials={c.initials} colorIndex={c.colorIndex} />
              <div className="flex-1">
                <div className="bg-[#ece4c8] rounded-xl px-3 py-2.5">
                  <div className="text-xs font-medium mb-1">
                    {c.name} <span className="font-normal text-[#5a6a85]">· {c.sem}</span>
                  </div>
                  <div className="text-sm leading-relaxed text-[#1a2540]">{c.text}</div>
                </div>
                <div className="flex gap-3 mt-1.5 ml-1">
                  <button className="text-[11px] text-[#5a6a85] hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0">↑ {c.votes}</button>
                  <button className="text-[11px] text-[#5a6a85] hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0">Reply</button>
                  <button onClick={() => onNavigate("messages")} className="text-[11px] text-[#5a6a85] hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0">💌 Message</button>
                </div>
              </div>
            </div>
          ))}

          {/* Reply box */}
          <div className="bg-[#ece4c8] border border-black/10 rounded-xl px-3 py-2.5 text-sm text-[#5a6a85] cursor-text mt-2">
            Write a reply…
          </div>
        </div>
      </div>
    </PageWrap>
  );
}