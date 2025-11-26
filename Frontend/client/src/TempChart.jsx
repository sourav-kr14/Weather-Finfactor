import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TempChart({ forecast }) {
  if (!forecast || !forecast.list) return null;

  // Group by date
  const groups = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    (groups[date] = groups[date] || []).push(item);
  });

 
  const chartData = Object.entries(groups).slice(0, 5).map(([date, items]) => ({
    date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    temp: Math.round(
      items.reduce((sum, x) => sum + x.main.temp, 0) / items.length
    ),
  }));

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl animate-fadeIn">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Temperature Trend (Bar Graph)
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="4 4" stroke="#ffffff25" />

          <XAxis dataKey="date" stroke="#cbd5e1" tick={{ fontSize: 14 }} />
          <YAxis stroke="#cbd5e1" tick={{ fontSize: 14 }} />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              borderRadius: "10px",
              border: "1px solid #334155",
            }}
            labelStyle={{ color: "#38bdf8" }}
            itemStyle={{ color: "#e2e8f0" }}
          />

          <Bar
            dataKey="temp"
            fill="#38bdf8"
            barSize={45}
            radius={[12, 12, 12, 12]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
