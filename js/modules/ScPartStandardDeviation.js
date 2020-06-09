// numbers = column of table with data
const calculateScPartStandardDeviation = (direct, indirect) => {

  let numerator = 0;
  for (let i = 0; i < direct.length; i++) {
    numerator += Math.pow((direct[i] - indirect[i]), 2);
  }
  const denominator = direct.length - 2;
  const scPart1StandardDeviation = Number((Math.pow((numerator / denominator), 0.5)).toFixed(2));
  const scPart2StandardDeviation = 2;
  const scPartStandardDeviation = Math.max(scPart1StandardDeviation, scPart2StandardDeviation);
  return scPartStandardDeviation;
}

export { calculateScPartStandardDeviation };