import type { Jurisdiction } from '../..';

const california: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1,
      },
      {
        bracket: 17629,
        rate: 2,
      },
      {
        bracket: 41768,
        rate: 4,
      },
      {
        bracket: 53843,
        rate: 6,
      },
      {
        bracket: 66636,
        rate: 8,
      },
      {
        bracket: 78710,
        rate: 9.3,
      },
      {
        bracket: 401705,
        rate: 10.3,
      },
      {
        bracket: 482047,
        rate: 11.3,
      },
      {
        bracket: 803410,
        rate: 12.3,
      },
      {
        bracket: 1000000,
        rate: 13.3,
      },
    ],
    deductions: [
      {
        amount: 8802,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 1,
      },
      {
        bracket: 17618,
        rate: 2,
      },
      {
        bracket: 41766,
        rate: 4,
      },
      {
        bracket: 65920,
        rate: 6,
      },
      {
        bracket: 91506,
        rate: 8,
      },
      {
        bracket: 115648,
        rate: 9.3,
      },
      {
        bracket: 590746,
        rate: 10.3,
      },
      {
        bracket: 708890,
        rate: 11.3,
      },
      {
        bracket: 1181484,
        rate: 12.3,
      },
      {
        bracket: 2000000,
        rate: 13.3,
      },
    ],
    deductions: [
      {
        amount: 8802,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 1,
      },
      {
        bracket: 8809,
        rate: 2,
      },
      {
        bracket: 20883,
        rate: 4,
      },
      {
        bracket: 32960,
        rate: 6,
      },
      {
        bracket: 45753,
        rate: 8,
      },
      {
        bracket: 57824,
        rate: 9.3,
      },
      {
        bracket: 295373,
        rate: 10.3,
      },
      {
        bracket: 354445,
        rate: 11.3,
      },
      {
        bracket: 590742,
        rate: 12.3,
      },
      {
        bracket: 1000000,
        rate: 13.3,
      },
    ],
    deductions: [
      {
        amount: 4401,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 1,
      },
      {
        bracket: 8809,
        rate: 2,
      },
      {
        bracket: 20883,
        rate: 4,
      },
      {
        bracket: 32960,
        rate: 6,
      },
      {
        bracket: 45753,
        rate: 8,
      },
      {
        bracket: 57824,
        rate: 9.3,
      },
      {
        bracket: 295373,
        rate: 10.3,
      },
      {
        bracket: 354445,
        rate: 11.3,
      },
      {
        bracket: 590742,
        rate: 12.3,
      },
      {
        bracket: 1000000,
        rate: 13.3,
      },
    ],
    deductions: [
      {
        amount: 4401,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default california;
