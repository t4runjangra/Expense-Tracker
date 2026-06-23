import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { supabase } from "../supabase/client";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailValid || !passwordValid) {
      setStatus({
        message: "Please enter a valid email address and password with at least 8 characters.",
        type: "error",
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus({ message: error.message, type: "error" });
    } else {
      setStatus({ message: "Logged in successfully.", type: "success" });
      console.log(data);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <Navbar />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl rounded-4xl border border-slate-200 bg-white/90 p-10 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="mb-8 space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-200">
              <ShieldCheck className="h-4 w-4" />
              Secure sign in
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">Login to your account</h1>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">Access your expense dashboard, track spending, and manage budgets effortlessly.</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="email">
                Email
              </label>
              <div className={`flex items-center gap-3 rounded-3xl border px-4 py-3 shadow-sm transition ${
                email && !emailValid ? "border-rose-400 bg-rose-50/70" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              }`}>
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
              {email && !emailValid ? <p className="text-sm text-rose-500">Enter a valid email address.</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="password">
                Password
              </label>
              <div className={`flex items-center gap-3 rounded-3xl border px-4 py-3 shadow-sm transition ${
                password && !passwordValid ? "border-rose-400 bg-rose-50/70" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              }`}>
                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
              {password && !passwordValid ? <p className="text-sm text-rose-500">Password must be at least 8 characters.</p> : null}
            </div>

            <button className="w-full rounded-3xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-600">
              Login
            </button>
          </form>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Need help?</p>
            <p className="mt-2">Use your account credentials to sign in securely. We keep your expense data private and encrypted.</p>
          </div>

          {status.message ? (
            <div className={`mt-4 rounded-3xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-700" : "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:border-rose-600"}`}>
              {status.message}
            </div>
          ) : null}

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-violet-700 hover:text-violet-600 dark:text-violet-300">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="space-y-6 rounded-4xl bg-linear-to-br from-violet-700 via-purple-800 to-slate-950 p-8 text-white shadow-2xl shadow-violet-500/20 sm:p-10 lg:max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-violet-200/90">Expense intelligence</p>
            <p className="mt-3 text-3xl font-semibold">Secure access with elegant controls</p>
          </div>
          <div className="grid gap-4 rounded-4xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/12">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Protected access</p>
                <p className="text-sm text-slate-200">Encrypted sessions with trusted authorization.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/12">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Reliable sync</p>
                <p className="text-sm text-slate-200">Always available on desktop and mobile.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white/10 p-6 text-slate-100">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-200">Account insight</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Active sessions</p>
                <p className="mt-3 text-2xl font-semibold">1</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Secure backup</p>
                <p className="mt-3 text-2xl font-semibold">Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;