import React, { useState } from "react";
import {
  fetchWeather,
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "./api";

import TempChart from "./TempChart";
import HourlySlider from "./HourlySlider";
import Footer from "./Footer";
import "tailwindcss";

function formatLocalTime(unixSeconds, offset) {
  if (!unixSeconds || offset == null) return "-";
  const date = new Date((unixSeconds + offset) * 1000);
  return date.toUTCString().replace("GMT", "").trim();
}

function WeatherCard({ payload }) {
  const data = payload?.data;
  if (!data) return null;

  return (
    <div
      className="
      w-full max-w-xl rounded-3xl p-8 
      bg-white/10 backdrop-blur-2xl 
      border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      animate-fadeIn hover:scale-[1.02] transition-transform
    "
    >
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-white tracking-wide">
          {data.city}, <span className="text-sky-400">{data.country}</span>
        </h2>

        <p className="text-slate-300 text-sm mt-1">
          Lat: {data.coordinates?.lat ?? "-"} | Lon:{" "}
          {data.coordinates?.lon ?? "-"}
        </p>
      </div>

      <div className="flex flex-col items-center mt-6">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather.icon}@4x.png`}
          className="w-32 h-32 drop-shadow-[0_0_20px_rgba(0,200,255,0.7)] animate-bounce-slow"
        />

        <p className="text-white capitalize text-xl mt-2">
          {data.weather.description}
        </p>

        <p className="text-7xl font-extrabold text-sky-400 drop-shadow-lg mt-2">
          {Math.round(data.temperature.current)}°C
        </p>

        <p className="text-slate-300 mt-1">
          Feels like {Math.round(data.temperature.feelsLike)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
          <h3 className="text-white font-bold text-lg">Atmosphere</h3>
          <p className="text-slate-300">Humidity: {data.humidity}%</p>
          <p className="text-slate-300">Pressure: {data.pressure} hPa</p>
          <p className="text-slate-300">Clouds: {data.clouds.all}%</p>
        </div>

        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
          <h3 className="text-white font-bold text-lg">Wind & Sun</h3>
          <p className="text-slate-300">Speed: {data.wind.speed} m/s</p>
          <p className="text-slate-300">Direction: {data.wind.deg}°</p>

          <p className="text-slate-300 mt-2">
            Sunrise: {formatLocalTime(data.sunrise, data.timezoneOffset)}
          </p>
          <p className="text-slate-300">
            Sunset: {formatLocalTime(data.sunset, data.timezoneOffset)}
          </p>
        </div>
      </div>
    </div>
  );
}

function Forecast({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const groups = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    (groups[date] = groups[date] || []).push(item);
  });

  const fiveDays = Object.entries(groups).slice(0, 5);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 text-center">
      <h2 className="text-4xl font-extrabold text-white mb-5 tracking-wide">
        5-Day Forecast
      </h2>

      <div
        className="
          flex flex-row flex-nowrap gap-6 
          overflow-x-auto scrollbar-thin px-2 py-3
        "
      >
        {fiveDays.map(([date, arr], i) => {
          const icon = arr[0].weather[0].icon;
          const avgTemp = arr.reduce((s, x) => s + x.main.temp, 0) / arr.length;

          return (
            <div
              key={i}
              className="
                min-w-[160px] bg-white/10 rounded-2xl 
                border border-white/20 p-5 shadow-lg 
                flex flex-col items-center backdrop-blur-xl
              "
            >
              <p className="text-white font-semibold mb-2">
                {new Date(date).toDateString()}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                className="w-16 h-16"
              />

              <p className="text-3xl font-bold text-sky-400 mt-2">
                {Math.round(avgTemp)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let weatherBgClass =
    "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]";

  const w = result?.data?.weather?.main;

  if (result) {
    if (w === "Clear")
      weatherBgClass =
        "bg-gradient-to-br from-yellow-300 via-orange-400 to-sky-600";
    else if (w === "Clouds")
      weatherBgClass =
        "bg-gradient-to-br from-gray-400 via-gray-600 to-gray-900";
    else if (w === "Rain")
      weatherBgClass =
        "bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900";
    else if (w === "Snow")
      weatherBgClass = "bg-gradient-to-br from-blue-100 via-white to-blue-200";
    else if (w === "Thunderstorm")
      weatherBgClass = "bg-gradient-to-br from-black via-purple-900 to-black";
    else if (w === "Haze")
      weatherBgClass =
        "bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700";
    else if (w === "Mist" || w === "Fog")
      weatherBgClass =
        "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400";
    else if (w === "Drizzle")
      weatherBgClass =
        "bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700";
  }

  async function handleAutoLocation() {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const weatherData = await fetchWeatherByCoords(latitude, longitude);
          const forecastData = await fetchForecastByCoords(latitude, longitude);

          setResult(weatherData);
          setForecast(forecastData.data);
        } catch (err) {
          setError("Could not fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setForecast(null);

    if (!city.trim()) return setError("Enter a city name.");

    try {
      setLoading(true);

      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);

      setResult(weatherData);
      setForecast(forecastData.data);
    } catch (err) {
      setError("City not found.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`
        min-h-screen flex flex-col justify-between items-center 
        text-white px-6 py-10 transition-colors duration-700 ${weatherBgClass}
      `}
    >
      <div className="flex flex-col items-center w-full flex-grow">
        <div
          className="
            w-full max-w-2xl bg-white/10 backdrop-blur-2xl 
            rounded-3xl p-8 border border-white/20 shadow-xl animate-fadeIn mb-10
          "
        >
          <h2 className="text-center text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-300 to-blue-500 text-transparent bg-clip-text mb-6">
            Weather || Finfactor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="w-full flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter city name..."
                className="
        w-full px-5 py-4 rounded-2xl bg-white/20 
        border border-white/30 text-white placeholder-gray-200 
        shadow-lg focus:ring-2 focus:ring-sky-400 outline-none
      "
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <button
                type="button"
                onClick={handleAutoLocation}
                className="
        absolute right-4 top-1/2 -translate-y-1/2 
        text-white hover:text-sky-300 
        transition-all
      "
              >
                📍
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
      px-8 py-4 rounded-2xl 
      bg-gradient-to-r from-sky-400 to-blue-500 
      text-black font-semibold shadow-xl 
      hover:scale-105 transition-all disabled:opacity-50
    "
            >
              {loading ? "..." : "Search"}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-300 px-5 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {result && <WeatherCard payload={result} />}
        {forecast && <HourlySlider forecast={forecast} />}
        {forecast && <Forecast forecast={forecast} />}
        {forecast && <TempChart forecast={forecast} />}
      </div>

      <Footer />
    </div>
  );
}
