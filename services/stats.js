"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getPoolTotalClaimable = exports.getPoolTotalRewarded = exports.getPoolTotalBonded = exports.getPoolBalanceOfClaimable = exports.getPoolBalanceOfRewarded = exports.getPoolBalanceOfStaged = exports.getPoolBalanceOfBonded = exports.getPoolStatusOf = exports.getToken0 = exports.getInstantaneousPrice = exports.getThreeCRVPrice = exports.getReserves = exports.getProceeds = exports.getCost = exports.getAllRegulations = exports.getAllProposals = exports.getCouponEpochs = exports.getPool = exports.getImplementation = exports.getCouponPremium = exports.getBatchCouponsExpiration = exports.getCouponsExpiration = exports.getOutstandingCoupons = exports.getBatchBalanceOfCouponsUnderlying = exports.getBalanceOfCouponsUnderlying = exports.getBatchBalanceOfCoupons = exports.getBalanceOfCoupons = exports.getRecordedVote = exports.getIsInitialized = exports.getPeriodFor = exports.getStartFor = exports.getRejectFor = exports.getApproveFor = exports.getTotalBondedAt = exports.getTotalStaged = exports.getTotalBonded = exports.getTotalCouponsUnderlying = exports.getTotalCoupons = exports.getTotalRedeemable = exports.getTotalDebt = exports.getEpochTime = exports.getEpoch = exports.getLockedUntil = exports.getFluidUntil = exports.getStatusOf = exports.getBalanceOfStaged = exports.getBalanceBonded = exports.getTokenAllowance = exports.getTokenTotalSupply = exports.getTokenBalance = void 0;
exports.getTotalTVL = exports.getPoolTVL = exports.getForgeTVL = exports.getPoolYield = exports.getForgeYield = exports.getPoolFluidUntil = void 0;
var contracts_1 = require("../constants/contracts");
var tokens_1 = require("../constants/tokens");
var number_1 = require("../utils/number");
var utils_1 = require("ethers/lib/utils");
var bignumber_js_1 = require("bignumber.js");
var values_1 = require("../constants/values");
var dotenv = require("dotenv");
dotenv.config();
var fs = require("fs");
var Web3 = require("web3"); // https://www.npmjs.com/package/web3
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(process.env.ALCHEMY_URL));
var titanium = JSON.parse(fs.readFileSync("./abi/titanium.json"));
var titaniumAbi = titanium.abi;
var metaPool = JSON.parse(fs.readFileSync("./abi/metaPool.json"));
var metaPoolAbi = metaPool.abi;
var dao = JSON.parse(fs.readFileSync("./abi/dao.json"));
var daoAbi = dao.abi;
var curve = JSON.parse(fs.readFileSync("./abi/curve.json"));
var curveAbi = curve.abi;
var uniswapV2Router02 = JSON.parse(fs.readFileSync("./abi/uniswapV2Router02.json"));
var uniswapRouterAbi = dao.abi;
var pool = JSON.parse(fs.readFileSync("./abi/pool.json"));
var poolAbi = pool.abi;
var getTokenBalance = function (token, account) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenContract;
    return __generator(this, function (_a) {
        if (account === "")
            return [2 /*return*/, "0"];
        tokenContract = new web3.eth.Contract(titaniumAbi, token, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, tokenContract.methods
                .balanceOf(account)
                .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" })];
    });
}); };
exports.getTokenBalance = getTokenBalance;
var getTokenTotalSupply = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenContract;
    return __generator(this, function (_a) {
        tokenContract = new web3.eth.Contract(titaniumAbi, token, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, tokenContract.methods
                .totalSupply()
                .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" })];
    });
}); };
exports.getTokenTotalSupply = getTokenTotalSupply;
/**
 *
 * @param {string} token
 * @param {string} account
 * @param {string} spender
 * @return {Promise<string>}
 */
