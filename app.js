// npm i discord.js
// npm i dotenv
// npm i node-binance-api
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var dc = require("./dcBot");
require('dotenv').config();
var Binance = require('node-binance-api');
run();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        function howMuch() {
            return __awaiter(this, void 0, void 0, function () {
                var howManyTrades;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            howManyTrades = balanceUSDT / (minSize * price);
                            if (!(howManyTrades >= 2.1)) return [3 /*break*/, 6];
                            return [4 /*yield*/, dc.sendMSG('Current balance: ' + balanceUSDT + ' usdt')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, buy(minSize)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, dc.sendMSG('Bought for ' + minSize * price + " usd" + " At: " + previousDay.priceChangePercent)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, binance.balance()];
                        case 4:
                            newBalance = _a.sent();
                            return [4 /*yield*/, dc.sendMSG('Balance left: ' + Number(newBalance.USDT.available).toFixed(1) + " usd")];
                        case 5:
                            _a.sent();
                            console.log('Gonna run again after 25hours');
                            setTimeout(run, 90000000); // runs after 25 hours
                            _a.label = 6;
                        case 6:
                            if (!(howManyTrades >= 1.05 && howManyTrades < 2.1)) return [3 /*break*/, 13];
                            return [4 /*yield*/, dc.sendMSG('Current balance: ' + balanceUSDT)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, buy(minSize)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, dc.sendMSG('Bought for ' + 10 * price + " usd" + " At: " + previousDay.priceChangePercent)];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, dc.sendMSG('Deposit more funds')];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, binance.balance()];
                        case 11:
                            newBalance = _a.sent();
                            return [4 /*yield*/, dc.sendMSG('Balance is: ' + Number(newBalance.USDT.available).toFixed(1) + " usd")];
                        case 12:
                            _a.sent();
                            console.log('Gonna run again after 25hours');
                            setTimeout(run, 90000000); // runs after 25 hours
                            _a.label = 13;
                        case 13:
                            if (!(howManyTrades < 1.05)) return [3 /*break*/, 15];
                            return [4 /*yield*/, dc.sendMSG('Not enough balance to make a PURCHASE, Current balance: ' + balanceUSDT)];
                        case 14:
                            _a.sent();
                            console.log('NOT ENOUGH BALANCE, Gonna run again after 5 hours');
                            setTimeout(run, 3600000 * 5); // runs after 5 hours
                            _a.label = 15;
                        case 15: return [2 /*return*/];
                    }
                });
            });
        }
        function buy(quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            _b = (_a = console).info;
                            return [4 /*yield*/, binance.marketBuy("ADAUSDT", quantity)];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _c.sent();
                            console.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var binance, minSize, newBalance, balance, balanceUSDT, previousDay, today, time, ticker, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    binance = new Binance().options({
                        APIKEY: process.env.APIKEY,
                        APISECRET: process.env.APISECRET
                    });
                    minSize = 10;
                    newBalance = '';
                    return [4 /*yield*/, binance.balance()];
                case 1:
                    balance = _a.sent();
                    balanceUSDT = Number(balance.USDT.available).toFixed(1);
                    return [4 /*yield*/, binance.prevDay("ADAUSDT")];
                case 2:
                    previousDay = _a.sent();
                    today = new Date();
                    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    return [4 /*yield*/, binance.prices()];
                case 3:
                    ticker = _a.sent();
                    price = Number(ticker.ADAUSDT).toFixed(1);
                    if (previousDay.priceChangePercent <= -20) {
                        howMuch();
                    }
                    else {
                        console.log('Gonna run again after 30mins - Current change: ' + previousDay.priceChangePercent + " - " + time);
                        setTimeout(run, 1800000); // runs after 30mins
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=app.js.map