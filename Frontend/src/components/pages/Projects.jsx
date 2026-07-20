import { useState } from "react";
import { Pill, Btn, FilterChips, PageWrap, Avatar } from "../ui";
import { PROJECTS } from "../../data/content";

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