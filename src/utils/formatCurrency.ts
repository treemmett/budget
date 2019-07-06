const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

const formatCurrency = (input: string | number): string => {
  const i = input.toString().replace(/\D/gi, '');

  const number = Number(i) / 100;

  return formatter.format(number);
};

export const parseCurrency = (value: string): number => {
  const replaced = value.replace(/[^0-9.]/g, '');
  const firstNumber = parseFloat(replaced);
  if (Number.isNaN(firstNumber)) {
    return 0;
  }
  const trimmed = firstNumber.toFixed(2);
  return parseFloat(trimmed);
};

export default formatCurrency;
