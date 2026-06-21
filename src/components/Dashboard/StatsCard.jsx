import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

function StatsCard({
    title,
    amount,
    change,
    icon,
    trend,
    trendType,
}) {
    return (
        <div
            className="
        p-6
        rounded-2xl
        border
        border-gray-400/20
      "
        >
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {title}
                </p>

                <div className="text-[#6057E8] bg-purple-200/10 h-8 w-8 items-center flex justify-center rounded-full ">
                    {icon}
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-2">
                {amount}
            </h2>

            {trend ? (
                <div className="flex items-center gap-2 text-sm">
                    <div
                        className={`flex items-center gap-1 ${trendType === "up"
                            ? "text-emerald-500"
                            : "text-red-500"
                            }`}
                    >
                        {trendType === "up" ? (
                            <TrendingUp size={14} />
                        ) : (
                            <TrendingDown size={14} />
                        )}

                        <span>{trend}</span>
                    </div>

                    <span className="text-zinc-500 dark:text-zinc-400">
                        {change}
                    </span>
                </div>
            ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {change}
                </p>
            )}
        </div>
    );
}

export default StatsCard;