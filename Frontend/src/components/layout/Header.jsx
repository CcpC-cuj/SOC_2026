import logo from "../../assets/cuj-logo.png";

export default function Header({ onNavigate, onLogout }) {
  return (
    <header className="h-14 bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 border-b-2 border-yellow-300 flex items-center px-5 gap-4 shrink-0 z-10 shadow-sm">

      {/* Logo + Brand */}
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        <img src={logo} alt="CUJ" className="w-8 h-8 rounded-full object-cover ring-2 ring-yellow-300 bg-white/90 p-0.5" />
        <div>
          <div className="font-['Syne',sans-serif] text-sm font-bold text-white leading-none">Smart Student Platform</div>
          <div className="text-[10px] text-yellow-200 leading-none mt-0.5">CSE · Central University of Jharkhand</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-5 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700/70 text-sm">🔍</span>
        <input placeholder="Search notes, papers, threads…"
          className="w-full bg-white/95 border border-white/40 rounded-lg py-1.5 pl-8 pr-3 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/40" />
      </div>


      {/* Right */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative w-8 h-8 rounded-lg border border-white/30 text-white hover:bg-white/10 flex items-center justify-center bg-transparent cursor-pointer">
          🔔<div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-yellow-300 border-2 border-blue-600" />
        </button>
        <button className="w-8 h-8 rounded-lg border border-white/30 text-white hover:bg-white/10 flex items-center justify-center bg-transparent cursor-pointer">⚙️</button>
        <button onClick={() => onNavigate("profile")}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center text-xs font-bold text-blue-900 cursor-pointer border-0 ring-2 ring-white/40">
          AK
        </button>
        <button onClick={onLogout}
          className="text-xs text-yellow-200 hover:text-white transition-colors cursor-pointer bg-transparent border-0 ml-1">
          Sign out
        </button>
      </div>

    </header>
  );
}
