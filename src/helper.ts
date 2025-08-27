export async function getTotalTVL() {
  return 13000;
}

export async function getPrice(symbol: string) {
  if (symbol == "ETH") return 4200;
  if (symbol == "USDC") return 1;
  if (symbol == "USDT") return 1;
  return 0;
}
