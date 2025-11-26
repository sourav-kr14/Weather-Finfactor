export async function fetchWeather(city) {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

  const raw = await response.json();

  if (!response.ok) {
    throw new Error(raw.error || "Failed to fetch weather");
  }

  return transformWeatherResponse(raw);
}

export async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

  const raw = await response.json();

  if (!response.ok) {
    throw new Error(raw.error || "Failed to fetch weather from coordinates");
  }

  return transformWeatherResponse(raw);
}

function transformWeatherResponse(raw) {
  const d = raw.data;

  return {
    source: raw.source,
    data: {
      city: d.name,
      country: d.sys?.country ?? "",

      coordinates: {
        lat: d.coord?.lat,
        lon: d.coord?.lon,
      },

      weather:
        d.weather && d.weather.length > 0
          ? {
              id: d.weather[0].id,
              main: d.weather[0].main,
              description: d.weather[0].description,
              icon: d.weather[0].icon,
            }
          : null,

      temperature: {
        current: d.main?.temp,
        feelsLike: d.main?.feels_like,
        min: d.main?.temp_min,
        max: d.main?.temp_max,
      },

      pressure: d.main?.pressure,
      humidity: d.main?.humidity,

      wind: d.wind
        ? {
            speed: d.wind.speed,
            deg: d.wind.deg,
          }
        : null,

      clouds: d.clouds ?? null,
      visibility: d.visibility,

      sunrise: d.sys?.sunrise,
      sunset: d.sys?.sunset,

      timezoneOffset: d.timezone,
    },
  };
}

export async function fetchForecast(city) {
  const response = await fetch(
    `/api/forecast?city=${encodeURIComponent(city)}`
  );

  const raw = await response.json();

  if (!response.ok) {
    throw new Error(raw.error || "Failed to fetch forecast");
  }

  return {
    source: raw.source,
    data: raw.data,
  };
}

export async function fetchForecastByCoords(lat, lon) {
  const response = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);

  const raw = await response.json();

  if (!response.ok) {
    throw new Error(raw.error || "Failed to fetch forecast from coordinates");
  }

  return {
    source: raw.source,
    data: raw.data,
  };
}
