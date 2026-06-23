
import Header from "../Header";
import StatsCard from "./StatsCard";
import { CreditCard, ChartBar, House, TrendingUpDown } from "lucide-react";
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

    const chartData = expenses
        .reduce((acc, expense) => {
            const date = new Date(expense.created_at);

            const month = date.toLocaleString("default", {
                month: "short",
            });

            const monthNumber = date.getMonth();

            const existing = acc.find(
                (item) => item.month === month
            );

            if (existing) {
                existing.amount += Number(expense.amount);
            } else {
                acc.push({
                    month,
                    monthNumber,
                    amount: Number(expense.amount),
                });
            }

            return acc;
        }, [])
        .sort((a, b) => a.monthNumber - b.monthNumber);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentMonth = new Date().toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );

    const categoryConfig = {
        Food: {
            icon: Utensils,
            bg: "bg-orange-500/20",
            color: "text-orange-500",
            barColor: "bg-orange-500",
        },

        Shopping: {
            icon: ShoppingBag,
            bg: "bg-blue-500/20",
            color: "text-blue-500",
            barColor: "bg-blue-500",
        },

        Entertainment: {
            icon: Tv,
            bg: "bg-purple-500/20",
            color: "text-purple-500",
            barColor: "bg-purple-500",
        },

        Transportation: {
            icon: Car,
            bg: "bg-yellow-500/20",
            color: "text-yellow-500",
            barColor: "bg-yellow-500",
        },

        Health: {
            icon: HeartPulse,
            bg: "bg-red-500/20",
            color: "text-red-500",
            barColor: "bg-red-500",
        },

        Utilities: {
            icon: Wallet,
            bg: "bg-emerald-500/20",
            color: "text-emerald-500",
            barColor: "bg-emerald-500",
        },
    };

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] =
            (acc[expense.category] || 0) +
            Number(expense.amount);

        return acc;
    }, {});

    const totalExpenseAmount = Object.values(categoryTotals)
        .reduce((sum, amount) => sum + amount, 0);


    const categoryData = Object.entries(categoryTotals).map(
        ([name, amount]) => ({
            name,
            amount,
            percent:
                totalExpenseAmount > 0 ? (amount / totalExpenseAmount) * 100 : 0,
            ...categoryConfig[name],
        })
    );
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );
    const currentDate = new Date();


    const thisMonthExpenses = expenses.
        filter((expense) => {
            const expenseDate = new Date(expense.created_at)
            // console.log(expenseDate);

            return (
                expenseDate.getMonth() === currentDate.getMonth() && expenseDate.getFullYear() === currentDate.getFullYear()

            )
        })
        .reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
        );

    const totalTransactions = expenses.length;

    return (
        <div className="bg-background ">
            <Header
                onOpenModal={() => setIsModalOpen(true)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Expenses"
                    amount={`₹${totalExpenses}`}
                    change="All time"
                    icon={<CreditCard size={14} />}
                />

                <StatsCard
                    title="This Month"
                    amount={`₹${thisMonthExpenses}`}
                    change={currentMonth}
                    icon={<House size={14} />}
                />
                <StatsCard
                    title="Transactions"
                    amount={totalTransactions}
                    change={`${currentMonth}`}
                    icon={<ChartBar size={14} />}
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
                    <SpendingChart data={chartData} />
                </div>

                <div className=" rounded-2xl border border-gray-400/30 p-6 min-h-64 col-span-3">
                    <h2 className="my-2">Categories</h2>
                    {categoryData.map((category) => {
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
                            date={currentDate}
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