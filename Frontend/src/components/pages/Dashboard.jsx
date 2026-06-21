import { Card, StatCard, Pill, Btn, SectionTitle, PageWrap } from "../ui";
import logo from "../../assets/cuj-logo.png";

const ACTIVITY = [
  { icon:"⬆️", bg:"bg-blue-500/12", text:<>You uploaded <strong>OS Unit 4 Notes.pdf</strong></>, time:"2 hours ago" },
  { icon:"✅", bg:"bg-emerald-500/10", text:<>Rahul answered your doubt on <strong>Knapsack DP</strong></>, time:"4 hours ago" },
  { icon:"🏆", bg:"bg-amber-500/10", text:<>Sneha invited you to join <strong>HackBIT 2025 team</strong></>, time:"Yesterday" },
  { icon:"💌", bg:"bg-pink-500/10", text:<>New message from <strong>Priya Das</strong></>, time:"Yesterday" },
];
const TRENDING = [
  { rank:"01", title:"Difference between process and thread?", tag:"OS", tagColor:"blue", votes:47 },
  { rank:"02", title:"Best resources for DBMS normalization?", tag:"DBMS", tagColor:"purple", votes:31 },
  { rank:"03", title:"SIH 2025 open — forming teams, need ML dev", tag:"Hackathon", tagColor:"amber", votes:28 },
];

export default function Dashboard({ onNavigate }) {
  return (
    <PageWrap>
      {/* Welcome banner */}
      <div className="relative bg-[#ece4c8] border border-white/[0.07] rounded-2xl px-6 py-5 mb-5 flex items-center gap-5 overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-blue-500/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-32 h-32 rounded-full bg-yellow-500/3 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <img src={logo} alt="CUJ" className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500/30 shrink-0" />
        <div>
          <div className="text-[10px] text-yellow-400/70 font-medium uppercase tracking-wider mb-0.5">Central University of Jharkhand · CSE</div>
          <h2 className="font-['Syne',sans-serif] text-lg font-bold">Good morning, Aryan 👋</h2>
          <p className="text-sm text-[#5a6a85] mt-0.5">Semester 5 · 3 new resources uploaded today</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Btn size="sm" onClick={() => onNavigate("resources")}>⬆️ Upload note</Btn>
          <Btn variant="ghost" size="sm" onClick={() => onNavigate("doubts")}>Ask AI doubt</Btn>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <StatCard value="142" label="Resources uploaded" delta="↑ 12 this week" />
        <StatCard value="38" label="Doubts solved" delta="↑ 5 today" />
        <StatCard value="7" label="Active projects" delta="2 open slots" deltaColor="text-blue-400" />
        <StatCard value="94" label="Contribution pts" delta="★ Top 10%" deltaColor="text-amber-400" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <SectionTitle>Recent activity</SectionTitle>
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-white/[0.07] last:border-0">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 ${a.bg}`}>{a.icon}</div>
              <div>
                <div className="text-sm leading-snug">{a.text}</div>
                <div className="text-[11px] text-[#5a6a85] mt-0.5">{a.time}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle>Trending in community</SectionTitle>
          {TRENDING.map(t => (
            <div key={t.rank} className="flex items-center gap-2.5 py-2.5 border-b border-white/[0.07] last:border-0">
              <span className="font-['Syne',sans-serif] text-lg font-extrabold text-white/15 w-6">{t.rank}</span>
              <div className="flex-1">
                <div className="text-sm font-medium leading-snug">{t.title}</div>
                <div className="mt-1"><Pill color={t.tagColor}>{t.tag}</Pill></div>
              </div>
              <span className="text-xs text-emerald-400">↑ {t.votes}</span>
            </div>
          ))}
        </Card>
      </div>
    </PageWrap>
  );
}