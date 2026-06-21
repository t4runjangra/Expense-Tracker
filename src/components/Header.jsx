import React, { useState } from 'react'
import { Moon, Sun, X } from "lucide-react";
import useTheme from '../context/Theme';
import AddExpenseModal from './Dashboard/AddExpenseModal';

const Header = () => {
    const { themeMode, darkTheme, lightTheme } = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false);
    function handleClick() {
        if (themeMode === "light") {
            darkTheme();
        } else {
            lightTheme();
        }
    }
    const currentMonth = new Date().toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );
    return (
        <>
            <header className="flex items-center justify-between mb-8 py-2 border-b border-gray-400/30">
                <div>
                    <h1 className="px-2 text-lg">
                        Overview

                        <span >
                            {" "}
                            /
                            {" "}

                            {currentMonth}
                        </span>
                    </h1>
                </div>
                <div className='flex gap-2'>

                    <button
                        onClick={handleClick}
                        className=" px-4  rounded-full hover:bg-zinc-800/20 transition text-gray-800/20- "
                    >
                        {themeMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}

                    </button>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-violet-600 px-4 py-2 rounded-xl w-40 text-white mr-4 ">
                        + Add Expense
                    </button>
                </div>
            </header>
            {isModalOpen && (
                <AddExpenseModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    )
}

export default Header
