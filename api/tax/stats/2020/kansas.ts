import { Jurisdiction } from '../..';

const kansas: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 3.1,
      },
      {
        bracket: 15000,
        rate: 5.25,
      },
      {
        bracket: 30000,
        rate: 5.7,
      },
    ],
    deductions: [
      {
        amount: 3000,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 3.1,
      },
      {
        bracket: 30000,
        rate: 5.25,
      },
      {
        bracket: 60000,
        rate: 5.7,
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
        rate: 3.1,
      },
      {
        bracket: 15000,
        rate: 5.25,
      },
      {
        bracket: 30000,
        rate: 5.7,
      },
    ],
    deductions: [
      {
        amount: 3000,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 3.1,
      },
      {
        bracket: 15000,
        rate: 5.25,
      },
      {
        bracket: 30000,
        rate: 5.7,
      },
    ],
    deductions: [
      {
        amount: 3000,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default kansas;
