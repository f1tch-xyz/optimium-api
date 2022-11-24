import { getInstantaneousPrice, getTotalTVL } from "./services/stats";

const express = require("express");
const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`);
});

app.get("/api/stats", async (req: any, res: any) => {

  await Promise.all([getInstantaneousPrice(), getTotalTVL()]).then((values) => {
    res.send({
      tPrice: values[0],
      totalTVL: values[1],
    });
  });
});