var getTokenAllowance = function (token, account, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenContract;
    return __generator(this, function (_a) {
        tokenContract = new web3.eth.Contract(metaPoolAbi, token, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, tokenContract.allowance(account, spender)];
    });
}); };
exports.getTokenAllowance = getTokenAllowance;
// Døllar Protocol
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getBalanceBonded = function (dao, account) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        if (account === "")
            return [2 /*return*/, "0"];
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.balanceOfBonded(account)];
    });
}); };
exports.getBalanceBonded = getBalanceBonded;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getBalanceOfStaged = function (dao, account) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.balanceOfStaged(account)];
    });
}); };
exports.getBalanceOfStaged = getBalanceOfStaged;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getStatusOf = function (dao, account) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.statusOf(account)];
    });
}); };
exports.getStatusOf = getStatusOf;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getFluidUntil = function (dao, account) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.fluidUntil(account)];
    });
}); };
exports.getFluidUntil = getFluidUntil;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getLockedUntil = function (dao, account) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.lockedUntil(account)];
    });
}); };
exports.getLockedUntil = getLockedUntil;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getEpoch = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.epoch()];
    });
}); };
exports.getEpoch = getEpoch;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getEpochTime = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.epochTime()];
    });
}); };
exports.getEpochTime = getEpochTime;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getTotalDebt = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.totalDebt()];
    });
}); };
exports.getTotalDebt = getTotalDebt;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getTotalRedeemable = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.totalRedeemable()];
    });
}); };
exports.getTotalRedeemable = getTotalRedeemable;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getTotalCoupons = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.totalCoupons()];
    });
}); };
exports.getTotalCoupons = getTotalCoupons;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getTotalCouponsUnderlying = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.totalCouponUnderlying()];
    });
}); };
exports.getTotalCouponsUnderlying = getTotalCouponsUnderlying;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getTotalBonded = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods
                .totalBonded()
                .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" })];
    });
}); };
exports.getTotalBonded = getTotalBonded;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getTotalStaged = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.totalStaged()];
    });
}); };
exports.getTotalStaged = getTotalStaged;
/**
 *
 * @param {string} dao address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
var getTotalBondedAt = function (dao, epoch) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.totalBondedAt(epoch)];
    });
}); };
exports.getTotalBondedAt = getTotalBondedAt;
/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
var getApproveFor = function (dao, candidate) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.approveFor(candidate)];
    });
}); };
exports.getApproveFor = getApproveFor;
/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
var getRejectFor = function (dao, candidate) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.rejectFor(candidate)];
    });
}); };
exports.getRejectFor = getRejectFor;
/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
var getStartFor = function (dao, candidate) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.startFor(candidate)];
    });
}); };
exports.getStartFor = getStartFor;
/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
var getPeriodFor = function (dao, candidate) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.periodFor(candidate)];
    });
}); };
exports.getPeriodFor = getPeriodFor;
/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<boolean>}
 */
var getIsInitialized = function (dao, candidate) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.isInitialized(candidate)];
    });
}); };
exports.getIsInitialized = getIsInitialized;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
var getRecordedVote = function (dao, account, candidate) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.recordedVote(account, candidate)];
    });
}); };
exports.getRecordedVote = getRecordedVote;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
var getBalanceOfCoupons = function (dao, account, epoch) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.balanceOfCoupons(account, epoch)];
    });
}); };
exports.getBalanceOfCoupons = getBalanceOfCoupons;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number[]} epochs number[]
 * @return {Promise<string[]>}
 */
var getBatchBalanceOfCoupons = function (dao, account, epochs) { return __awaiter(void 0, void 0, void 0, function () {
    var calls;
    return __generator(this, function (_a) {
        calls = epochs.map(function (epoch) {
            return (0, exports.getBalanceOfCoupons)(dao, account, epoch);
        });
        return [2 /*return*/, Promise.all(calls)];
    });
}); };
exports.getBatchBalanceOfCoupons = getBatchBalanceOfCoupons;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
var getBalanceOfCouponsUnderlying = function (dao, account, epoch) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.balanceOfCouponUnderlying(account, epoch)];
    });
}); };
exports.getBalanceOfCouponsUnderlying = getBalanceOfCouponsUnderlying;
/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number[]} epochs number[]
 * @return {Promise<string[]>}
 */
