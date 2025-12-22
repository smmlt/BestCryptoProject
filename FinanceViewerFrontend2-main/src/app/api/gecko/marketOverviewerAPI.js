'use server';

export const fetchCryptos = async (page, sortKey = 'market_cap_desc') => {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=4&page=${page}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        throw new Error('Error fetching crypto data');
    }

    const coins = await res.json();

    return sortCoins(coins, sortKey);
};

const sortCoins = (coins, sortKey) => {
    const sorted = [...coins];

    switch (sortKey) {
        case 'market_cap_desc':
            return sorted.sort((a, b) => b.market_cap - a.market_cap);

        case 'price_desc':
            return sorted.sort((a, b) => b.current_price - a.current_price);

        case 'high_24h':
            return sorted.sort((a, b) => b.high_24h - a.high_24h);

        case 'low_24h':
            return sorted.sort((a, b) => a.low_24h - b.low_24h);

        default:
            return sorted;
    }
};

