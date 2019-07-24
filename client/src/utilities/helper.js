const formatMoney = (value) => {
  let moneyString;
  value = parseFloat(value);

  if (value < 0) {
    moneyString = '-$';
    value = Math.abs(value);
  } else {
    moneyString = '$';
  }

  return moneyString + value.toFixed(2);
}

export {
  formatMoney
};