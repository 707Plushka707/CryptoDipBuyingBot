run();
async function run() {
    require ('dotenv').config();
    const Binance = require('node-binance-api');
    const binance = new Binance().options({
        APIKEY: process.env.APIKEY,
        APISECRET: process.env.APISECRET,
        useServerTime: true,
        recvWindow: 60000,
        verbose: true,
});
    let minSize = 10;

    let balance = await binance.balance();
    let balanceUSDT : any = Number(balance.USDT.available).toFixed(1)

    let previousDay = await binance.prevDay("ADAUSDT")
    
    if(previousDay.priceChangePercent <= -10){
        howMuch();
    }
    

    function howMuch(){
        let howManyTrades = balanceUSDT / minSize;
        if(howManyTrades >= 2){
            // buy(10)
            console.log('Buy for 10')
            console.log('Balance left: ', balanceUSDT - 10)
        }
        if(howManyTrades >= 1 && howManyTrades < 2) {
            // buy(balanceUSDT)
            console.log('Buy forr ' + balanceUSDT)
        }
    }

    async function buy(quantity){
        try {
            console.info(binance.marketBuy("ADAUSDT", quantity))
        }   catch(error) {
            console.error(error)
        }
    }
}
