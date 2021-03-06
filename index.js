const axios = require('axios');
const fs = require("fs/promises");

// Date
const d = Math.round(+new Date() / 1000)
const date = new Date(parseInt(d) * 1000)

yyyy = date.getFullYear(),
    mm = ('0' + (date.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ('0' + date.getDate()).slice(-2), // Add leading 0.
    hh = ('0' + date.getHours()).slice(-2),
    min = ('0' + date.getMinutes()).slice(-2), // Add leading 0.
    ss = ('0' + date.getSeconds()).slice(-2), // Add leading 0.

    formatdate = yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + min + ':' + ss;
fnamedate = yyyy + mm + dd + '_' + hh + min + ss;


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

        const ethUSDT = await get_binance_pair_price("ETHUSDT")
        const ethPrice = parseFloat(ethUSDT['price'])

        const FTMUSDT = await get_binance_pair_price("FTMUSDT")
        const ftmPrice = parseFloat(FTMUSDT['price'])

        const BNBUSDT = await get_binance_pair_price("BNBUSDT")
        const bnbPrice = parseFloat(BNBUSDT['price'])

        const AVAXUSDT = await get_binance_pair_price("AVAXUSDT")
        const avaxPrice = parseFloat(AVAXUSDT['price'])

        console.log('BTC Price:', '$' + btcPrice,)
        console.log('ETH Price:', '$' + ethPrice,)
        console.log('FTM Price:', '$' + ftmPrice,)
        console.log('BNB Price:', '$' + bnbPrice,)
        console.log('AVAX Price:', '$' + avaxPrice,)
        console.log('==>Scraping from Binance API finished');
        console.log('');

        await fs.writeFile(`${fnamedate}_prices.csv`, 'Date' + ';' + 'BTC Price' + ';' + 'ETH Price' + ';' + 'FTM Price' + ';' + 'BNB Price' + ';' + 'AVAX Price' + '\n' + formatdate + ';' + btcPrice + ';' + ethPrice + ';' + ftmPrice + ';' + bnbPrice + ';' + avaxPrice, function (err) {
            if (err) throw err;
        });
        // Closing app
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})();

