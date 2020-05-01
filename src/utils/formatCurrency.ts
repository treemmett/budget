const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

export function toDisplay(cents: number): string {
  if (Number.isNaN(cents)) {
    throw new Error('Amount is not a valid number');
  }

  return formatter.format(Math.floor(cents) / 100);
}

export function toCents(input: string): number {
  if (!input) return 0;

  const num = Number(input.replace(/[^0-9]/g, ''));

  if (Number.isNaN(num)) {
    return 0;
  }

  return num;
}

export default {
  toCents,
  toDisplay,
};
