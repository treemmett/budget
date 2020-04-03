import { Jurisdiction } from '../..';

const kentucky: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 5,
      },
    ],
    deductions: [
      {
        amount: 2650,
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
    ],
    deductions: [
      {
        amount: 2650,
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
    ],
    deductions: [
      {
        amount: 2650,
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
    ],
    deductions: [
      {
        amount: 2650,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default kentucky;
