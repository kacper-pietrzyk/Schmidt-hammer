const calculateMFactor = lowestStrength => {
  if (lowestStrength >= 20) return 4;
  else if (lowestStrength >= 16) return 3;
  else if (lowestStrength >= 12) return 2;
  else return 1;
}

export {
  calculateMFactor
};