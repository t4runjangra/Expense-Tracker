import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Mail, Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { supabase } from "../supabase/client";

const requirementItems = [
  { label: "At least 8 characters", key: "length" },
  { label: "Passwords match", key: "match" },
];

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword && password.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailValid || !passwordLength || !passwordsMatch) {
      setStatus({
        message: "Please complete the form with a valid email and a matching password.",
        type: "error",
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setStatus({ message: error.message, type: "error" });
    } else {
      setStatus({ message: "Account created successfully. Check your email to verify.", type: "success" });
      console.log(data);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <Navbar />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-8 rounded-4xl border border-slate-200 bg-white/90 p-10 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-200">
              <CheckCircle2 className="h-4 w-4" />
              Build better budgets
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">Create your account</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Start tracking expenses, optimizing budgets, and unlocking personalized spending insights.</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="email">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition dark:border-slate-800 dark:bg-slate-950">
                <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="password">
                Password
              </label>
              <div className={`flex items-center gap-3 rounded-3xl border px-4 py-3 shadow-sm transition ${
                password && !passwordLength ? "border-rose-400 bg-rose-50/70" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              }`}>
                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className={`flex items-center gap-3 rounded-3xl border px-4 py-3 shadow-sm transition ${
                confirmPassword && !passwordsMatch ? "border-rose-400 bg-rose-50/70" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              }`}>
                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Password requirements</p>
              <ul className="mt-3 space-y-2">
                {requirementItems.map((item) => {
                  const valid = item.key === "length" ? passwordLength : passwordsMatch;
                  return (
                    <li key={item.key} className="flex items-center gap-3 text-sm">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full ${valid ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className={valid ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}>{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button className="w-full rounded-3xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-600">
              Create Account
            </button>
          </form>

          {status.message ? (
            <div className={`mt-4 rounded-3xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-700" : "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:border-rose-600"}`}>
              {status.message}
            </div>
          ) : null}

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-600 dark:text-violet-300">
              Login
            </Link>
          </p>
        </div>

        <div className="rounded-4xl bg-linear-to-br from-violet-700 via-purple-800 to-slate-950 p-8 text-white shadow-2xl shadow-violet-500/20 sm:p-10 lg:max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-violet-200/90">Fast setup</p>
            <p className="mt-3 text-3xl font-semibold">Start tracking in seconds</p>
          </div>
          <div className="mt-6 space-y-5 rounded-[1.75rem] bg-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Secure email login</p>
                <p className="text-sm text-slate-200">Trusted authentication for every device.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/15">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Strong encryption</p>
                <p className="text-sm text-slate-200">Your expense history stays protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;