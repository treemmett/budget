import type { Jurisdiction } from '../..';

const maryland: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 1000,
        rate: 3,
      },
      {
        bracket: 2000,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 4.75,
      },
      {
        bracket: 150000,
        rate: 5,
      },
      {
        bracket: 175000,
        rate: 5.25,
      },
      {
        bracket: 225000,
        rate: 5.5,
      },
      {
        bracket: 300000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 2000,
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
        bracket: 1000,
        rate: 3,
      },
      {
        bracket: 2000,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 4.75,
      },
      {
        bracket: 150000,
        rate: 5,
      },
      {
        bracket: 175000,
        rate: 5.25,
      },
      {
        bracket: 225000,
        rate: 5.5,
      },
      {
        bracket: 300000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 4550,
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
        bracket: 1000,
        rate: 3,
      },
      {
        bracket: 2000,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 4.75,
      },
      {
        bracket: 100000,
        rate: 5,
      },
      {
        bracket: 125000,
        rate: 5.25,
      },
      {
        bracket: 150000,
        rate: 5.5,
      },
      {
        bracket: 250000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 4550,
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
        bracket: 1000,
        rate: 3,
      },
      {
        bracket: 2000,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 4.75,
      },
      {
        bracket: 100000,
        rate: 5,
      },
      {
        bracket: 125000,
        rate: 5.25,
      },
      {
        bracket: 150000,
        rate: 5.5,
      },
      {
        bracket: 250000,
        rate: 5.75,
      },
    ],
    deductions: [
      {
        amount: 2250,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default maryland;
