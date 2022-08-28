import type { Jurisdiction } from '../..';

const virginia: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 3000,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 5,
      },
      {
        bracket: 17000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 4500,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 3000,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 5,
      },
      {
        bracket: 17000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 9000,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 3000,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 5,
      },
      {
        bracket: 17000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 4500,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 3000,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 5,
      },
      {
        bracket: 17000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 4500,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default virginia;