var getBatchBalanceOfCouponsUnderlying = function (dao, account, epochs) { return __awaiter(void 0, void 0, void 0, function () {
    var calls;
    return __generator(this, function (_a) {
        calls = epochs.map(function (epoch) {
            return (0, exports.getBalanceOfCouponsUnderlying)(dao, account, epoch);
        });
        return [2 /*return*/, Promise.all(calls)];
    });
}); };
exports.getBatchBalanceOfCouponsUnderlying = getBatchBalanceOfCouponsUnderlying;
/**
 *
 * @param {string} dao address
 * @param {number} epoch address
 * @return {Promise<string>}
 */
var getOutstandingCoupons = function (dao, epoch) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.outstandingCoupons(epoch)];
    });
}); };
exports.getOutstandingCoupons = getOutstandingCoupons;
/**
 *
 * @param {string} dao address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
var getCouponsExpiration = function (dao, epoch) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.couponsExpiration(epoch)];
    });
}); };
exports.getCouponsExpiration = getCouponsExpiration;
/**
 *
 * @param {string} dao address
 * @param {number[]} epochs number[]
 * @return {Promise<string[]>}
 */
var getBatchCouponsExpiration = function (dao, epochs) { return __awaiter(void 0, void 0, void 0, function () {
    var calls;
    return __generator(this, function (_a) {
        calls = epochs.map(function (epoch) { return (0, exports.getCouponsExpiration)(dao, epoch); });
        return [2 /*return*/, Promise.all(calls)];
    });
}); };
exports.getBatchCouponsExpiration = getBatchCouponsExpiration;
/**
 *
 * @param {string} dao address
 * @param {string|BigNumber} amount uint256
 * @return {Promise<string>}
 */
var getCouponPremium = function (dao, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.couponPremium(new bignumber_js_1["default"](amount))];
    });
}); };
exports.getCouponPremium = getCouponPremium;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getImplementation = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.implementation()];
    });
}); };
exports.getImplementation = getImplementation;
/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
var getPool = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract;
    return __generator(this, function (_a) {
        daoContract = new web3.eth.Contract(daoAbi, dao, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, daoContract.methods.pool()];
    });
}); };
exports.getPool = getPool;
/**
 *
 * @param {string} dao
 * @param {string} account
 * @return {Promise<any[]>}
 */
var getCouponEpochs = function (dao, account) { return __awaiter(void 0, void 0, void 0, function () {
    var provider, daoContract, blockNumber, purchaseP, transferP, _a, bought, given, events, couponEpochs;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                provider = {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                };
                daoContract = new web3.eth.Contract(daoAbi, dao, provider);
                blockNumber = 16022755;
                purchaseP = daoContract.getPastEvents("CouponPurchase", {
                    fromBlock: blockNumber
                });
                transferP = daoContract.getPastEvents("CouponTransfer", {
                    fromBlock: blockNumber
                });
                return [4 /*yield*/, Promise.all([purchaseP, transferP])];
            case 1:
                _a = _b.sent(), bought = _a[0], given = _a[1];
                events = bought
                    .map(function (e) { return ({
                    account: e.args.account,
                    epoch: e.args.epoch,
                    amount: e.args.couponAmount
                }); })
                    .concat(given.map(function (e) { return ({
                    account: e.args.account,
                    epoch: e.args.epoch,
                    amount: 0
                }); }));
                couponEpochs = __spreadArray([], events
                    .reduce(function (map, event) {
                    var account = event.account, epoch = event.epoch, amount = event.amount;
                    var prev = map.get(epoch);
                    if (prev) {
                        map.set(epoch, {
                            account: account,
                            epoch: epoch,
                            coupons: prev.coupons.add(amount)
                        });
                    }
                    else {
                        map.set(epoch, { account: account, epoch: epoch, coupons: amount });
                    }
                    return map;
                }, new Map())
                    .values(), true);
                return [2 /*return*/, couponEpochs.sort(function (a, b) { return a - b; })];
        }
    });
}); };
exports.getCouponEpochs = getCouponEpochs;
/**
 *
 * @param {string} dao
 * @return {Promise<any[]>}
 */
