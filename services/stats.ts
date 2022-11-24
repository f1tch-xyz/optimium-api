import { UniswapV2Router02 } from "../constants/contracts";
import { ESD, ESDS, UNI, USDC } from "../constants/tokens";
import { formatBN, toBaseUnitBN, toTokenUnitsBN } from "../utils/number";
import { formatEther, parseEther } from "ethers/lib/utils";
import BigNumber from "bignumber.js";
import { POOL } from "../constants/values";

let fs = require("fs");
let Web3 = require("web3"); // https://www.npmjs.com/package/web3

let web3 = new Web3();
web3.setProvider(
  new web3.providers.HttpProvider(
    "https://eth-mainnet.g.alchemy.com/v2/A_kmxXLW8oR7ot5VEGBQYpMD9WxyQtHb"
  )
);

let titanium = JSON.parse(fs.readFileSync("./abi/titanium.json"));
let titaniumAbi = titanium.abi;

let metaPool = JSON.parse(fs.readFileSync("./abi/metaPool.json"));
let metaPoolAbi = metaPool.abi;

let dao = JSON.parse(fs.readFileSync("./abi/dao.json"));
let daoAbi = dao.abi;

let curve = JSON.parse(fs.readFileSync("./abi/curve.json"));
let curveAbi = curve.abi;

let uniswapV2Router02 = JSON.parse(
  fs.readFileSync("./abi/uniswapV2Router02.json")
);
let uniswapRouterAbi = dao.abi;

let pool = JSON.parse(fs.readFileSync("./abi/pool.json"));
let poolAbi = pool.abi;

