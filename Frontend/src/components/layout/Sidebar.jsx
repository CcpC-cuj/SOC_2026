import logo from "../../assets/cuj-logo.png";

const NAV = [
  { section: "Main", items: [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "resources", label: "Resources", icon: "📄" },
    { id: "papers", label: "Papers & PYQ", icon: "📋" },
    { id: "community", label: "Community", icon: "💬" },
  ]},
  { section: "Collaborate", items: [
    { id: "messages", label: "Messages", icon: "💌", badge: "3", badgeClass: "bg-blue-500 text-white" },
    { id: "projects", label: "Projects", icon: "🏆", badge: "New", badgeClass: "bg-green-500 text-black" },
    { id: "doubts", label: "AI Doubts", icon: "🧠" },
  ]},
  { section: "Account", items: [
    { id: "profile", label: "My Profile", icon: "👤" },
  ]},
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-[230px] bg-gradient-to-b from-green-50 via-green-100/60 to-yellow-50 border-r-2 border-yellow-200 flex flex-col gap-0.5 px-2.5 py-4 overflow-y-auto shrink-0">

      {/* College mini-card */}
      <div className="mx-1 mb-3 p-2.5 bg-white/70 backdrop-blur border-2 border-yellow-300 rounded-xl flex items-center gap-2 shadow-sm">
        <img src={logo} alt="CUJ" className="w-9 h-9 rounded-full object-cover ring-2 ring-green-500/40 shrink-0" />
        <div className="min-w-0">
          <div className="text-[10px] font-bold text-blue-700 leading-tight truncate">Central University of Jharkhand</div>
          <div className="text-[9px] text-green-700 leading-tight mt-0.5 font-medium">Dept. of CSE</div>
        </div>
      </div>

      {NAV.map(({ section, items }) => (
        <div key={section}>
          <p className="text-[10px] font-bold text-green-700/80 uppercase tracking-widest px-2.5 pt-3 pb-1.5">{section}</p>
          {items.map(({ id, label, icon, badge, badgeClass }) => (
            <button key={id} onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all cursor-pointer border-0
                ${activePage === id
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-500/30"
                  : "text-blue-900/80 hover:bg-yellow-100 hover:text-blue-900"}`}>
              <span className="w-5 text-center">{icon}</span>
              <span className="flex-1 text-left font-medium">{label}</span>
              {badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${badgeClass}`}>{badge}</span>}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-auto pt-3 border-t-2 border-yellow-200">
        <button onClick={() => onNavigate("admin")}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all cursor-pointer border-0
            ${activePage === "admin"
              ? "bg-blue-500 text-white shadow-sm shadow-blue-500/30"
              : "text-blue-900/80 hover:bg-yellow-100 hover:text-blue-900"}`}>
          <span className="w-5 text-center">🛡️</span>
          <span className="flex-1 text-left font-medium">Admin</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-yellow-300 text-blue-900 font-bold">Staff</span>
        </button>
      </div>
    </aside>

  );
}