var getAllProposals = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var daoContract, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                daoContract = new web3.eth.Contract(daoAbi, dao, {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                return [4 /*yield*/, daoContract.methods.getPastEvents("Proposal", {
                        fromBlock: 0
                    })];
            case 1:
                payload = (_a.sent()).map(function (event) {
                    var prop = event.returnValues;
                    prop.blockNumber = event.blockNumber;
                    return prop;
                });
                return [2 /*return*/, payload.sort(function (a, b) { return b.blockNumber - a.blockNumber; })];
        }
    });
}); };
exports.getAllProposals = getAllProposals;
/**
 *
 * @param {string} dao
 * @return {Promise<any[]>}
 */
var getAllRegulations = function (dao) { return __awaiter(void 0, void 0, void 0, function () {
    var provider, daoContract, block, blockNumber, increaseP, decreaseP, neutralP, _a, increase, decrease, neutral, events;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                provider = {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                };
                daoContract = new web3.eth.Contract(daoAbi, dao, provider);
                return [4 /*yield*/, web3.eth.getBlockNumber().then(function (block) { return block; })];
            case 1:
                block = _b.sent();
                blockNumber = block - 10000;
                increaseP = daoContract.getPastEvents("SupplyIncrease", {
                    fromBlock: blockNumber,
                    toBlock: block
                });
                decreaseP = daoContract.getPastEvents("SupplyDecrease", {
                    fromBlock: blockNumber,
                    toBlock: block
                });
                neutralP = daoContract.getPastEvents("SupplyNeutral", {
                    fromBlock: blockNumber,
                    toBlock: block
                });
                return [4 /*yield*/, Promise.all([
                        increaseP,
                        decreaseP,
                        neutralP,
                    ])];
            case 2:
                _a = _b.sent(), increase = _a[0], decrease = _a[1], neutral = _a[2];
                events = increase
                    .map(function (e) { return ({ type: "INCREASE", data: e.returnValues }); })
                    .concat(decrease.map(function (e) { return ({
                    type: "DECREASE",
                    data: e.returnValues
                }); }))
                    .concat(neutral.map(function (e) { return ({
                    type: "NEUTRAL",
                    data: e.returnValues
                }); }));
                return [2 /*return*/, events.sort(function (a, b) { var _a, _b; return ((_a = b.data) === null || _a === void 0 ? void 0 : _a.epoch) - ((_b = a.data) === null || _b === void 0 ? void 0 : _b.epoch); })];
        }
    });
}); };
exports.getAllRegulations = getAllRegulations;
// Uniswap Protocol
var getCost = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var exchange, _a, inputAmount, _;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                exchange = new web3.eth.Contract(contracts_1.UniswapV2Router02, uniswapRouterAbi, {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                return [4 /*yield*/, exchange.getAmountsIn(new bignumber_js_1["default"](amount).toFixed(), [tokens_1.USDC.addr, tokens_1.ESD.addr])];
            case 1:
                _a = _b.sent(), inputAmount = _a[0], _ = _a[1];
                return [2 /*return*/, inputAmount];
        }
    });
}); };
exports.getCost = getCost;
var getProceeds = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var exchange, _a, _, outputAmount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                exchange = new web3.eth.Contract(contracts_1.UniswapV2Router02, uniswapRouterAbi, {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                return [4 /*yield*/, exchange.getAmountsOut(new bignumber_js_1["default"](amount).toFixed(), [tokens_1.ESD.addr, tokens_1.USDC.addr])];
            case 1:
                _a = _b.sent(), _ = _a[0], outputAmount = _a[1];
                return [2 /*return*/, outputAmount];
        }
    });
}); };
exports.getProceeds = getProceeds;
var getReserves = function () { return __awaiter(void 0, void 0, void 0, function () {
    var exchange, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exchange = new web3.eth.Contract(curveAbi, tokens_1.UNI.addr, {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exchange.methods
                        .get_balances()
                        .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getReserves = getReserves;
var getThreeCRVPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var threePool, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                threePool = new web3.eth.Contract(metaPoolAbi, "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7", {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, threePool.methods
                        .get_virtual_price()
                        .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getThreeCRVPrice = getThreeCRVPrice;
var getInstantaneousPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var exchange, threePool, _a, threeCRVPrice, TPrice, price, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                exchange = new web3.eth.Contract(metaPoolAbi, tokens_1.UNI.addr, {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                threePool = new web3.eth.Contract(metaPoolAbi, "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7", {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all([
                        threePool.methods
                            .get_virtual_price()
                            .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" }),
                        exchange.methods
                            .get_dy(0, 1, (0, utils_1.parseEther)("1"))
                            .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" }),
                    ])];
            case 2:
                _a = _b.sent(), threeCRVPrice = _a[0], TPrice = _a[1];
                price = (0, number_1.formatBN)((0, number_1.toTokenUnitsBN)(threeCRVPrice, tokens_1.USDC.decimals).multipliedBy((0, number_1.toTokenUnitsBN)(TPrice, tokens_1.USDC.decimals)), 8);
                return [2 /*return*/, price];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getInstantaneousPrice = getInstantaneousPrice;
var getToken0 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var exchange;
    return __generator(this, function (_a) {
        exchange = new web3.eth.Contract(tokens_1.UNI.addr, metaPoolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, exchange.coins(0)];
    });
}); };
exports.getToken0 = getToken0;
// Pool
var getPoolStatusOf = function (pool, account) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.statusOf(account)];
    });
}); };
exports.getPoolStatusOf = getPoolStatusOf;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolBalanceOfBonded = function (pool, account) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        if (account === "")
            return [2 /*return*/, "0"];
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.balanceOfBonded(account)];
    });
}); };
exports.getPoolBalanceOfBonded = getPoolBalanceOfBonded;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolBalanceOfStaged = function (pool, account) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.balanceOfStaged(account)];
    });
}); };
exports.getPoolBalanceOfStaged = getPoolBalanceOfStaged;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolBalanceOfRewarded = function (pool, account) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        if (account === "")
            return [2 /*return*/, "0"];
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.balanceOfRewarded(account)];
    });
}); };
exports.getPoolBalanceOfRewarded = getPoolBalanceOfRewarded;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolBalanceOfClaimable = function (pool, account) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.balanceOfClaimable(account)];
    });
}); };
exports.getPoolBalanceOfClaimable = getPoolBalanceOfClaimable;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolTotalBonded = function (pool) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.totalBonded()];
    });
}); };
exports.getPoolTotalBonded = getPoolTotalBonded;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolTotalRewarded = function (pool) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.totalRewarded()];
    });
}); };
exports.getPoolTotalRewarded = getPoolTotalRewarded;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolTotalClaimable = function (pool) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract;
    return __generator(this, function (_a) {
        poolContract = new web3.eth.Contract(pool, poolAbi, {
            from: web3.eth.defaultAccount,
            gasPrice: "13837084066"
        });
        return [2 /*return*/, poolContract.totalClaimable()];
    });
}); };
exports.getPoolTotalClaimable = getPoolTotalClaimable;
/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
var getPoolFluidUntil = function (pool, account) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract, fluidUntil;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                poolContract = new web3.eth.Contract(pool, poolAbi, {
                    from: web3.eth.defaultAccount,
                    gasPrice: "13837084066"
                });
                return [4 /*yield*/, poolContract.fluidUntil(account)];
            case 1:
                fluidUntil = _a.sent();
                return [2 /*return*/, fluidUntil.toString()];
        }
    });
}); };
exports.getPoolFluidUntil = getPoolFluidUntil;
var getForgeYield = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, totalBonded, totalSupply;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    (0, exports.getTotalBonded)(tokens_1.ESDS.addr),
                    (0, exports.getTokenTotalSupply)(tokens_1.ESD.addr),
                ])];
            case 1:
                _a = _b.sent(), totalBonded = _a[0], totalSupply = _a[1];
                return [2 /*return*/, new bignumber_js_1["default"](0.005)
                        .div(new bignumber_js_1["default"](totalBonded.toString()).div(new bignumber_js_1["default"](totalSupply.toString())))
                        .times(100)];
        }
    });
}); };
exports.getForgeYield = getForgeYield;
var getPoolYield = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tPrice, regs, tvl;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    (0, exports.getInstantaneousPrice)(),
                    (0, exports.getAllRegulations)(tokens_1.ESDS.addr),
                    (0, exports.getPoolTVL)(),
                ])];
            case 1:
                _a = _d.sent(), tPrice = _a[0], regs = _a[1], tvl = _a[2];
                if ((_b = regs[0].data) === null || _b === void 0 ? void 0 : _b.newBonded) {
                    return [2 /*return*/, new bignumber_js_1["default"]((_c = regs[0].data) === null || _c === void 0 ? void 0 : _c.newBonded)
                            .div(tvl)
                            .times(tPrice)
                            .times(100)];
                }
                else {
                    return [2 /*return*/, (0, number_1.formatBN)(new bignumber_js_1["default"](0), 2)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getPoolYield = getPoolYield;
var getForgeTVL = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, totalBonded, price;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    (0, exports.getTotalBonded)(tokens_1.ESDS.addr),
                    (0, exports.getInstantaneousPrice)(),
                ])];
            case 1:
                _a = _b.sent(), totalBonded = _a[0], price = _a[1];
                return [2 /*return*/, new bignumber_js_1["default"]((0, utils_1.formatEther)(totalBonded))
                        .times(new bignumber_js_1["default"](price))
                        .toFixed()];
        }
    });
}); };
exports.getForgeTVL = getForgeTVL;
var getPoolTVL = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reserves, threeCRVPrice, price, totalLpPool, totalLpSupply;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    (0, exports.getReserves)(),
                    (0, exports.getThreeCRVPrice)(),
                    (0, exports.getInstantaneousPrice)(),
                    (0, exports.getTokenBalance)(tokens_1.UNI.addr, values_1.POOL),
                    (0, exports.getTokenTotalSupply)(tokens_1.UNI.addr),
                ])];
            case 1:
                _a = _b.sent(), reserves = _a[0], threeCRVPrice = _a[1], price = _a[2], totalLpPool = _a[3], totalLpSupply = _a[4];
                return [2 /*return*/, new bignumber_js_1["default"]((0, utils_1.formatEther)(reserves[0]))
                        .times(price)
                        .plus(new bignumber_js_1["default"]((0, utils_1.formatEther)(reserves[1])).times(new bignumber_js_1["default"]((0, utils_1.formatEther)(threeCRVPrice))))
                        .div((0, utils_1.formatEther)(totalLpSupply))
                        .times((0, utils_1.formatEther)(totalLpPool))
                        .toFixed()];
        }
    });
}); };
exports.getPoolTVL = getPoolTVL;
var getTotalTVL = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, forgeTotal, poolTotal;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    (0, exports.getForgeTVL)(),
                    (0, exports.getPoolTVL)(),
                ])];
            case 1:
                _a = _b.sent(), forgeTotal = _a[0], poolTotal = _a[1];
                return [2 /*return*/, (0, number_1.formatBN)(new bignumber_js_1["default"](forgeTotal).plus(poolTotal), 2)];
        }
    });
}); };
exports.getTotalTVL = getTotalTVL;
