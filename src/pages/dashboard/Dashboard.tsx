// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "@/redux/features/transactionSlice";
import { getAllBudgets } from "@/redux/features/budgetSlice";
import Loader from "@/components/Loader/Loader";


const BudgetDashboard = () => {
    const dispatch = useDispatch();
    const [selectedMonth, setSelectedMonth] = useState("4");
    const [budgetData, setBudgetData] = useState({});
    const { transactions, isLoading } = useSelector((state) => state.transactions)
    const { budgets, isLoading: budgetLoading } = useSelector((state) => state.budget)
    const transactionData = transactions.map((tx) => ({
        ...tx,
        date: new Date(tx.date).toISOString().split("T")[0],
    }));
    const filteredTransactions = transactionData.filter((tx) => {
        const txMonth = new Date(tx.date).getMonth() + 1;
        return txMonth === parseInt(selectedMonth);
    });
    const categoryExpenses = filteredTransactions.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});
    const pieData = Object.entries(categoryExpenses).map(([name, value]) => ({
        name,
        value,
    }));
    const barData = Object.keys(budgetData).map((cat) => ({
        category: cat,
        budget: budgetData[cat],
        actual: categoryExpenses[cat] || 0,
    }));
    const totalSpent = Object.values(categoryExpenses).reduce((a, b) => a + b, 0);
    const totalBudget = Object.values(budgetData).reduce((a, b) => a + b, 0);
    const remaining = totalBudget - totalSpent;
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };


    const spendingInsights = Object.keys(budgetData).map((cat) => {
        const spent = categoryExpenses[cat] || 0;
        const budget = budgetData[cat];
        const diff = spent - budget;

        if (diff > 0) return { type: "Over Budget", category: cat, amount: diff };
        if (diff < 0) return { type: "Under Budget", category: cat, amount: Math.abs(diff) };
        return { type: "On Budget", category: cat, amount: 0 };
    });

    const recent = [...transactionData]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    useEffect(() => {
        dispatch(getAllTransactions());
        dispatch(getAllBudgets());
    }, []);
    useEffect(() => {
        if (budgets.length > 0) {
            setBudgetData(budgets[0].categories);
        }
    }, [budgets]);
    if(isLoading&&budgetLoading){
        return(<div>
            <Loader className="mt-48"/>
        </div>)
    }
    return (
        <div className="p-2" style={{ height: "85vh", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div className="flex flex-col h-1/2 gap-4 bg-white p-4">
                <div className="w-48">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">January</SelectItem>
                            <SelectItem value="2">February</SelectItem>
                            <SelectItem value="3">March</SelectItem>
                            <SelectItem value="4">April</SelectItem>
                            <SelectItem value="5">May</SelectItem>
                            <SelectItem value="6">June</SelectItem>
                            <SelectItem value="7">July</SelectItem>
                            <SelectItem value="8">August</SelectItem>
                            <SelectItem value="9">September</SelectItem>
                            <SelectItem value="10">October</SelectItem>
                            <SelectItem value="11">November</SelectItem>
                            <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2 bg-white p-4 rounded-xl shadow flex flex-col gap-6">
                        <h2 className="text-lg font-semibold">Category-wise Expenses</h2>
                        <PieChart width={400} height={330} >
                            <Pie
                                data={pieData.length > 0 ? pieData : [{ name: "No Data", value: 1 }]}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={pieData.length > 0}
                            >
                                {(pieData.length > 0
                                    ? pieData
                                    : [{ name: "No Data", value: 1 }]
                                ).map((entry, i) => (
                                    <Cell
                                        key={`cell-${i}`}
                                        fill={
                                            pieData.length > 0
                                                ? ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][i % 4]
                                                : "#E5E7EB" // Tailwind gray-200
                                        }
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                        {pieData.length === 0 && (
                            <p className="text-sm text-center text-gray-600 -mt-4">No transaction data available</p>
                        )}
                    </div>


                    <div className="w-1/2 bg-white p-4 rounded shadow flex flex-col gap-6">
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-semibold">Budget vs Actual</h2>


                        </div>
                        <BarChart width={500} height={260} data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="budget" fill="#8884d8" />
                            <Bar dataKey="actual" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 h-1/2 border-6 border-black">
                <div className="flex gap-4 h-1/2 w-full">
                    <Card className="w-full h-full items-center">
                        <CardHeader>Total Spent</CardHeader>
                        <CardContent><Label>₹{totalSpent}</Label></CardContent>
                    </Card>
                    <Card className="w-full h-full items-center">
                        <CardHeader>Total Budget</CardHeader>
                        <CardContent><Label>₹{totalBudget}</Label></CardContent>
                    </Card>
                    <Card className="w-full h-full items-center">
                        <CardHeader>Remaining</CardHeader>
                        <CardContent><Label>₹{remaining}</Label></CardContent>
                    </Card>
                </div>

                <div className="flex gap-4">
                    <Card className="w-1/2 bg-red-100">
                        <CardHeader>Over Budget</CardHeader>
                        <CardContent>
                            {spendingInsights.filter(item => item.type === "Over Budget").length > 0 ? (
                                spendingInsights
                                    .filter(item => item.type === "Over Budget")
                                    .map((item, idx) => (
                                        <p key={idx} className="flex justify-between">
                                            <span>{item.category}</span>
                                            <span className="font-semibold">₹{item.amount}</span>
                                        </p>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-600">No categories over budget</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="w-1/2 bg-green-100">
                        <CardHeader>Under Budget</CardHeader>
                        <CardContent>
                            {spendingInsights.filter(item => item.type === "Under Budget").length > 0 ? (
                                spendingInsights
                                    .filter(item => item.type === "Under Budget")
                                    .map((item, idx) => (
                                        <p key={idx} className="flex justify-between">
                                            <span>{item.category}</span>
                                            <span className="font-semibold">₹{item.amount}</span>
                                        </p>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-600">No categories under budget</p>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="w-1/2 bg-blue-100">
                        <CardHeader>Savings</CardHeader>
                        <CardContent>
                            {spendingInsights.filter(item => item.type === "On Budget").length > 0 ? (
                                spendingInsights
                                    .filter(item => item.type === "On Budget")
                                    .map((item, idx) => (
                                        <p key={idx} className="flex justify-between">
                                            <span>{item.category}</span>
                                            <span className="font-semibold">₹{item.amount}</span>
                                        </p>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-600">No Savings this month</p>
                            )}
                        </CardContent>
                    </Card>

                </div>


                <Card className="w-full bg-gray-50">
                    <CardHeader>Recent Transactions</CardHeader>
                    <CardContent>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Category</th>
                                    <th className="p-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map((tx, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-2">{tx.date}</td>
                                        <td className="p-2">{tx.category}</td>
                                        <td className="p-2">₹{tx.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BudgetDashboard;
