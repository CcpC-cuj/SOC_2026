import { useState } from "react";
import { Btn, PageWrap, Avatar } from "../ui";

const CONVOS = [
  { id: 1, initials: "RK", colorIndex: 0, name: "Rahul Kumar", preview: "Shared repo link for CV proj…", unread: 2 },
  { id: 2, initials: "SM", colorIndex: 1, name: "Sneha Mishra", preview: "Can you explain dp/knapsack?" },
  { id: 3, initials: "AJ", colorIndex: 2, name: "Arjun Jha", preview: "Hackathon team confirmed!" },
  { id: 4, initials: "PD", colorIndex: 4, name: "Priya Das", preview: "Notes for OS uploaded" },
];

const MESSAGES = [
  { from: "them", text: "Hey! I saw you're working on a CV project too. Want to collaborate?", time: "10:32 AM" },
  { from: "me", text: "Yes! I'm building the frontend. What part are you handling?", time: "10:34 AM" },
  { from: "them", text: "Model training + Flask API. Here's my current repo:", time: "10:35 AM", repo: { name: "cv-detection-model", meta: "Python · 47 commits · MIT License" } },
  { from: "me", text: "Nice! Let me check it out. I'll share mine too once I push the latest changes.", time: "10:36 AM" },
];

export default function Messages({ onNavigate }) {
  const [activeConvo, setActiveConvo] = useState(CONVOS[0]);

  return (
    <PageWrap title="Messages" subtitle="Direct conversations — share repos, discuss projects">
      <div className="flex bg-[#f5efdc] border border-black/10 rounded-xl overflow-hidden" style={{ minHeight: 500 }}>

        {/* Left: Conversation list */}
        <div className="w-64 border-r border-black/10 flex flex-col shrink-0">
          <div className="p-2.5 border-b border-black/10">
            <input
              placeholder="🔍 Search conversations…"
              className="w-full bg-[#ece4c8] border border-black/10 rounded-lg px-2.5 py-1.5 text-xs text-[#1a2540] placeholder-[#5a6a85] outline-none"
            />
          </div>
          {CONVOS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConvo(c)}
              className={`w-full flex items-center gap-2.5 p-2.5 border-b border-black/10 transition-colors cursor-pointer text-left
                ${activeConvo.id === c.id ? "bg-[#ece4c8]" : "bg-transparent hover:bg-white/3"}`}
            >
              <Avatar initials={c.initials} colorIndex={c.colorIndex} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#1a2540]">{c.name}</div>
                <div className="text-[11px] text-[#5a6a85] truncate mt-0.5">{c.preview}</div>
              </div>
              {c.unread && (
                <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Chat window */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b border-black/10 flex items-center gap-2.5">
            <Avatar initials={activeConvo.initials} size="sm" colorIndex={activeConvo.colorIndex} />
            <div>
              <div className="text-sm font-medium">{activeConvo.name}</div>
              <div className="text-[11px] text-[#5a6a85]">
                <span className="text-emerald-400 text-[10px]">●</span> Online · Sem 5 · Full Stack
              </div>
            </div>
            <div className="ml-auto flex gap-1.5">
              <Btn variant="ghost" size="sm" onClick={() => onNavigate("profile")}>👤 Profile</Btn>
              <Btn variant="ghost" size="sm">📎 Files</Btn>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 flex flex-col gap-2.5 overflow-y-auto">
            {MESSAGES.map((m, i) => (
              <div key={i} className={`flex gap-2 items-end ${m.from === "me" ? "flex-row-reverse" : ""}`}>
                {m.from === "them" && <Avatar initials={activeConvo.initials} size="sm" colorIndex={activeConvo.colorIndex} />}
                <div>
                  <div className={`px-3 py-2 rounded-xl text-sm leading-relaxed max-w-xs
                    ${m.from === "me"
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-[#ece4c8] text-[#1a2540] rounded-bl-sm"
                    }`}>
                    {m.text}
                  </div>
                  {m.repo && (
                    <div className="bg-[#f5efdc] border border-black/10 rounded-xl p-2 mt-1.5 max-w-[180px]">
                      <div className="text-xs font-medium text-[#1a2540] flex items-center gap-1.5">🔗 {m.repo.name}</div>
                      <div className="text-[10px] text-[#5a6a85] mt-0.5">{m.repo.meta}</div>
                    </div>
                  )}
                  <div className={`text-[10px] text-[#5a6a85] mt-1 ${m.from === "me" ? "text-right" : ""}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="p-2.5 border-t border-black/10 flex gap-2 items-center">
            <Btn variant="ghost" size="sm" className="px-2">📎</Btn>
            <input
              placeholder="Type a message or paste a GitHub URL…"
              className="flex-1 bg-[#ece4c8] border border-black/10 rounded-full px-3 py-2 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none"
            />
            <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-base hover:bg-blue-600 transition-colors cursor-pointer border-0">
              ➤
            </button>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}