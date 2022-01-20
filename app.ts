const schedule = require('node-schedule');
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
    if(previousDay.priceChangePercent <= -10){
        howMuch();
    }   else {
        console.log('Gonna run again after 1 hour - Current change: ' + previousDay.priceChangePercent + " - " + time)
        setTimeout(run, 3600000) // runs after 1 hour
    }
    
    async function howMuch(){
        let howManyTrades = balanceUSDT / minSize;
        if(howManyTrades >= 2){
            await dc.sendMSG('Current balance: ' + balanceUSDT + ' usdt')
            await buy(10)
            await dc.sendMSG('Bought for 10 usdt');
            newBalance = await binance.balance();
            await dc.sendMSG('Balance left: ' + Number(newBalance.USDT.available).toFixed(1) + " usd");
            console.log('Gonna run again after 25hours')
            setTimeout(run, 90000000) // runs after 25 hours
        }
        if(howManyTrades >= 1 && howManyTrades < 2) {
            await dc.sendMSG('Current balance: ' + balanceUSDT)
            await buy(balanceUSDT)
            await dc.sendMSG('Bought for ' + balanceUSDT + " usd")
            newBalance = await binance.balance();
            await dc.sendMSG('Balance is: ' + Number(newBalance.USDT.available).toFixed(1) + " usd"); 
            console.log('Gonna run again after 25hours')
            setTimeout(run, 90000000) // runs after 25 hours
        }
        if(howManyTrades < 1){
            await dc.sendMSG('Not enough balance to make a PURCHASE, Current balance: ' + balanceUSDT)
            console.log('NOT ENOUGH BALANCE, Gonna run again after 25hours')
            setTimeout(run, 90000000) // runs after 25 hours
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
