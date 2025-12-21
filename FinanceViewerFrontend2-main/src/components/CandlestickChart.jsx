// 'use client';

// import { useEffect, useRef } from 'react';
// import { createChart } from 'lightweight-charts';

// export default function CandlestickChart({ symbol }) {
//     const containerRef = useRef(null);
//     const wsRef = useRef(null);

//     useEffect(() => {
//         if (!containerRef.current) return;

//         const chart = createChart(containerRef.current, {
//             width: containerRef.current.clientWidth,
//             height: 400,
//             layout: { background: { color: '#fff' }, textColor: '#333' },
//             grid: { vertLines: { visible: false }, horzLines: { visible: false } },
//         });

//         console.log('chart object:', chart);
//         console.log('addCandlestickSeries type:', typeof chart.addCandlestickSeries);

//         if (!chart.addCandlestickSeries) {
//             console.error('Метод addCandlestickSeries не найден!');
//             return; // прерываем эффект, чтобы не было дальнейших ошибок
//         }

//         const series = chart.addCandlestickSeries();

//         const pair = `${symbol.toLowerCase()}usdt`;

//         wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@kline_1s`);

//         wsRef.current.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             const k = data.k;
//             series.update({
//                 time: k.t / 1000,
//                 open: +k.o,
//                 high: +k.h,
//                 low: +k.l,
//                 close: +k.c,
//             });
//         };

//         const resizeObserver = new ResizeObserver(() => {
//             chart.applyOptions({ width: containerRef.current.clientWidth });
//         });
//         resizeObserver.observe(containerRef.current);

//         return () => {
//             wsRef.current?.close();
//             chart.remove();
//             resizeObserver.disconnect();
//         };
//     }, [symbol]);

//     return <div ref={containerRef} className="w-full" />;
// }
