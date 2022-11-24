"use strict";
exports.__esModule = true;
exports.POOL = exports.EPOCH_START = exports.POOL_EXIT_LOCKUP_EPOCHS = exports.DAO_EXIT_LOCKUP_EPOCHS = exports.COUPON_EXPIRATION = exports.GOVERNANCE_PROPOSAL_THRESHOLD = exports.GOVERNANCE_QUORUM = exports.MAX_UINT256 = void 0;
var bignumber_js_1 = require("bignumber.js");
// eslint-disable-next-line import/prefer-default-export
exports.MAX_UINT256 = new bignumber_js_1["default"](2).pow(256).minus(1);
exports.GOVERNANCE_QUORUM = new bignumber_js_1["default"]('0.20');
exports.GOVERNANCE_PROPOSAL_THRESHOLD = new bignumber_js_1["default"]('0.005');
exports.COUPON_EXPIRATION = 8640;
exports.DAO_EXIT_LOCKUP_EPOCHS = 240;
exports.POOL_EXIT_LOCKUP_EPOCHS = 144;
exports.EPOCH_START = 1667790000;
exports.POOL = '0x87033b47CA6AFa615Af89281240BB32DF5de3dEA';
