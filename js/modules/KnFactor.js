const calculateKnFactor = neff => {
  const value = neff + 1;
  if (value < 20) {
    return 0.00001042 * Math.pow(value, 4) - 0.00073958 * Math.pow(value, 3) + 0.01964583 * Math.pow(value, 2) - 0.24391667 * value + 3.03;
  } else if (value <= 30) {
    return -0.003 * value + 1.82;
  } else return 1.73;
}

export {
  calculateKnFactor
};