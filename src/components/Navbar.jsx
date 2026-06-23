import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import useTheme from '../context/Theme';
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
    const { themeMode, darkTheme, lightTheme } = useTheme()

    function handleClick() {
        if (themeMode === "light") {
            darkTheme();
        } else {
            lightTheme();
        }
    }
    return (
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
            <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-slate-900/5 backdrop-blur dark:bg-slate-950/80 dark:text-slate-100"
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-700 text-white">
                    <DollarSign className="h-5 w-5" />
                </span>
                <span>ExpenseFlow</span>
            </Link>

            <div className="hidden items-center gap-4 sm:flex">


                <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}
