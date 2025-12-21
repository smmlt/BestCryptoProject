const apiURL = process.env.NEXT_PUBLIC_BALANCE_API_URL;
export async function fetchBalance(walletAddress, currency) {
    if(!walletAddress || !currency) {
        throw new Error('Missing required parameters: walletAddress and currency');
    }

    try {
        const fullURL = `${apiURL}/balance?currency=${currency}&address=${walletAddress}`;

        const response = await fetch(fullURL, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}