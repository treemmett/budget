import { Jurisdiction } from '../..';

const georgia: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1,
      },
      {
        bracket: 1000,
        rate: 2,
      },
      {
        bracket: 3000,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 4,
      },
      {
        bracket: 7000,
        rate: 5,
      },
      {
        bracket: 10000,
        rate: 6,
      },
    ],
    deductions: [
      {
        amount: 4600,
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
        bracket: 1000,
        rate: 2,
      },
      {
        bracket: 3000,
        rate: 3,
      },
      {
        bracket: 5000,
        rate: 4,
      },
      {
        bracket: 7000,
        rate: 5,
      },
      {
        bracket: 10000,
        rate: 6,
      },
    ],
    deductions: [
      {
        amount: 6000,
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
        bracket: 750,
        rate: 2,
      },
      {
        bracket: 2250,
        rate: 3,
      },
      {
        bracket: 3750,
        rate: 4,
      },
      {
        bracket: 5250,
        rate: 5,
      },
      {
        bracket: 7000,
        rate: 6,
      },
    ],
    deductions: [
      {
        amount: 4600,
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
        bracket: 750,
        rate: 2,
      },
      {
        bracket: 2250,
        rate: 3,
      },
      {
        bracket: 3750,
        rate: 4,
      },
      {
        bracket: 5250,
        rate: 5,
      },
      {
        bracket: 7000,
        rate: 6,
      },
    ],
    deductions: [
      {
        amount: 4600,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default georgia;
