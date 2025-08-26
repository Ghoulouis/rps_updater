import { formatUnits, parseEther, parseUnits } from "ethers";
import { getPrice, getTotalTVL } from "./helper";

const incentiveToken = {
  symbol: "USDT",
  decimals: 6,
};

const tokens = [
  {
    symbol: "ETH",
    decimals: 18,
  },
  {
    symbol: "USDC",
    decimals: 6,
  },
  {
    symbol: "USDT",
    decimals: 6,
  },
];
let precision = 10n ** 18n;
async function getRpsForToken(apy: number, symbol: string) {
  let token = tokens.find((t) => t.symbol === symbol);

  let price = await getPrice(symbol);
  let priceBigInt = parseUnits(price.toFixed(incentiveToken.decimals), incentiveToken.decimals);

  let apyBigInt = BigInt(apy.toFixed(0));
  let numberUnitOnAToken = parseUnits("1", token?.decimals);
  let reward = (apyBigInt * priceBigInt * precision) / (100n * numberUnitOnAToken);
  let rps = reward / (365n * 24n * 3600n);
  console.log(symbol, rps);
  return rps;
}

async function main() {
  let tvl = await getTotalTVL();
  let apy = 100;
  if (tvl > 20000) {
    apy = (20000 / tvl) * 100;

    console.log("apy", apy);
  }
  let rpsETH = await getRpsForToken(apy, "ETH");
  await getRpsForToken(apy, "USDT");
  let rpsUSDC = await getRpsForToken(apy, "USDC");

  let precision = 10n ** 18n;
  let rewardUSDCInAYear = (rpsUSDC * 365n * 24n * 3600n * 1_000_000n) / precision;
  console.log("reward One USDC In A Year", formatUnits(rewardUSDCInAYear, incentiveToken.decimals));

  let rewardETHInAYear = (rpsETH * 365n * 24n * 3600n * parseEther("1")) / precision;
  console.log("reward One USDC In A Year", formatUnits(rewardETHInAYear, incentiveToken.decimals));
}

main();
