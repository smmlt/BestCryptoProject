import Link from 'next/link';
import MarketOverview from '@/components/MarketOverview';
import { fetchCryptos } from "@/app/api/gecko/marketOverviewerAPI";

export default async function Home({ searchParams }) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const coinData = await fetchCryptos(currentPage);
    const hasNextPage = coinData.length === 4;

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-slate-900">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-20 px-8 bg-white shadow-sm sm:items-start border-x border-gray-100">

                <section className="w-full mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-blue-950 mb-2">
                        Finance Viewer
                    </h1>
                    <h3 className="text-lg text-slate-500 font-medium">
                        Analyze. Track. Invest.
                    </h3>
                </section>

                <div className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 p-6 mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                        Market Overview
                    </h4>

                    {coinData.length === 0 ? (
                        <p className="text-center text-slate-400 py-8">
                            No more coins available
                        </p>
                    ) : (
                        <MarketOverview coins={coinData} />
                    )}
                </div>

                <div className="flex items-center gap-4 mb-16">
                    {currentPage > 1 ? (
                        <Link
                            href={`/?page=${currentPage - 1}`}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            Back
                        </Link>
                    ) : (
                        <span className="px-4 py-2 text-sm text-slate-300 border border-slate-100 rounded-lg cursor-not-allowed">
                            Back
                        </span>
                    )}

                    <span className="text-sm font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-md">
                        Page {currentPage}
                    </span>

                    {hasNextPage ? (
                        <Link
                            href={`/?page=${currentPage + 1}`}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            Next
                        </Link>
                    ) : (
                        <span className="px-4 py-2 text-sm text-slate-300 border border-slate-100 rounded-lg cursor-not-allowed">
                            Next
                        </span>
                    )}
                </div>

                <section className="w-full pt-8 border-t border-slate-100 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        Find out how much your crypto wallet is worth!
                    </h2>
                    <Link href="/wallet">
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-blue-950 px-8 font-medium text-white transition-all hover:bg-slate-800 active:scale-95">
                            <span>FIND OUT NOW</span>
                        </button>
                    </Link>
                </section>

            </main>
        </div>
    );
}
