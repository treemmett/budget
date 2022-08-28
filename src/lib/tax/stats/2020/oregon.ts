import type { Jurisdiction } from '../..';

const oregon: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 5,
      },
      {
        bracket: 6800,
        rate: 7,
      },
      {
        bracket: 17000,
        rate: 9,
      },
      {
        bracket: 250000,
        rate: 9.9,
      },
    ],
    deductions: [
      {
        amount: 3655,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 5,
      },
      {
        bracket: 6800,
        rate: 7,
      },
      {
        bracket: 17000,
        rate: 9,
      },
      {
        bracket: 250000,
        rate: 9.9,
      },
    ],
    deductions: [
      {
        amount: 4545,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 5,
      },
      {
        bracket: 3400,
        rate: 7,
      },
      {
        bracket: 8500,
        rate: 9,
      },
      {
        bracket: 125000,
        rate: 9.9,
      },
    ],
    deductions: [
      {
        amount: 2270,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 5,
      },
      {
        bracket: 3400,
        rate: 7,
      },
      {
        bracket: 8500,
        rate: 9,
      },
      {
        bracket: 125000,
        rate: 9.9,
      },
    ],
    deductions: [
      {
        amount: 2270,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default oregon;
