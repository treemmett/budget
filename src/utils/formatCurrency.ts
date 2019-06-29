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

export default formatCurrency;
