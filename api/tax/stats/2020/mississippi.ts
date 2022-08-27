import { Jurisdiction } from '../..';

const mississippi: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 3400,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 4600,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 2300,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 2300,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default mississippi;
