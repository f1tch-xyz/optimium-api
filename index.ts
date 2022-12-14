import { getForgeTVL, getForgeYield, getInstantaneousPrice, getPoolTVL, getPoolYield, getTotalTVL } from "./services/stats";

const express = require("express");
const app = express();

app.listen(8000, () => {});

app.get("/stats", async (req: any, res: any) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  await Promise.all([
    getInstantaneousPrice(),
    getTotalTVL(), 
    getForgeYield(), 
    getForgeTVL(), 
    getPoolYield(), 
    getPoolTVL()
  ]).then((values) => {
    res.send({
      tPrice: values[0],
      totalTVL: values[1],
      forgeYield: values[2],
      forgeTvl: values[3],
      poolYield: values[4],
      poolTvl: values[5]
    });
  });
});

module.exports = app;