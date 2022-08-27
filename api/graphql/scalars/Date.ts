import { GraphQLScalarType, Kind } from 'graphql';

function parseLocalDate(dateString: unknown): Date {
  if (typeof dateString !== 'string') {
    throw new Error('Invalid ISO 8601 date');
  }

  const [year, month, date] = dateString.split('-').map(a => parseInt(a, 10));

  if (month > 12 || month < 1) {
    throw new Error('Month out of range');
  }

  if (date > 31 || date < 1) {
    throw new Error('Date out of range');
  }

  if (year > 2025 || year < 2015) {
    throw new Error('Year out of range');
  }

  const d = new Date(year, month - 1, date);

  if (d instanceof Date && !Number.isNaN(d.getTime())) {
    // set time to 0
    d.setHours(0, 0, 0, 0);

    // check for month overflow
    if (d.getMonth() + 1 !== month) {
      d.setMonth(month, 0);
    }

    return d;
  }

  throw new Error('Invalid ISO 8601 date');
}

const DateScalar = new GraphQLScalarType({
  description: 'ISO 8601 representation of a date without time',
  name: 'Date',
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      return parseLocalDate(ast.value);
    }

    throw new Error('Invalid ISO 8601 date');
  },
  parseValue(value): Date {
    return parseLocalDate(value);
  },
  serialize(value: Date | string): string {
    if (value instanceof Date) {
      return [value.getFullYear(), value.getMonth() + 1, value.getDate()]
        .map(a => a.toString().padStart(2, '0'))
        .join('-');
    }

    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(value);

    if (match) {
      const [, year, month, date] = match;
      return [year, month, date].map(a => a.padStart(2, '0')).join('-');
    }

    const parsedValue = new Date(value);
    return [
      parsedValue.getFullYear(),
      parsedValue.getMonth() + 1,
      parsedValue.getDate(),
    ]
      .map(a => a.toString().padStart(2, '0'))
      .join('-');
  },
});

export default DateScalar;
