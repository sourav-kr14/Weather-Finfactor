import React from "react";

export default function HourlySlider({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const hourly = forecast.list.slice(0, 12).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    desc: item.weather[0].description,
  }));

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 animate-fadeIn">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Hourly Forecast
      </h2>

      <div
        className="
          flex flex-row flex-nowrap gap-6
          overflow-x-auto overflow-y-hidden
          scrollbar-thin px-2 py-3
        "
      >
        {hourly.map((h, i) => (
          <div
            key={i}
            className="
              min-w-[120px] bg-white/10 backdrop-blur-xl
              rounded-2xl border border-white/20 shadow-lg
              p-4 flex flex-col items-center
              hover:scale-105 transition duration-300
            "
          >
            <p className="text-white font-semibold mb-2 text-sm">{h.time}</p>

            <img
              src={`https://openweathermap.org/img/wn/${h.icon}@2x.png`}
              alt="hourly status"
              className="w-12 h-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />

            <p className="text-xl font-bold text-sky-400 mt-2">{h.temp}°C</p>

            <p className="text-slate-300 text-xs capitalize mt-1">{h.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
