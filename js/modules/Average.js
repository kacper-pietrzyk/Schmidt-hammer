// numbers = column of table with data
const calculateAverage = numbers => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  const result = Number((sum / numbers.length).toFixed(2));
  return result;
}

export { calculateAverage };