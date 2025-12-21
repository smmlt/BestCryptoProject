'use client';

export default function CryptoCard({ coin, onClick }) {
    const { symbol, name, image, current_price, market_cap, total_volume, high_24h, low_24h } = coin;

    return (
        <div
            onClick={() => onClick(coin)}
            className="w-full p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img src={image} alt={name} className="w-10 h-10" />
                    <div>
                        <p className="text-lg font-bold text-slate-900 leading-none">{name}</p>
                        <p className="text-sm font-medium text-slate-400 uppercase">{symbol}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold text-blue-900">${current_price?.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-slate-50 pt-4">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Market Cap</p>
                    <p className="text-sm font-semibold text-slate-700">{market_cap}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">24h High</p>
                    <p className="text-sm font-semibold text-green-600">${high_24h?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total Volume</p>
                    <p className="text-sm font-semibold text-slate-700">{total_volume}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">24h Low</p>
                    <p className="text-sm font-semibold text-red-600">${low_24h?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
