// npm i discord.js
// npm i dotenv
// npm i node-binance-api

const dc = require("./dcBot");
require ('dotenv').config();
const Binance = require('node-binance-api');
run();

async function run() {
    const binance = new Binance().options({
        APIKEY: process.env.APIKEY,
        APISECRET: process.env.APISECRET
});
    let minSize = 10;
    let newBalance : any = '';

    let balance = await binance.balance();
    let balanceUSDT : any = Number(balance.USDT.available).toFixed(1)

    let previousDay = await binance.prevDay("ADAUSDT")

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let ticker = await binance.prices();
    let price: any = Number(ticker.ADAUSDT).toFixed(1);

    if(previousDay.priceChangePercent <= -20){
        howMuch();
    }   else {
        console.log('Gonna run again after 30mins - Current change: ' + previousDay.priceChangePercent + " - " + time)
        setTimeout(run, 1800000) // runs after 30mins
    }
    
    async function howMuch(){
        let howManyTrades = balanceUSDT / (minSize * price);
        if(howManyTrades >= 2.1){
            await dc.sendMSG('Current balance: ' + balanceUSDT + ' usdt')
            await buy(minSize)
            await dc.sendMSG('Bought for ' + minSize * price + " usd" + " At: " + previousDay.priceChangePercent)
            newBalance = await binance.balance();
            await dc.sendMSG('Balance left: ' + Number(newBalance.USDT.available).toFixed(1) + " usd");
            console.log('Gonna run again after 25hours')
            setTimeout(run, 90000000) // runs after 25 hours
        }
        if(howManyTrades >= 1.05 && howManyTrades < 2.1) {
            await dc.sendMSG('Current balance: ' + balanceUSDT)
            await buy(minSize)
            await dc.sendMSG('Bought for ' + 10 * price + " usd" + " At: " + previousDay.priceChangePercent)
            await dc.sendMSG('Deposit more funds')
            newBalance = await binance.balance();
            await dc.sendMSG('Balance is: ' + Number(newBalance.USDT.available).toFixed(1) + " usd"); 
            console.log('Gonna run again after 25hours')
            setTimeout(run, 90000000) // runs after 25 hours
        }
        if(howManyTrades < 1.05){
            await dc.sendMSG('Not enough balance to make a PURCHASE, Current balance: ' + balanceUSDT)
            console.log('NOT ENOUGH BALANCE, Gonna run again after 5 hours')
            setTimeout(run, 3600000 * 5) // runs after 5 hours
        }
        
        
    }

        async function buy(quantity){
            try {
                console.info(await binance.marketBuy("ADAUSDT", quantity))
            }   catch(error) {
                console.error(error)
            }
        }
    }
