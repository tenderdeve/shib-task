export const quantityPercentage = (quantity: number, total_supply: number) => {
  const ans = (quantity / total_supply) * 100;
  return ans;
};
