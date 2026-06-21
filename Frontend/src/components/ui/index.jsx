// ── Pill / Badge ──────────────────────────────────────────
const PILL_STYLES = {
  blue:   "bg-blue-500/15 text-blue-300",
  green:  "bg-emerald-500/12 text-emerald-400",
  amber:  "bg-amber-500/12 text-amber-400",
  purple: "bg-violet-500/15 text-violet-300",
  red:    "bg-red-500/12 text-red-400",
  teal:   "bg-teal-500/12 text-teal-400",
  pink:   "bg-pink-500/12 text-pink-400",
  gray:   "bg-white/6 text-[#5a6a85]",
};

export function Pill({ color = "gray", children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${PILL_STYLES[color]} ${className}`}>
      {children}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#f5efdc] border border-black/10 rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardSm({ children, className = "" }) {
  return (
    <div className={`bg-[#f5efdc] border border-black/10 rounded-xl p-3 ${className}`}>
      {children}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────
export function StatCard({ value, label, delta, deltaColor = "text-emerald-400" }) {
  return (
    <div className="bg-[#ece4c8] rounded-xl p-3.5">
      <div className="text-2xl font-bold font-['Syne',sans-serif] text-[#1a2540]">{value}</div>
      <div className="text-xs text-[#5a6a85] mt-0.5">{label}</div>
      {delta && <div className={`text-[11px] mt-1 ${deltaColor}`}>{delta}</div>}
    </div>
  );
}

// ── Button ────────────────────────────────────────────────
export function Btn({ children, variant = "primary", size = "md", onClick, className = "", disabled = false }) {
  const base = "inline-flex items-center gap-1.5 font-medium rounded-lg cursor-pointer transition-all duration-150 border-0 font-['DM_Sans',sans-serif]";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    ghost:   "bg-transparent border border-white/15 text-[#1a2540] hover:bg-black/5",
    purple:  "bg-violet-500/80 text-white hover:bg-violet-600",
  };
  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-3.5 py-1.5",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

// ── Section Title ─────────────────────────────────────────
export function SectionTitle({ children }) {
  return (
    <h3 className="font-['Syne',sans-serif] text-sm font-semibold text-[#1a2540] mb-3">{children}</h3>
  );
}

// ── Divider ───────────────────────────────────────────────
export function Divider() {
  return <div className="h-px bg-black/5 my-4" />;
}

// ── FilterChips ───────────────────────────────────────────
export function FilterChips({ chips, active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onChange(chip)}
          className={`px-3 py-1 rounded-full text-xs border transition-all duration-150 cursor-pointer
            ${active === chip
              ? "bg-blue-500/12 border-blue-500/30 text-blue-400"
              : "border-black/10 text-[#5a6a85] hover:bg-black/5 bg-transparent"
            }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

// ── TabBar ────────────────────────────────────────────────
export function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-0.5 bg-[#ece4c8] rounded-xl p-1 w-fit mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer
            ${active === tab
              ? "bg-[#f5efdc] text-[#1a2540] border border-black/10"
              : "text-[#5a6a85] bg-transparent border-0 hover:text-[#1a2540]"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────
const AV_COLORS = [
  "bg-blue-500/20 text-blue-300",
  "bg-emerald-500/15 text-emerald-400",
  "bg-amber-500/12 text-amber-400",
  "bg-pink-500/12 text-pink-400",
  "bg-violet-500/15 text-violet-300",
  "bg-teal-500/12 text-teal-400",
];

export function Avatar({ initials, size = "md", colorIndex = 0 }) {
  const sizes = { sm: "w-6 h-6 text-[9px]", md: "w-8 h-8 text-xs", lg: "w-16 h-16 text-xl" };
  return (
    <div className={`rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${sizes[size]} ${AV_COLORS[colorIndex % AV_COLORS.length]}`}>
      {initials}
    </div>
  );
}

// ── Page wrapper ──────────────────────────────────────────
export function PageWrap({ title, subtitle, action, children }) {
  return (
    <div className="p-6 animate-[fadeIn_0.2s_ease]">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Syne',sans-serif] text-[22px] font-bold text-[#1a2540]">{title}</h1>
            {subtitle && <p className="text-sm text-[#5a6a85] mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────
export function Input({ placeholder, className = "", value, onChange }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-[#ece4c8] border border-black/10 rounded-lg px-3 py-2 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-white/20 transition-colors font-['DM_Sans',sans-serif] ${className}`}
    />
  );
}

// ── Select ────────────────────────────────────────────────
export function Select({ options, className = "" }) {
  return (
    <select className={`bg-[#ece4c8] border border-black/10 rounded-lg px-2.5 py-1.5 text-xs text-[#1a2540] outline-none font-['DM_Sans',sans-serif] cursor-pointer ${className}`}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
