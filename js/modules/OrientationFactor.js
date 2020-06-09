const calculateOrientationFactor = (angleValue, median) => {
  if (angleValue === 0) {
    return 0;
  } else if (angleValue === 90) {
    return 0.000571 * Math.pow(median, 2) + 0.026286 * median - 5.9;
  } else if (angleValue === 45) {
    return 0.000143 * Math.pow(median, 2) + 0.036571 * median - 4.3;
  } else if (angleValue === -45) {
    return -0.000214 * Math.pow(median, 2) - 0.013857 * median + 2.88;
  } else if (angleValue === -90) {
    return -0.000357 * Math.pow(median, 2) - 0.014429 * median + 3.84;
  }
}

export {
  calculateOrientationFactor
};