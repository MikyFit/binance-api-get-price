const axios = require('axios');

// Get current tokens prices from api.binance.com
const get_binance_pair_price = async (pair) => {
    const api = `https://api.binance.com/api/v3/ticker/price?symbol=${pair}`
    const response = await axios.get(api)

    return response.data
}

// Main func
(async () => {
    try {
        console.log('==>Get Real-time Crypto Prices using Axios and Binance API');
        // Reading current token prices from api.binance.com
        const BTCUSDT = await get_binance_pair_price("BTCUSDT")
        const btcPrice = parseFloat(BTCUSDT['price'])

        console.log('BTC Price:', '$' + btcPrice,)
        console.log('==>Scraping from Binance API finished');
        console.log('');

        // Closing app
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})();

