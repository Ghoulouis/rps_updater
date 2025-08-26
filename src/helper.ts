export async function getTotalTVL() {
  return 18000;
}

export async function getPrice(symbol: string) {
  if (symbol == "ETH") return 4374;
  if (symbol == "USDC") return 1;
  if (symbol == "USDT") return 1;
  return 0;
}
