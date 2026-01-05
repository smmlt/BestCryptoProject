
# 🚀 Finance Viewer

**Finance Viewer** is a web application for real-time cryptocurrency analysis and tracking.
The project consists of a **frontend (React + Next.js)** and a **backend (.NET / ASP.NET Core)**.

---

## 📌 Key Features

* View the cryptocurrency market (price, market cap, volume, 24h High/Low)
* Sort cryptocurrencies by various parameters
* Real-time linear price chart (Binance WebSocket)
* Retrieve cryptocurrency balances (BTC, ETH, SOL) by wallet address
* API proxy usage to bypass CORS and ngrok limitations

---

## 🧩 Technology Stack

### Frontend

* React
* Next.js
* TailwindCSS
* Chart.js (`react-chartjs-2`)
* WebSocket (Binance)

### Backend

* ASP.NET Core (.NET)
* Entity Framework Core
* SQLite
* ASP.NET Identity

---

## 📂 Project Structure

```
BestCryptoProject/
├─ FinanceViewer-master/
│  └─ FinanceViewer/
│     └─ Program.cs        ← Backend (.NET)
│
├─ FinanceViewerFrontend2-main/           ← Frontend (React + Next.js)
```

---

## ⚙️ Running the Project Locally

### ✅ Prerequisites

Make sure you have the following installed:

* **Node.js** (v18+ recommended)
* **npm**
* **.NET SDK 7.0+**
* **Git**

---

## 🔧 Running the Backend (.NET)

1. Navigate to the backend folder:

   ```bash
   cd BestCryptoProject/FinanceViewer-master/FinanceViewer
   ```

2. Run the project:

   ```bash
   dotnet run
   ```

3. The backend will be available at (example):

   ```
   https://localhost:5000
   ```

> ⚠️ Make sure the SQLite connection string is correctly configured in `appsettings.json`.

---

## 🎨 Running the Frontend (React + Next.js)

1. Navigate to the frontend folder:

   ```bash
   cd FinanceViewerFrontend2-main
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and specify the backend URL:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://localhost:5001/api/v1
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open in your browser:

   ```
   http://localhost:3000
   ```

---

## 🔁 API Proxy & CORS

To bypass CORS issues and ngrok warnings, an **API proxy** is used on the Next.js side.
It adds the following header:

```http
ngrok-skip-browser-warning: 1
```

and proxies requests to the backend, returning valid JSON responses.

---

## 🧪 Common Issues & Solutions

### ❌ API returns HTML instead of JSON

✔️ Fixed — the API now always returns JSON.

### ❌ CORS / ngrok error

✔️ Resolved using a server-side API proxy in Next.js.

### ❌ `addCandlestickSeries is not a function` error

✔️ The candlestick chart was replaced with a linear chart (`react-chartjs-2`).

---

## 👨‍💻 Project Authors

* **Igor Makarenko** — Backend Developer
  GitHub: [https://github.com/Igggosha](https://github.com/Igggosha)

* **Zakhar Kotov** — Frontend Developer
  GitHub: [https://github.com/GboyYouMam](https://github.com/GboyYouMam)

* **Bogdan Kononov** — Fullstack / API & Integration
  GitHub: [https://github.com/smmlt](https://github.com/smmlt)

---

## 📈 Possible Improvements

* Add a candlestick chart
* Expand the list of supported cryptocurrencies
* User portfolio analytics
* Improved UX and performance
