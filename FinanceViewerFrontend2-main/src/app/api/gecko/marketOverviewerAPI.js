'use server';

const PER_PAGE = 4;

export const fetchCryptos = async (page) => {
    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${PER_PAGE}&page=${page}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            console.error('CoinGecko error:', res.status);
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        return [];
    }
};
