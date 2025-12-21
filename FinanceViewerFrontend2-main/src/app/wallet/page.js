'use client';
import {useState} from "react";

export default function Wallet() {
    const [worth, setWorth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const form = event.target;
        const currency = form.currency.value;
        const walletAddress = form.walletAddress.value;

        try {
            const response = await fetch(
                `/api/balance?currency=${currency.toUpperCase()}&address=${walletAddress}`
            );

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setWorth(data.result);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-slate-900">
            <main className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-sm">
                {error !== null && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">1{error}</div>
                )}

                <h1 className="text-2xl font-bold text-slate-800 mb-4">Wallet Value</h1>
                <p className="text-slate-600 mb-6">Enter your wallet address to find out its current value.</p>

                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Currency</label>
                        <select name="currency" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="SOL">Solana (SOL)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Wallet Address</label>
                        <input
                            name="walletAddress"
                            type="text"
                            placeholder="like: 0x123...abc"
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-950 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:bg-slate-400"
                    >
                        {loading ? "Checking..." : "Check Value"}
                    </button>
                </form>
                {worth !== null && (
                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Current Worth</h2>
                        <div className="text-4xl font-black text-blue-900">
                            {worth}
                            <span className="text-lg ml-2 text-slate-400 font-medium font-sans italic">USD</span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
