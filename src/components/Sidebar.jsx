import ".././index.css"
import { CreditCard, SquareChartGanttIcon, ChartNoAxesColumnIcon, Settings, Banknote, Moon, Sun } from 'lucide-react'
import useTheme from '../context/Theme';
import { useState } from "react"

function Sidebar() {
    const { themeMode, lightTheme, darkTheme } = useTheme();
    const [activeTab, setActiveTab] = useState("Overview");
    const menuItems = [
        { name: "Overview", icon: SquareChartGanttIcon },
        { name: "Expense", icon: Banknote },
        { name: "Analytics", icon: ChartNoAxesColumnIcon },
        { name: "Settings", icon: Settings },
    ];
    function handleClick() {
        if (themeMode === "light") {
            darkTheme();
        } else {
            lightTheme();
        }
    }
    return (
        <>
            <div className="bg-background border-r border-border border-gray-400/30 h-screen w-64 flex flex-col">
                <div className='flex items-center  border-gray-400/30 border-b py-5 px-3 gap-2  '>
                    <p className=" text-white bg-[#6057E8] w-7 h-7 flex items-center justify-center rounded-full ">

                        < CreditCard size={16} />
                    </p>
                    <h1 className="text-lg ">Expense Tracker</h1>
                </div>

                <div className='flex-1 '>
                    <ul>
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name)}
                                    className={`mt-1 flex items-center gap-2 px-4 py-2 mx-2 mb-0.5 rounded-xl cursor-pointer transition
                                        ${activeTab === item.name
                                            ? "bg-violet-600 text-white hover:bg-gray-600"
                                            : "hover:bg-zinc-800/20"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className=" p-4 border-t border-gray-400/30">
                    <button
                        onClick={handleClick}
                        className="text-sm w-full flex items-center gap-2 px-1 py-2 rounded-xl hover:bg-zinc-800/20 transition text-gray-800/20- "
                    >
                        {themeMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
                    </button>

                    <div className="flex items-center gap-3 rounded-xl">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 font-semibold text-white text-sm">
                            T
                        </div>

                        <div>
                            <p className="font-bold">Tarun</p>
                            <p className="text-xs text-zinc-400">
                                tarun@example.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
