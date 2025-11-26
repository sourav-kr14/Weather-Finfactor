# 🌦️ Weather Search Application

A full-stack weather search application built as part of the FinFactor coding assignment.  
Users can search for any city and view real-time weather information fetched from the OpenWeather API.

---

## 🧰 Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express.js  
**API:** OpenWeather Current Weather API  
**Languages:** JavaScript  
**Tools:** Git, npm, VS Code  

---

## ✨ Features

### 🔵 Frontend (React + Vite + Tailwind CSS)

- Search bar to look up any city  
- Clean, modern, responsive UI  
- Displays detailed weather information:
  - Temperature  
  - Weather condition & icon  
  - Humidity  
  - Pressure  
  - Wind speed  
  - Cloudiness  
  - Visibility  
  - Sunrise & sunset  
- Error handling for invalid city names  
- Loading states for smoother user experience  

---

### 🟢 Backend (Node.js + Express)

- REST API built using Node.js  
- Fetches weather data from **OpenWeather Current Weather API**  
- Implements server-side caching with:
  - Faster repeated queries  
  - Cache expiry (TTL)  
  - Maximum cache entries limit  
- Graceful error handling for:
  - Invalid API key  
  - City not found  
  - Vendor API failure  
- Environment variables support using `.env`

---

## 🌐 API Used

**OpenWeather – Current Weather Data API**

**Endpoint used:**
/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

Weather-Finfactor/
│
├── backend/
│ ├── src/
│ ├── package.json
│ ├── .env.example
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── vite.config.js
│ └── ...
│
├── .gitignore
└── README.md


---

## ⚙️ Environment Variables

The backend requires a `.env` file to run locally.  
Create a `.env` file inside the **backend** folder with the following variables:

OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
PORT=4000
CACHE_TTL_MS=600000
MAX_CACHE_ENTRIES=100


A `.env.example` file is included in the backend folder to show the required format.  
Please note: **Do not commit your actual `.env` file** — it should stay local and private.

---

## 🛠️ How to Run the Project

### 1️⃣ Start Backend
- cd backend
- npm install
- npm start

---

### 2️⃣ Start Frontend

cd frontend
npm install
npm run dev

Frontend runs at the Vite URL shown in terminal (usually `http://localhost:5173`).

---

## 🔁 Caching Logic

The backend uses in-memory caching to improve performance:

- Checks if weather data for a city is already cached  
- Serves cached data instantly (fast)  
- Refreshes data after TTL expires  
- Removes the oldest cache entry when max limit is reached  
- Reduces vendor API calls significantly  

---

## ✔️ Assignment Requirements Covered

- REST API built according to guidelines  
- Server-side caching implemented (expiry + max size)  
- Local running backend + frontend  
- Rich weather data display in UI  
- Proper error handling  
- Clean code structure  
- API documentation included  
- README with all required information  

---

## Screenshots

<img width="1912" height="1021" alt="Screenshot 2025-11-26 174850" src="https://github.com/user-attachments/assets/23cabd79-6cef-47dd-9f6a-0594dd222eee" />

<img width="1911" height="1023" alt="Screenshot 2025-11-26 174927" src="https://github.com/user-attachments/assets/76b226c2-923f-432a-bcfe-8def836d36e5" />

<img width="1908" height="1019" alt="Screenshot 2025-11-26 174943" src="https://github.com/user-attachments/assets/fab20032-d4f0-4cce-9ee4-58e3f14866bd" />



## 👨‍💻 Author

**Sourav Kumar**  
MCA Student | Full-Stack Developer  
GitHub: https://github.com/sourav-kr14









