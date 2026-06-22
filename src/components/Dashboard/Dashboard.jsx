
import Header from "../Header";
import StatsCard from "./StatsCard";
import { CreditCard, ChartNoAxesCombined, House, TrendingUpDown } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Transaction from "./Transaction";
import SpendingChart from "./SpendingChart";
import { supabase } from "../../supabase/client.js"
import {
    Tv,
    ShoppingBag,
    Car,
    Utensils,
    HeartPulse,
    Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import AddExpenseModal from "./AddExpenseModal";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    async function getExpenses() {
        const { data, error } = await supabase
            .from("expense")
            .select("*")
            .order("created_at", {
                ascending: false
            })
        if (!error) {
            setExpenses(data)
        }
    }


    useEffect(() => {
        getExpenses();
    }, [])

    async function deleteExpense(id) {
        const { error } = await supabase
            .from("expense")
            .delete()
            .eq("id", id)


        if (error) {
            console.log(error);
            return
        }
        getExpenses()
    }



    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentMonth = new Date().toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );

    const currentDate = new Date().toLocaleString(
        "default",
        {
            // dateStyle:"short",
            month: "long",
            year: "2-digit"
        }
    )

    const categories = [
        {
            name: "Food",
            amount: 4500,
            percent: 80,
            icon: Utensils,
            bg: "bg-orange-500/20",
            color: "text-orange-500",
            barColor: "bg-orange-500",
        },

        {
            name: "Shopping",
            amount: 3200,
            percent: 60,
            icon: ShoppingBag,
            bg: "bg-blue-500/20",
            color: "text-blue-500",
            barColor: "bg-blue-500",
        },

        {
            name: "Entertainment",
            amount: 1800,
            percent: 40,
            icon: Tv,
            bg: "bg-purple-500/20",
            color: "text-purple-500",
            barColor: "bg-purple-500",
        },

        {
            name: "Transportation",
            amount: 1200,
            percent: 25,
            icon: Car,
            bg: "bg-yellow-500/20",
            color: "text-yellow-500",
            barColor: "bg-yellow-500",
        },

        {
            name: "Health",
            amount: 900,
            percent: 18,
            icon: HeartPulse,
            bg: "bg-red-500/20",
            color: "text-red-500",
            barColor: "bg-red-500",
        },

        {
            name: "Utilities",
            amount: 700,
            percent: 12,
            icon: Wallet,
            bg: "bg-emerald-500/20",
            color: "text-emerald-500",
            barColor: "bg-emerald-500",
        },
    ];

    return (
        <div className="bg-background ">
            <Header
                onOpenModal={() => setIsModalOpen(true)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Expenses"
                    amount="₹24,560"
                    change="All time"
                    icon={<CreditCard size={14} />}
                />

                <StatsCard
                    title="This Month"
                    amount="₹373.31"
                    trend="7.2%"
                    trendType="up"
                    change="June 2026"
                    icon={<House size={14} />}
                />
                <StatsCard
                    title="Transactions"
                    amount="128"
                    change={`12% ${currentMonth}`}
                    icon={<ChartNoAxesCombined size={14} />}
                />

                <StatsCard
                    title="Saved This Month"
                    amount="₹10,440"
                    trend="4.8%"
                    trendType="down"
                    change="vs ₹605 last month"
                    icon={<TrendingUpDown size={14} />}
                />
            </div>
            <div className="grid grid-cols-7 gap-4 mt-6  border-gray-400/30">
                <div className=" col-span-4 rounded-2xl border p-6 border-gray-400/30 ">
                    <h2 className="mb-4 font-semibold">
                        Spending Trend
                    </h2>
                    <SpendingChart />
                </div>

                <div className=" rounded-2xl border border-gray-400/30 p-6 min-h-64 col-span-3">
                    <h2 className="my-2">Categories</h2>
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div key={category.name} className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`rounded-full flex items-center justify-center ${category.bg}`}
                                        >
                                            <Icon
                                                size={16}
                                                className={category.color}
                                            />
                                        </div>

                                        <span>{category.name}</span>
                                    </div>

                                    <span>₹{category.amount}</span>
                                </div>

                                <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                                    <div
                                        className={`h-2 rounded-full ${category.barColor}`}
                                        style={{ width: `${category.percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-6 rounded-2xl border border-gray-400/30 p-6">
                Recent Transaction
                <div>
                    {expenses.map((expense) => (
                        <Transaction
                            key={expense.id}
                            id={expense.id}
                            title={expense.title}
                            amount={expense.amount}
                            category={expense.category}
                            onDelete={deleteExpense}
                            onEdit={setEditingExpense}
                            expense={expense}
                        />
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <AddExpenseModal
                    onClose={() => setIsModalOpen(false)}
                    getExpenses={getExpenses}
                />
            )}
            {
                editingExpense && (
                    <AddExpenseModal
                        expense={editingExpense}
                        onClose={() => setEditingExpense(null)}
                        getExpenses={getExpenses}
                    />
                )
            }
        </div>
    );
}

export default Dashboard;