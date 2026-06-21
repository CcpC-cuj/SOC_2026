import { useState } from "react";
import logo from "../../assets/cuj-logo.png";

export default function Login({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ rollno: "", password: "", confirmPassword: "", name: "", sem: "5", email: "", passkey: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (tab === "login") {
      if (!form.rollno || !form.password) { setError("Please enter your roll number and password."); return; }
    }

    if (tab === "register") {
      if (!form.name || !form.rollno || !form.password) { setError("Name, roll number and password are required."); return; }
      if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
      if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    }

    if (tab === "admin") {
      if (!form.rollno || !form.password) { setError("Please fill all required fields."); return; }
      if (!form.passkey) { setError("Security passkey is required for admin login."); return; }
      if (form.passkey !== "CUJ@CSE2025") { setError("Invalid security passkey. Please contact HOD or IT Cell."); return; }
    }

    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(tab === "admin" ? "admin" : "student"); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fbf7ec] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-500/4 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">

        {/* University header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-500/40 p-1 bg-[#f5efdc] shadow-xl shadow-black/10">
              <img src={logo} alt="CUJ Logo" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <h1 className="font-['Syne',sans-serif] text-xl font-bold text-[#1a2540] leading-tight">
            Central University of Jharkhand
          </h1>
          <p className="text-sm text-yellow-400/80 font-medium mt-1">
            Department of Computer Science & Engineering
          </p>
          <p className="text-xs text-[#5a6a85] mt-1">Knowledge To Wisdom</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent mx-auto mt-3" />
          <p className="text-[11px] text-[#5a6a85] mt-2 tracking-widest uppercase">Smart Student Platform</p>
        </div>

        {/* Form card */}
        <div className="bg-[#f5efdc] border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/60">

          {/* Tabs */}
          <div className="flex gap-0.5 bg-[#ece4c8] rounded-xl p-1 mb-6">
            {["login","register","admin"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer border-0
                  ${tab === t ? "bg-[#fbf7ec] text-[#1a2540] shadow shadow-black/10" : "bg-transparent text-[#5a6a85] hover:text-[#1a2540]"}`}>
                {t === "login" ? "Sign In" : t === "register" ? "Register" : "Admin"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="flex flex-col gap-3.5">

            {tab === "register" && (
              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">Full name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="Aryan Kumar"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            )}

            {/* Roll number — shown on login + register */}
            {(tab === "login" || tab === "register") && (
              <div className="grid grid-cols-2 gap-3">
                <div className={tab === "login" ? "col-span-2" : ""}>
                  <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">Roll number</label>
                  <input name="rollno" value={form.rollno} onChange={handle} placeholder="23CUCSE001"
                    className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
                </div>
                {tab === "register" && (
                  <div>
                    <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">Semester</label>
                    <select name="sem" value={form.sem} onChange={handle}
                      className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] outline-none focus:border-blue-500/50 transition-colors cursor-pointer">
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </div>
            )}

            {tab === "admin" && (
              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">Admin ID</label>
                <input name="rollno" value={form.rollno} onChange={handle} placeholder="ADMIN001"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            )}

            <div>
              <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                {tab === "register" ? "Create password" : "Password"}
              </label>
              <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••"
                className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
              {tab === "register" && <p className="text-[10px] text-[#5a6a85] mt-1">Minimum 6 characters. You choose this — no email required.</p>}
            </div>

            {tab === "register" && (
              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">Confirm password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handle} placeholder="••••••••"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            )}

            {/* Optional email — register only, clearly marked optional */}
            {tab === "register" && (
              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                  University email <span className="text-[#5a6a85]/70 font-normal">(optional — add later if not issued yet)</span>
                </label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="aryan@cuj.ac.in (optional)"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
                <p className="text-[10px] text-[#5a6a85] mt-1">New students can skip this — you can add it from your profile once it's issued.</p>
              </div>
            )}

            {tab === "admin" && (
              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                  Security passkey <span className="text-red-400">*</span>
                </label>
                <input name="passkey" type="password" value={form.passkey} onChange={handle} placeholder="Enter admin security passkey"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors" />
                <div className="mt-1.5 bg-yellow-50 border border-yellow-300 rounded-lg px-3 py-2 text-[11px] text-yellow-800">
                  ⚠️ Default passkey: <strong>CUJ@CSE2025</strong> — contact HOD or IT Cell to change it.
                </div>
              </div>
            )}

            {tab === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer bg-transparent border-0">
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer transition-all mt-1
                ${loading ? "bg-blue-500/50 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"}`}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  {tab === "login" ? "Signing in…" : tab === "register" ? "Creating account…" : "Verifying…"}
                </span>
              ) : tab === "login" ? "Sign in to platform" : tab === "register" ? "Create account" : "Admin sign in"}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-[#5a6a85] mt-5 leading-relaxed">
          {tab === "admin"
            ? <>Admin access is restricted. Unauthorized login attempts are logged.</>
            : <>New here? Register with your Roll Number — no university email needed to get started.</>}
        </p>
      </div>
    </div>
  );
}