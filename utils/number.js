"use strict";
exports.__esModule = true;
exports.formatMoney = exports.delineate = exports.formatBN = exports.ownership = exports.isPos = exports.toTokenUnitsBN = exports.toBaseUnitBN = void 0;
var bignumber_js_1 = require("bignumber.js");
var utils_1 = require("ethers/lib/utils");
/**
 * Convert 10.999 to 10999000
 */
function toBaseUnitBN(rawAmt, decimals) {
    var raw = new bignumber_js_1.BigNumber(rawAmt);
    var base = new bignumber_js_1.BigNumber(10);
    var decimalsBN = new bignumber_js_1.BigNumber(decimals);
    return raw.times(base.pow(decimalsBN)).integerValue();
}
exports.toBaseUnitBN = toBaseUnitBN;
/**
 * Convert 10999000 to 10.999
 */
var toTokenUnitsBN = function (tokenAmount, tokenDecimals) {
    return new bignumber_js_1.BigNumber((0, utils_1.formatUnits)(tokenAmount, tokenDecimals));
};
exports.toTokenUnitsBN = toTokenUnitsBN;
var isPos = function (amount) {
    return !amount.isZero() && amount.isPositive();
};
exports.isPos = isPos;
var ownership = function (balance, totalSupply) {
    return balance.multipliedBy(new bignumber_js_1.BigNumber(100)).dividedBy(totalSupply);
};
exports.ownership = ownership;
/**
 * BigNumber string formatting
 */
var formatBN = function (amount, position) {
    if (amount.isLessThan(new bignumber_js_1.BigNumber(1))) {
        return pad(amount.precision(position, bignumber_js_1.BigNumber.ROUND_UP).toFixed(), position);
    }
    return delineate(amount.toFixed(position));
};
exports.formatBN = formatBN;
function delineate(bnStr) {
    var parts = bnStr.split('.');
    return (parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1]);
}
exports.delineate = delineate;
function pad(bnStr, position) {
    if (!bnStr.includes('.')) {
        bnStr += '.';
    }
    var parts = bnStr.split('.');
    for (var i = 0; i < position - parts[1].length; i++) {
        bnStr += '0';
    }
    return bnStr;
}
function formatMoney(n) {
    n = n.toPrecision(3);
    return Math.abs(Number(n)) >= 1.0e9
        ? Math.abs(Number(n)) / 1.0e9 + 'B'
        : Math.abs(Number(n)) >= 1.0e6
            ? Math.abs(Number(n)) / 1.0e6 + 'MM'
            : Math.abs(Number(n)) >= 1.0e3
                ? Math.abs(Number(n)) / 1.0e3 + 'K'
                : Math.abs(Number(n));
}
exports.formatMoney = formatMoney;
