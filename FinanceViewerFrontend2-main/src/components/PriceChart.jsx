//            /* График который дергается от каждого чиха */
// 'use client';

// import { useEffect, useState } from 'react';
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// export default function PriceChart({ symbol, initialHigh24h, initialLow24h, initialMarketCap }) {
//     const [dataPoints, setDataPoints] = useState([]);
//     const [labels, setLabels] = useState([]);
//     const [currentPrice, setCurrentPrice] = useState(null);
//     const [high24h, setHigh24h] = useState(initialHigh24h);
//     const [low24h, setLow24h] = useState(initialLow24h);
//     const [marketCap, setMarketCap] = useState(initialMarketCap);

//     useEffect(() => {
//         const pair = `${symbol.toLowerCase()}usdt`;
//         const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

//         ws.onmessage = (event) => {
//             const message = JSON.parse(event.data);
//             const price = parseFloat(message.p);
//             const time = new Date(message.T).toLocaleTimeString();

//             // обновляем график
//             setDataPoints((prev) => [...prev.slice(-49), price]);
//             setLabels((prev) => [...prev.slice(-49), time]);

//             // обновляем данные сверху
//             setCurrentPrice(price);

//             // при желании можно динамически обновлять high/low
//             if (price > high24h) setHigh24h(price);
//             if (price < low24h) setLow24h(price);

//             // market cap можно оставить фиксированным или обновлять через API
//         };

//         return () => ws.close();
//     }, [symbol, high24h, low24h]);

//     const chartData = {
//         labels,
//         datasets: [
//             {
//                 label: `${symbol.toUpperCase()} Price`,
//                 data: dataPoints,
//                 borderColor: '#00b894',
//                 backgroundColor: 'rgba(0,200,83,0.2)',
//                 tension: 0.25,
//                 pointRadius: 0,
//                 borderWidth: 2,
//             },
//         ],
//     };

//     return (
//         <div>
//             {/* Блок с актуальными данными */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                     <p className="text-sm text-gray-400">Current Price</p>
//                     <p className="text-lg font-semibold">${currentPrice?.toLocaleString()}</p>
//                 </div>
//                 <div>
//                     <p className="text-sm text-gray-400">24h High</p>
//                     <p className="text-lg font-semibold text-green-600">${high24h?.toLocaleString()}</p>
//                 </div>
//                 <div>
//                     <p className="text-sm text-gray-400">24h Low</p>
//                     <p className="text-lg font-semibold text-red-600">${low24h?.toLocaleString()}</p>
//                 </div>
//                 <div>
//                     <p className="text-sm text-gray-400">Market Cap</p>
//                     <p className="text-lg font-semibold">${marketCap?.toLocaleString()}</p>
//                 </div>
//             </div>

//             {/* Линейный график */}
//             <div className="w-full h-72">
//                 <Line data={chartData} options={{ responsive: true }} />
//             </div>
//         </div>
//     );
// }

//             /* График который дергается не так часто */

'use client';

import { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PriceChart({ symbol, initialHigh24h, initialLow24h, initialMarketCap }) {
    const [dataPoints, setDataPoints] = useState([]);
    const [labels, setLabels] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [high24h, setHigh24h] = useState(initialHigh24h);
    const [low24h, setLow24h] = useState(initialLow24h);
    const [marketCap, setMarketCap] = useState(initialMarketCap);

    const wsRef = useRef(null);
    const bufferRef = useRef([]);

    useEffect(() => {
        const pair = `${symbol.toLowerCase()}usdt`;
        wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

        wsRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const price = parseFloat(message.p);
            bufferRef.current.push({ price, time: new Date(message.T).toLocaleTimeString() });
        };

        // Обновляем график каждые 2 секунды
        const interval = setInterval(() => {
            if (bufferRef.current.length === 0) return;

            // Берём среднее из буфера
            const prices = bufferRef.current.map(p => p.price);
            const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

            const times = bufferRef.current.map(p => p.time);
            const lastTime = times[times.length - 1];

            // Обновляем график (последние 50 точек)
            setDataPoints(prev => [...prev.slice(-49), avgPrice]);
            setLabels(prev => [...prev.slice(-49), lastTime]);
            setCurrentPrice(avgPrice);

            // Динамически обновляем high/low
            setHigh24h(prev => Math.max(prev, avgPrice));
            setLow24h(prev => Math.min(prev, avgPrice));

            bufferRef.current = [];
        }, 1000);

        return () => {
            wsRef.current?.close();
            clearInterval(interval);
        };
    }, [symbol]);

    const chartData = {
        labels,
        datasets: [
            {
                label: `${symbol.toUpperCase()} Price`,
                data: dataPoints,
                borderColor: '#4ade80',                 // зелёная линия
                backgroundColor: 'rgba(74,222,128,0.2)', // полупрозрачная заливка
                tension: 0.4,                            // плавные кривые
                pointRadius: 0,
                borderWidth: 3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            x: { 
                ticks: { color: '#64748b' }, 
                grid: { display: false } 
            },
            y: { 
                ticks: { color: '#64748b' }, 
                grid: { color: 'rgba(0,0,0,0.05)' } 
            },
        },
    };

    return (
        <div>
            {/* Блок с актуальными данными */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-400">Current Price</p>
                    <p className="text-lg font-semibold">${currentPrice?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">24h High</p>
                    <p className="text-lg font-semibold text-green-600">${high24h?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">24h Low</p>
                    <p className="text-lg font-semibold text-red-600">${low24h?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Market Cap</p>
                    <p className="text-lg font-semibold">${marketCap?.toLocaleString()}</p>
                </div>
            </div>

            {/* Линейный график */}
            <div className="w-full h-72">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
