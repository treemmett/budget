import type { Jurisdiction } from '../..';

const montana: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1,
      },
      {
        bracket: 3000,
        rate: 2,
      },
      {
        bracket: 5200,
        rate: 3,
      },
      {
        bracket: 8000,
        rate: 4,
      },
      {
        bracket: 10800,
        rate: 5,
      },
      {
        bracket: 13900,
        rate: 6,
      },
      {
        bracket: 17900,
        rate: 6.9,
      },
    ],
    deductions: [
      {
        amount: 9160,
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
        bracket: 3000,
        rate: 2,
      },
      {
        bracket: 5200,
        rate: 3,
      },
      {
        bracket: 8000,
        rate: 4,
      },
      {
        bracket: 10800,
        rate: 5,
      },
      {
        bracket: 13900,
        rate: 6,
      },
      {
        bracket: 17900,
        rate: 6.9,
      },
    ],
    deductions: [
      {
        amount: 9160,
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
        bracket: 3000,
        rate: 2,
      },
      {
        bracket: 5200,
        rate: 3,
      },
      {
        bracket: 8000,
        rate: 4,
      },
      {
        bracket: 10800,
        rate: 5,
      },
      {
        bracket: 13900,
        rate: 6,
      },
      {
        bracket: 17900,
        rate: 6.9,
      },
    ],
    deductions: [
      {
        amount: 4580,
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
        bracket: 3000,
        rate: 2,
      },
      {
        bracket: 5200,
        rate: 3,
      },
      {
        bracket: 8000,
        rate: 4,
      },
      {
        bracket: 10800,
        rate: 5,
      },
      {
        bracket: 13900,
        rate: 6,
      },
      {
        bracket: 17900,
        rate: 6.9,
      },
    ],
    deductions: [
      {
        amount: 4580,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default montana;
