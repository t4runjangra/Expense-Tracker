
import Header from "../Header";
import StatsCard from "./StatsCard";
import { CreditCard, ChartNoAxesCombined, House, TrendingUpDown } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Transaction from "./Transaction";
import expenses from "../../data/Expense.json"

function Dashboard() {
    const currentMonth = new Date().toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );
    return (
        <div className="bg-background ">
            <Header />

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
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="col-span-2 rounded-2xl border p-6 min-h-87.5">
                    Spending Trend
                </div>

                <div className="rounded-2xl border p-6 min-h-87.5">
                    Categories
                </div>
            </div>
            <div className="mt-6 rounded-2xl border border-gray-400/30 p-6">
                Recent Transaction
                <div>
                    {expenses.map((expense) => (
                        <Transaction
                            key={expense.id}
                            title={expense.title}
                            amount={expense.amount}
                            category={expense.category}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;