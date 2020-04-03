import { Jurisdiction } from '../..';

const alabama: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 500,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 2500,
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
        rate: 4,
      },
      {
        bracket: 6000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 7500,
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
        bracket: 500,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 2500,
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
        bracket: 500,
        rate: 4,
      },
      {
        bracket: 3000,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 2500,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default alabama;
