const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;

    const url = "https://api.openweathermap.org/data/2.5/weather";

    const response = await axios.get(url, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    res.json({
      source: "live",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.response?.data || "Server error" });
  }
});

app.get("/api/forecast", async (req, res) => {
  try {
    const city = req.query.city;

    const url = "https://api.openweathermap.org/data/2.5/forecast";

    const response = await axios.get(url, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    res.json({
      source: "live",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.response?.data || "Server error" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
