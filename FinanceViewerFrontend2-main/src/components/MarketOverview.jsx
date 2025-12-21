'use client';

import { useState } from 'react';
import CryptoCard from './CryptoCard';
import CryptoModal from './CryptoModal';

export default function MarketOverview({ coins }) {
    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleCardClick = (coin) => setSelectedCoin(coin);
    const handleCloseModal = () => setSelectedCoin(null);

    return (
        <>
            <div className="grid grid-cols-2 gap-4 w-full">
                {coins.map((coin) => (
                    <CryptoCard key={coin.id} coin={coin} onClick={handleCardClick} />
                ))}
            </div>

            {selectedCoin && (
                <CryptoModal coin={selectedCoin} onClose={handleCloseModal} />
            )}
        </>
    );
}
