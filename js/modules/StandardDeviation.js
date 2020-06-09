// numbers = column of table with data
const calculateStandardDeviation = numbers => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  const average = Number((sum / numbers.length).toFixed(2));
  let numerator = 0;
  for (let i = 0; i < numbers.length; i++) {
    numerator += Math.pow((average - numbers[i]), 2);
  }
  const denominator = numbers.length - 1;
  const standardDeviation = Number((Math.pow((numerator / denominator), 0.5)).toFixed(2));
  return standardDeviation;
}

export { calculateStandardDeviation };