export const getTokenBalance = async (token: any, account: any) => {
  if (account === "") return "0";
  const tokenContract = new web3.eth.Contract(titaniumAbi, token, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  
  return tokenContract.methods
    .balanceOf(account)
    .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" });
};

export const getTokenTotalSupply = async (token: any) => {
  const tokenContract = new web3.eth.Contract(titaniumAbi, token, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return tokenContract.methods
    .totalSupply()
    .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" });
};

/**
 *
 * @param {string} token
 * @param {string} account
 * @param {string} spender
 * @return {Promise<string>}
 */
export const getTokenAllowance = async (
  token: any,
  account: any,
  spender: any
) => {
  const tokenContract = new web3.eth.Contract(metaPoolAbi, token, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return tokenContract.allowance(account, spender);
};

// Døllar Protocol

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getBalanceBonded = async (dao: any, account: any) => {
  if (account === "") return "0";
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.balanceOfBonded(account);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getBalanceOfStaged = async (dao: any, account: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.balanceOfStaged(account);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getStatusOf = async (dao: any, account: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.statusOf(account);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getFluidUntil = async (dao: any, account: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.fluidUntil(account);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getLockedUntil = async (dao: any, account: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.lockedUntil(account);
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getEpoch = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.epoch();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getEpochTime = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.epochTime();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getTotalDebt = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.totalDebt();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getTotalRedeemable = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.totalRedeemable();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getTotalCoupons = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.totalCoupons();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getTotalCouponsUnderlying = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.totalCouponUnderlying();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getTotalBonded = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods
    .totalBonded()
    .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" });
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getTotalStaged = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.totalStaged();
};

/**
 *
 * @param {string} dao address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
export const getTotalBondedAt = async (dao: any, epoch: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.totalBondedAt(epoch);
};

/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
export const getApproveFor = async (dao: any, candidate: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.approveFor(candidate);
};

/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
export const getRejectFor = async (dao: any, candidate: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.rejectFor(candidate);
};

/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
export const getStartFor = async (dao: any, candidate: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.startFor(candidate);
};

/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
export const getPeriodFor = async (dao: any, candidate: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.periodFor(candidate);
};

/**
 *
 * @param {string} dao address
 * @param {string} candidate address
 * @return {Promise<boolean>}
 */
export const getIsInitialized = async (dao: any, candidate: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.isInitialized(candidate);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {string} candidate address
 * @return {Promise<string>}
 */
export const getRecordedVote = async (
  dao: any,
  account: any,
  candidate: any
) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.recordedVote(account, candidate);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
export const getBalanceOfCoupons = async (
  dao: any,
  account: any,
  epoch: any
) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.balanceOfCoupons(account, epoch);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number[]} epochs number[]
 * @return {Promise<string[]>}
 */
export const getBatchBalanceOfCoupons = async (
  dao: any,
  account: any,
  epochs: any
) => {
  const calls = epochs.map((epoch: any) =>
    getBalanceOfCoupons(dao, account, epoch)
  );
  return Promise.all(calls);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
export const getBalanceOfCouponsUnderlying = async (
  dao: any,
  account: any,
  epoch: any
) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.balanceOfCouponUnderlying(account, epoch);
};

/**
 *
 * @param {string} dao address
 * @param {string} account address
 * @param {number[]} epochs number[]
 * @return {Promise<string[]>}
 */
export const getBatchBalanceOfCouponsUnderlying = async (
  dao: any,
  account: any,
  epochs: any
) => {
  const calls = epochs.map((epoch: any) =>
    getBalanceOfCouponsUnderlying(dao, account, epoch)
  );
  return Promise.all(calls);
};

/**
 *
 * @param {string} dao address
 * @param {number} epoch address
 * @return {Promise<string>}
 */
export const getOutstandingCoupons = async (dao: any, epoch: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.outstandingCoupons(epoch);
};

/**
 *
 * @param {string} dao address
 * @param {number} epoch number
 * @return {Promise<string>}
 */
export const getCouponsExpiration = async (dao: any, epoch: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.couponsExpiration(epoch);
};

/**
 *
 * @param {string} dao address
 * @param {number[]} epochs number[]
 * @return {Promise<string[]>}
 */
export const getBatchCouponsExpiration = async (dao: any, epochs: any) => {
  const calls = epochs.map((epoch: any) => getCouponsExpiration(dao, epoch));
  return Promise.all(calls);
};

/**
 *
 * @param {string} dao address
 * @param {string|BigNumber} amount uint256
 * @return {Promise<string>}
 */
export const getCouponPremium = async (dao: any, amount: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.couponPremium(new BigNumber(amount));
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getImplementation = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.implementation();
};

/**
 *
 * @param {string} dao address
 * @return {Promise<string>}
 */
export const getPool = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return daoContract.methods.pool();
};

/**
 *
 * @param {string} dao
 * @param {string} account
 * @return {Promise<any[]>}
 */
export const getCouponEpochs = async (dao: any, account: any) => {
  const provider = {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  };
  const daoContract = new web3.eth.Contract(daoAbi, dao, provider);
  // const block = await provider.getBlockNumber()
  const blockNumber = 16022755;

  const purchaseP = daoContract.getPastEvents("CouponPurchase", {
    fromBlock: blockNumber
  })

  const transferP = daoContract.getPastEvents("CouponTransfer", {
    fromBlock: blockNumber
  })

  const [bought, given] = await Promise.all([purchaseP, transferP]);
  
  const events = bought
    .map((e: any) => ({
      account: e.args.account,
      epoch: e.args.epoch,
      amount: e.args.couponAmount,
    }))
    .concat(
      given.map((e: any) => ({
        account: e.args.account,
        epoch: e.args.epoch,
        amount: 0,
      }))
    );

  const couponEpochs = [
    ...events
      .reduce((map: any, event) => {
        const { account, epoch, amount } = event;
        const prev = map.get(epoch);

        if (prev) {
          map.set(epoch, {
            account,
            epoch,
            coupons: prev.coupons.add(amount),
          });
        } else {
          map.set(epoch, { account, epoch, coupons: amount });
        }

        return map;
      }, new Map())
      .values(),
  ];

  return couponEpochs.sort((a, b) => a - b);
};

/**
 *
 * @param {string} dao
 * @return {Promise<any[]>}
 */
export const getAllProposals = async (dao: any) => {
  const daoContract = new web3.eth.Contract(daoAbi, dao, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  const payload = (
    await daoContract.methods.getPastEvents("Proposal", {
      fromBlock: 0,
    })
  ).map((event: any) => {
    const prop = event.returnValues;
    prop.blockNumber = event.blockNumber;
    return prop;
  });
  return payload.sort((a: any, b: any) => b.blockNumber - a.blockNumber);
};

/**
 *
 * @param {string} dao
 * @return {Promise<any[]>}
 */
export const getAllRegulations = async (dao: any) => {
  const provider = {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  };
  const daoContract = new web3.eth.Contract(daoAbi, dao, provider);
  const block = await web3.eth.getBlockNumber().then((block: any) => block);
  const blockNumber = block - 10000;
  
  const increaseP = daoContract.getPastEvents("SupplyIncrease", {
    fromBlock: blockNumber,
    toBlock: block
  })

  const decreaseP = daoContract.getPastEvents("SupplyDecrease", {
    fromBlock: blockNumber,
    toBlock: block
  })

  const neutralP = daoContract.getPastEvents("SupplyNeutral", {
    fromBlock: blockNumber,
    toBlock: block
  })

  const [increase, decrease, neutral] = await Promise.all([
    increaseP,
    decreaseP,
    neutralP,
  ]);
  
  const events = increase
    .map((e: any) => ({ type: "INCREASE", data: e.returnValues }))
    .concat(
      decrease.map((e: any) => ({
        type: "DECREASE",
        data: e.returnValues,
      }))
    )
    .concat(
      neutral.map((e: any) => ({
        type: "NEUTRAL",
        data: e.returnValues,
      }))
    );

  return events.sort((a, b) => b.data?.epoch - a.data?.epoch);
};

// Uniswap Protocol

export const getCost = async (amount: any) => {
  const exchange = new web3.eth.Contract(UniswapV2Router02, uniswapRouterAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  // eslint-disable-next-line no-unused-vars
  const [inputAmount, _] = await exchange.getAmountsIn(
    new BigNumber(amount).toFixed(),
    [USDC.addr, ESD.addr]
  );

  return inputAmount;
};

export const getProceeds = async (amount: any) => {
  const exchange = new web3.eth.Contract(UniswapV2Router02, uniswapRouterAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  // eslint-disable-next-line no-unused-vars
  const [_, outputAmount] = await exchange.getAmountsOut(
    new BigNumber(amount).toFixed(),
    [ESD.addr, USDC.addr]
  );

  return outputAmount;
};

export const getReserves = async () => {
  const exchange = new web3.eth.Contract(curveAbi, UNI.addr, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  try {
    return await exchange.methods
      .get_balances()
      .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" });
  } catch (error) {
    console.log(error);
  }
};

export const getThreeCRVPrice = async () => {
  const threePool = new web3.eth.Contract(
    metaPoolAbi,
    "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7", {
      from: web3.eth.defaultAccount,
      gasPrice: "13837084066",
    }
  );
  try {
    return await threePool.methods
      .get_virtual_price()
      .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" });
  } catch (error) {
    console.log(error);
  }
};

export const getInstantaneousPrice = async () => {
  const exchange = new web3.eth.Contract(metaPoolAbi, UNI.addr, {
    from: web3.eth.defaultAccount, // default from address
    gasPrice: "13837084066",
  });

  const threePool = new web3.eth.Contract(
    metaPoolAbi,
    "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    {
      from: web3.eth.defaultAccount,
      gasPrice: "13837084066",
    }
  );

  try {
    const [threeCRVPrice, TPrice] = await Promise.all([
      threePool.methods
        .get_virtual_price()
        .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" }),
      exchange.methods
        .get_dy(0, 1, parseEther("1"))
        .call({ from: web3.eth.defaultAccount, gasPrice: "13837084066" }),
    ]);

    const price = formatBN(
      toTokenUnitsBN(threeCRVPrice, USDC.decimals).multipliedBy(
        toTokenUnitsBN(TPrice, USDC.decimals)
      ),
      8
    );

    return price;
  } catch (error) {
    console.log(error);
  }
};

export const getToken0 = async () => {
  const exchange = new web3.eth.Contract(UNI.addr, metaPoolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return exchange.coins(0);
};

// Pool

export const getPoolStatusOf = async (pool: any, account: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.statusOf(account);
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolBalanceOfBonded = async (pool: any, account: any) => {
  if (account === "") return "0";
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.balanceOfBonded(account);
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolBalanceOfStaged = async (pool: any, account: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.balanceOfStaged(account);
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolBalanceOfRewarded = async (pool: any, account: any) => {
  if (account === "") return "0";
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.balanceOfRewarded(account);
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolBalanceOfClaimable = async (pool: any, account: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.balanceOfClaimable(account);
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolTotalBonded = async (pool: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.totalBonded();
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolTotalRewarded = async (pool: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.totalRewarded();
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolTotalClaimable = async (pool: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });
  return poolContract.totalClaimable();
};

/**
 *
 * @param {string} pool address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getPoolFluidUntil = async (pool: any, account: any) => {
  const poolContract = new web3.eth.Contract(pool, poolAbi, {
    from: web3.eth.defaultAccount,
    gasPrice: "13837084066",
  });

  const fluidUntil = await poolContract.fluidUntil(account);

  return fluidUntil.toString();
};

export const getForgeYield = async () => {
  const [totalBonded, totalSupply] = await Promise.all([
    getTotalBonded(ESDS.addr),
    getTokenTotalSupply(ESD.addr),
  ]);

  return new BigNumber(0.005)
    .div(
      new BigNumber(totalBonded.toString()).div(
        new BigNumber(totalSupply.toString())
      )
    )
    .times(100);
};

export const getPoolYield = async () => {
  const [tPrice, regs, tvl]: any = await Promise.all([
    getInstantaneousPrice(),
    getAllRegulations(ESDS.addr),
    getPoolTVL(),
  ]);

  if(regs[0].data?.newBonded) {
    return new BigNumber(regs[0].data?.newBonded)
      .div(tvl)
      .times(tPrice)
      .times(100);
  } else {
    return formatBN(new BigNumber(0), 2);
  }
};

export const getForgeTVL = async () => {
  const [totalBonded, price]: any = await Promise.all([
    getTotalBonded(ESDS.addr),
    getInstantaneousPrice(),
  ]);

  return new BigNumber(formatEther(totalBonded))
    .times(new BigNumber(price as any))
    .toFixed();
};

export const getPoolTVL = async () => {
  const [reserves, threeCRVPrice, price, totalLpPool, totalLpSupply]: any =
    await Promise.all([
      getReserves(),
      getThreeCRVPrice(),
      getInstantaneousPrice(),
      getTokenBalance(UNI.addr, POOL),
      getTokenTotalSupply(UNI.addr),
    ]);

  return new BigNumber(formatEther(reserves[0]))
    .times(price as any)
    .plus(
      new BigNumber(formatEther(reserves[1])).times(
        new BigNumber(formatEther(threeCRVPrice))
      )
    )
    .div(formatEther(totalLpSupply))
    .times(formatEther(totalLpPool))
    .toFixed();
};

export const getTotalTVL = async () => {
  const [forgeTotal, poolTotal]: any = await Promise.all([
    getForgeTVL(),
    getPoolTVL(),
  ]);

  return formatBN(new BigNumber(forgeTotal).plus(poolTotal), 2);
};
