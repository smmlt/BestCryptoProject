'use client';

import PriceChart from './PriceChart';

export default function CryptoModal({ coin, onClose }) {
    if (!coin) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg w-[90%] max-w-3xl p-6 relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">
                    {coin.name} ({coin.symbol.toUpperCase()})
                </h2>

                {/* Передаем только initial значения в PriceChart */}
                <PriceChart
                    symbol={coin.symbol}
                    initialHigh24h={coin.high_24h}
                    initialLow24h={coin.low_24h}
                    initialMarketCap={coin.market_cap}
                />
            </div>
        </div>
    );
}
