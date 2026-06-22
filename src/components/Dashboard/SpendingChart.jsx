import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function SpendingChart() {
    const chartData = [
        { month: "Jan", expense: 3200 },
        { month: "Feb", expense: 2800 },
        { month: "Mar", expense: 4100 },
        { month: "Apr", expense: 3600 },
        { month: "May", expense: 5200 },
        { month: "Jun", expense: 4500 },
    ];
    return (
        <div>
            <div className="h-75 ">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#7c3aed"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>



        </div>
    )
}

export default SpendingChart
