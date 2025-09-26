import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const API_URL = "http://localhost:5000/api/votes";
const socket = io("http://localhost:5000");
const COLORS = ["#ef4444", "#b91c1c", "#f87171"];

export default function Results() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(API_URL);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  useEffect(() => {
    fetchResults();
    socket.on("voteUpdate", fetchResults);
    return () => socket.off("voteUpdate");
  }, []);

  const chartData = ["A", "B", "C"].map((opt) => {
    const found = results.find((r) => r._id === opt);
    return { name: `Option ${opt}`, value: found ? found.count : 0 };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-800 p-4 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 animate-[fadeIn_1s_ease-in]">
        Live Voting Results
      </h1>

      {/* Bar Chart Card */}
      <div className="w-full max-w-xl bg-gradient-to-r from-gray-800 via-black to-red-700 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl p-4 mb-5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis allowDecimals={false} stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: "6px", border: "none" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="value" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart Card */}
      <div className="w-full max-w-md bg-gradient-to-r from-gray-800 via-black to-red-700 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl p-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#ef4444"
              label={({ name, value }) => `${name} 🎯 ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              wrapperStyle={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}
              layout="horizontal"
              align="center"
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: "6px", border: "none" }}
              itemStyle={{ color: "#fff" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
