import { ArrowRight, BarChart3, ShieldCheck, Sparkles, CloudCog, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const featureList = [
  {
    title: 'Track Expenses',
    description: 'Log every purchase with a clear timeline and expense breakdown.',
    icon: BarChart3,
  },
  {
    title: 'Spending Analytics',
    description: 'Spot trends with polished charts and weekly performance insights.',
    icon: Clock3,
  },
  {
    title: 'Category Insights',
    description: 'Understand where your money goes with smart category reporting.',
    icon: Sparkles,
  },
  {
    title: 'Secure Cloud Storage',
    description: 'Your data is encrypted and available across devices anytime.',
    icon: CloudCog,
  },
];

export default function Hero() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-10 lg:px-10">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm shadow-violet-200/80 dark:bg-violet-900/30 dark:text-violet-200">
              <Sparkles className="h-4 w-4" />
              Premium expense intelligence
            </div>
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
                Take Control of Your Finances
              </h1>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Track every expense, visualize spending trends, and maintain financial clarity with an elegant dashboard built for modern teams and individuals.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-violet-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-600"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Login
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featureList.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-violet-200 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-violet-500/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-50">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative isolated overflow-hidden rounded-4xl bg-linear-to-br from-violet-800 via-slate-900 to-slate-950 px-6 py-8 shadow-2xl shadow-slate-900/30 sm:px-8 sm:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.25),transparent_45%)]" />
            <div className="relative space-y-8">
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white shadow-lg shadow-slate-950/10">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-violet-200/85">Expense Dashboard</p>
                  <p className="mt-2 text-2xl font-semibold">Weekly summary</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-100">Live</div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 text-white shadow-2xl shadow-violet-950/30">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Spending</span>
                  <span className="font-semibold text-white">$3,240</span>
                </div>
                <div className="mt-5 h-48 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(192,132,252,0.32),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]">
                  <div className="h-full w-full bg-[linear-gradient(90deg,transparent_20%,rgba(129,140,248,0.18),transparent_40%)]" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="font-semibold text-white">Savings</p>
                    <p className="mt-2 text-lg">$1,028</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="font-semibold text-white">Budgets</p>
                    <p className="mt-2 text-lg">8</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <p>Subscriptions</p>
                    <p className="text-violet-300">+8.4%</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold">$420</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <p>Travel</p>
                    <p className="text-violet-300">-2.1%</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold">$132</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
