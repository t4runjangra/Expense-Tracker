import React, { useEffect, useState } from 'react'
import {
    Pencil,
    Trash,
    Tv,
    ShoppingBag,
    Car,
    Utensils,
    HeartPulse,
    Wallet,
} from "lucide-react";

function Transaction({ id, title, amount, category, onDelete, onEdit, expense }) {


    const categoryConfig = {
        Entertainment: {
            icon: Tv,
            bg: "bg-purple-500/20",
            color: "text-purple-500",
        },

        Shopping: {
            icon: ShoppingBag,
            bg: "bg-blue-500/20",
            color: "text-blue-500",
        },

        Transportation: {
            icon: Car,
            bg: "bg-yellow-500/20",
            color: "text-yellow-500",
        },

        Food: {
            icon: Utensils,
            bg: "bg-orange-500/20",
            color: "text-orange-500",
        },

        Health: {
            icon: HeartPulse,
            bg: "bg-red-500/20",
            color: "text-red-500",
        },

        Utilities: {
            icon: Wallet,
            bg: "bg-emerald-500/20",
            color: "text-emerald-500",
        },
    };
    const config =
        categoryConfig[category] ||
        categoryConfig["Utilities"];

    const Icon = config.icon;
    return (
        <>
            <div className="flex items-center justify-between py-4 border-b  border-gray-400/30">
                <div className='flex gap-4 items-center justify-center'>

                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bg}`}
                    >
                        <Icon
                            size={18}
                            className={config.color}
                        />
                    </div>
                    <div>
                        <h3 className="font-medium">{title}</h3>
                        <p className="text-sm text-zinc-500">
                            {category}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="font-semibold">
                        ₹{amount}
                    </p>

                    <button
                        onClick={() => onDelete(id)}
                        className="text-red-500 hover:text-red-600 transition"
                    >
                        <Trash size={16} />
                    </button>
                    <button
                        onClick={() => onEdit(expense)}
                        className="text-blue-500 hover:text-blue-600 transition"
                    >
                        <Pencil size={16} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Transaction
