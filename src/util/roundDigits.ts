function roundDigits(value: number, digits: number = 1): number {
  const multiplier = Math.pow(10, digits);
  return Math.round(value * multiplier) / multiplier;
}

export default roundDigits;
