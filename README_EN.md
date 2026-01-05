🚀 Finance Viewer

Finance Viewer is a web application for real-time cryptocurrency analysis and tracking.
The project consists of a frontend (React + Next.js) and a backend (.NET / ASP.NET Core).

📌 Key Features

Cryptocurrency market overview (price, market cap, volume, 24h High/Low)

Sorting cryptocurrencies by various parameters

Real-time linear price chart (Binance WebSocket)

Retrieving cryptocurrency balances (BTC, ETH, SOL) by wallet address

API proxy usage to bypass CORS and ngrok limitations

🧩 Technology Stack
Frontend

React

Next.js

TailwindCSS

Chart.js (react-chartjs-2)

WebSocket (Binance)

Backend

ASP.NET Core (.NET)

Entity Framework Core

SQLite

ASP.NET Identity

📂 Project Structure
BestCryptoProject/
├─ FinanceViewer-master/
│  └─ FinanceViewer/
│     └─ Program.cs        ← Backend (.NET)
│
├─ FinanceViewerFrontend2-main/           ← Frontend (React + Next.js)

⚙️ Running the Project Locally
✅ Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

npm

.NET SDK 7.0+

Git

🔧 Running Backend (.NET)

Navigate to the backend folder:

cd BestCryptoProject/FinanceViewer-master/FinanceViewer


Run the project:

dotnet run


Backend will be available at (example):

https://localhost:5000


⚠️ Make sure the SQLite connection string is correctly set in appsettings.json.

🎨 Running Frontend (React + Next.js)

Navigate to the frontend folder:

cd FinanceViewerFrontend2-main


Install dependencies:

npm install


Create .env.local and specify backend URL:

NEXT_PUBLIC_API_BASE_URL=https://localhost:5001/api/v1


Start the development server:

npm run dev


Open in browser:

http://localhost:3000

🔁 API Proxy and CORS

To bypass CORS and ngrok warnings, an API proxy is used on the Next.js side.
It adds the following header:

ngrok-skip-browser-warning: 1


and proxies requests to the backend, returning valid JSON.

🧪 Common Issues and Solutions
❌ API returns HTML instead of JSON

✔️ Fixed — API now always returns JSON.

❌ CORS / ngrok error

✔️ Solved using a server-side API proxy in Next.js.

❌ addCandlestickSeries is not a function error

✔️ Candlestick chart replaced with a linear chart (react-chartjs-2).

👨‍💻 Project Authors

Igor Makarenko — Backend Developer

Zakhar Kotov — Frontend Developer

Bogdan Kononov — Fullstack / API & Integration

📈 Possible Improvements

Adding candlestick charts

Expanding supported cryptocurrencies

User portfolio analytics

UX and performance improvements
