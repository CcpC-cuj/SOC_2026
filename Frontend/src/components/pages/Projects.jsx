import { useState } from "react";
import { Pill, Btn, FilterChips, PageWrap, Avatar } from "../ui";

const PROJECTS = [
  {
    type: "Hackathon", typeColor: "amber", icon: "🏆",
    status: "open", slots: "2 slots open", slotColor: "green",
    name: "Smart Traffic Controller · HackBIT 2025",
    desc: "Adaptive signal control using real-time vehicle detection. Need backend dev + ML person.",
    tags: ["Python", "OpenCV", "Flask", "IoT"],
    members: [{ i: "RK", c: 0 }, { i: "AJ", c: 2 }], memberCount: "2 members · needs 2",
  },
  {
    type: "Side project", typeColor: "blue", icon: "💻",
    status: "open", slots: "1 slot open", slotColor: "green",
    name: "Campus Lost & Found App",
    desc: "Mobile app to report and claim lost items on campus. Looking for React Native developer.",
    tags: ["React Native", "Firebase", "Node.js"],
    members: [{ i: "SM", c: 1 }, { i: "PD", c: 4 }, { i: "NK", c: 5 }], memberCount: "3 members · needs 1",
  },
  {
    type: "Hackathon", typeColor: "amber", icon: "🏆",
    status: "full", slots: "Team full", slotColor: "red",
    name: "AI Resume Screener · SIH 2025",
    desc: "NLP-based resume parser that scores and ranks applicants against job descriptions.",
    tags: ["Python", "BERT", "FastAPI", "React"],
    members: [{ i: "RK", c: 0 }, { i: "SM", c: 1 }, { i: "AJ", c: 2 }, { i: "PD", c: 4 }], memberCount: "4/4 members",
  },
  {
    type: "Research", typeColor: "teal", icon: "🔬",
    status: "open", slots: "2 slots open", slotColor: "green",
    name: "Federated Learning for IoT Security",
    desc: "Research on privacy-preserving ML for edge devices. Publication target: IEEE.",
    tags: ["Python", "TensorFlow", "Raspberry Pi"],
    members: [{ i: "NK", c: 5 }], memberCount: "1 member · needs 2",
  },
  {
    type: "Side project", typeColor: "blue", icon: "💻",
    status: "open", slots: "1 slot open", slotColor: "green",
    name: "Smart Attendance via Face Recognition",
    desc: "Automated attendance using facial recognition via classroom webcam.",
    tags: ["OpenCV", "Python", "MongoDB"],
    members: [{ i: "AJ", c: 2 }, { i: "RK", c: 0 }], memberCount: "2 members · needs 1",
  },
];

const FILTERS = ["All", "Open slots", "Hackathons", "Side projects", "ML/AI", "Web dev"];

export default function Projects({ onNavigate }) {
  const [filter, setFilter] = useState("All");
  const [joined, setJoined] = useState({});

  return (
    <PageWrap
      title="Projects & Hackathons"
      subtitle="Find teammates, share repos, collaborate on builds"
      action={<Btn>+ Post project</Btn>}
    >
      <div className="mb-4">
        <FilterChips chips={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {PROJECTS.map((p, i) => (
          <div key={i} className="bg-[#f5efdc] border border-black/10 rounded-xl p-3.5 hover:border-white/15 transition-colors flex flex-col">
            {/* Top */}
            <div className="flex items-center justify-between mb-2.5">
              <Pill color={p.typeColor}>{p.icon} {p.type}</Pill>
              <Pill color={p.slotColor}>{p.slots}</Pill>
            </div>

            {/* Name + desc */}
            <div className="font-['Syne',sans-serif] text-sm font-semibold mb-1.5 leading-snug">{p.name}</div>
            <div className="text-xs text-[#5a6a85] leading-relaxed mb-2.5 flex-1">{p.desc}</div>

            {/* Tech tags */}
            <div className="flex gap-1 flex-wrap mb-2.5">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5efdc] border border-black/10 text-[#5a6a85]">{t}</span>
              ))}
            </div>

            {/* Members */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex">
                {p.members.map((m, j) => (
                  <div key={j} className="-mr-1.5">
                    <Avatar initials={m.i} size="sm" colorIndex={m.c} />
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-[#5a6a85] ml-3">{p.memberCount}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-1.5">
              <button className="flex-1 py-1.5 rounded-lg text-[11px] border border-black/10 bg-transparent text-[#5a6a85] hover:bg-black/5 hover:text-[#1a2540] transition-all cursor-pointer">
                🔗 Repo
              </button>
              <button
                onClick={() => onNavigate("messages")}
                className="flex-1 py-1.5 rounded-lg text-[11px] border border-black/10 bg-transparent text-[#5a6a85] hover:bg-black/5 hover:text-[#1a2540] transition-all cursor-pointer"
              >
                💌 Message
              </button>
              {p.status === "full" ? (
                <button disabled className="flex-1 py-1.5 rounded-lg text-[11px] border border-black/10 bg-transparent text-[#5a6a85] opacity-40 cursor-not-allowed">
                  Team full
                </button>
              ) : joined[i] ? (
                <button className="flex-1 py-1.5 rounded-lg text-[11px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 cursor-default">
                  ✓ Requested
                </button>
              ) : (
                <button
                  onClick={() => setJoined((j) => ({ ...j, [i]: true }))}
                  className="flex-1 py-1.5 rounded-lg text-[11px] bg-blue-500 border-0 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  + Join
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Post placeholder */}
        <div className="bg-[#f5efdc] border border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[200px] hover:border-white/25 transition-colors">
          <span className="text-3xl text-[#5a6a85]">+</span>
          <span className="text-sm text-[#5a6a85] font-medium">Post your project</span>
          <span className="text-xs text-[#5a6a85] text-center">Share your repo · find<br />collaborators</span>
        </div>
      </div>
    </PageWrap>
  );
}
