import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function SpendingChart({ data }) {
    const chartData = data
    console.log(data);
    
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
                            dataKey="amount"
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
