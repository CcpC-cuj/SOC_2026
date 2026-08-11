import { useState } from "react";
import logo from "../../assets/cuj-logo.png";
import {
  loginUser,
  sendRegistrationOtp,
  verifyRegistrationOtp,
} from "../../api/auth";

const GMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
const CUJ_EMAIL_DOMAIN = "cuj.ac.in";

function buildExpectedUniEmailPattern(name, regno) {
  const firstName = name.trim().split(/\s+/)[0]?.toLowerCase() || "";
  const reg = regno.trim().toLowerCase();

  if (!firstName || !reg) return null;

  return new RegExp(
    `^${firstName}\\.${reg}@${CUJ_EMAIL_DOMAIN}$`,
    "i"
  );
}

function expectedUniEmailPlaceholder(name, regno) {
  const firstName = name.trim().split(/\s+/)[0]?.toLowerCase();
  const reg = regno.trim().toLowerCase();

  return firstName && reg
    ? `${firstName}.${reg}@${CUJ_EMAIL_DOMAIN}`
    : `firstname.regno@${CUJ_EMAIL_DOMAIN}`;
}

export default function Login({ onLogin }) {
  const [tab, setTab] = useState("login");

  const [step, setStep] = useState("form");

  const [form, setForm] = useState({
    regno: "",
    password: "",
    confirmPassword: "",
    name: "",
    sem: "1",
    email: "",
    uniEmail: "",
  });

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setStep("form");
    setOtp("");
    setError("");
  };

  const validateRegistration = () => {
    if (
      !form.name ||
      !form.regno ||
      !form.password
    ) {
      setError(
        "Name, registration number and password are required."
      );
      return false;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return false;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError("Passwords do not match.");
      return false;
    }

    if (!form.email) {
      setError("Email is required.");
      return false;
    }

    if (!GMAIL_PATTERN.test(form.email.trim())) {
      setError(
        "Email must be a valid @gmail.com address."
      );
      return false;
    }

    if (form.uniEmail) {
      const pattern =
        buildExpectedUniEmailPattern(
          form.name,
          form.regno
        );

      if (
        !pattern ||
        !pattern.test(form.uniEmail.trim())
      ) {
        setError(
          `University email must match the format ${expectedUniEmailPlaceholder(
            form.name,
            form.regno
          )}`
        );
        return false;
      }
    }

    return true;
  };

  const sendOtp = async () => {
    setError("");

    if (!validateRegistration()) {
      return;
    }

    setLoading(true);

    try {
      await sendRegistrationOtp({
        name: form.name,
        email: form.email,
        password: form.password,
        rollNumber: form.regno,
        semester: Number(form.sem),
        collegeEmail: form.uniEmail || "",
      });

      setStep("otp");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response =
        await verifyRegistrationOtp({
          email: form.email,
          otp,
        });

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.data.user
        )
      );

      onLogin();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    if (tab === "login") {
      if (!form.regno || !form.password) {
        setError(
          "Please enter your registration number and password."
        );
        return;
      }

      setLoading(true);

      try {
        const response = await loginUser({
          rollNumber: form.regno,
          password: form.password,
        });

        localStorage.setItem(
          "token",
          response.data.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.data.user
          )
        );

        onLogin();
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Something went wrong."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    if (step === "form") {
      await sendOtp();
    } else {
      await verifyOtp();
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7ec] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-500/4 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-500/40 p-1 bg-[#f5efdc] shadow-xl shadow-black/10">
              <img
                src={logo}
                alt="CUJ Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <h1 className="font-['Syne',sans-serif] text-xl font-bold text-[#1a2540] leading-tight">
            Central University of Jharkhand
          </h1>

          <p className="text-sm text-yellow-400/80 font-medium mt-1">
            Department of Computer Science & Engineering
          </p>

          <p className="text-xs text-[#5a6a85] mt-1">
            Knowledge To Wisdom
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent mx-auto mt-3" />

          <p className="text-[11px] text-[#5a6a85] mt-2 tracking-widest uppercase">
            Smart Student Platform
          </p>
        </div>

        <div className="bg-[#f5efdc] border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/60">

          <div className="flex gap-0.5 bg-[#ece4c8] rounded-xl p-1 mb-6">
            {["login", "register"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  handleTabChange(t)
                }
                className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer border-0
                  ${
                    tab === t
                      ? "bg-[#fbf7ec] text-[#1a2540] shadow shadow-black/10"
                      : "bg-transparent text-[#5a6a85] hover:text-[#1a2540]"
                  }`}
              >
                {t === "login"
                  ? "Sign In"
                  : "Register"}
              </button>
            ))}
          </div>

          {tab === "register" &&
            step === "otp" ? (
            <form
              onSubmit={submit}
              className="flex flex-col gap-4"
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-[#1a2540]">
                  Verify your email
                </h2>

                <p className="text-xs text-[#5a6a85] mt-2">
                  We sent a 6-digit OTP to
                </p>

                <p className="text-sm font-medium text-blue-500 mt-1">
                  {form.email}
                </p>
              </div>

              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                  Enter OTP
                </label>

                <input
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-3 text-center text-lg tracking-[0.5em] text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer transition-all
                  ${
                    loading
                      ? "bg-blue-500/50 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
                  }`}
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setOtp("");
                  setError("");
                }}
                className="text-xs text-blue-500 hover:text-blue-600 bg-transparent border-0 cursor-pointer"
              >
                ← Change registration details
              </button>
            </form>
          ) : (
            <form
              onSubmit={submit}
              className="flex flex-col gap-3.5"
            >

              {tab === "register" && (
                <div>
                  <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                    Full name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder="Aryan Kumar"
                    className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">

                <div
                  className={
                    tab === "login"
                      ? "col-span-2"
                      : ""
                  }
                >
                  <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                    Registration number
                  </label>

                  <input
                    name="regno"
                    value={form.regno}
                    onChange={handle}
                    placeholder="CUJ22CS0001"
                    className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                {tab === "register" && (
                  <div>
                    <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                      Semester
                    </label>

                    <select
                      name="sem"
                      value={form.sem}
                      onChange={handle}
                      className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                        (s) => (
                          <option key={s}>
                            {s}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                  {tab === "register"
                    ? "Create password"
                    : "Password"}
                </label>

                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handle}
                  placeholder="••••••••"
                  className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                />

                {tab === "register" && (
                  <p className="text-[10px] text-[#5a6a85] mt-1">
                    Minimum 6 characters.
                  </p>
                )}
              </div>

              {tab === "register" && (
                <div>
                  <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                    Confirm password
                  </label>

                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handle}
                    placeholder="••••••••"
                    className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              )}

              {tab === "register" && (
                <div>
                  <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                    Email{" "}
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="yourname@gmail.com"
                    required
                    className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                  />

                  <p className="text-[10px] text-[#5a6a85] mt-1">
                    OTP will be sent to this email.
                  </p>
                </div>
              )}

              {tab === "register" && (
                <div>
                  <label className="text-[11px] text-[#5a6a85] mb-1.5 block font-medium">
                    University email{" "}
                    <span className="text-[#5a6a85]/70 font-normal">
                      (optional)
                    </span>
                  </label>

                  <input
                    name="uniEmail"
                    type="email"
                    value={form.uniEmail}
                    onChange={handle}
                    placeholder={expectedUniEmailPlaceholder(
                      form.name,
                      form.regno
                    )}
                    className="w-full bg-[#ece4c8] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-sm text-[#1a2540] placeholder-[#5a6a85] outline-none focus:border-blue-500/50 transition-colors"
                  />

                  <p className="text-[10px] text-[#5a6a85] mt-1">
                    Format: firstname.regno@cuj.ac.in
                  </p>
                </div>
              )}

              {tab === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer bg-transparent border-0"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer transition-all mt-1
                  ${
                    loading
                      ? "bg-blue-500/50 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    {tab === "login"
                      ? "Signing in…"
                      : "Sending OTP…"}
                  </span>
                ) : tab === "login" ? (
                  "Sign in to platform"
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[11px] text-[#5a6a85] mt-5 leading-relaxed">
          New here? Register with your Registration Number
          and Gmail address to get started.
        </p>
      </div>
    </div>
  );
}