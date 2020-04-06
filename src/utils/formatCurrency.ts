const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

export default function formatCurrency(amount: string | number): string {
  const input = Number(amount);

  if (Number.isNaN(input)) {
    throw new Error('Amount is not a valid number');
  }

  return formatter.format(input);
}
