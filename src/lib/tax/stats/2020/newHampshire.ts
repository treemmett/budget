import type { Jurisdiction } from '../..';

const newHampshire: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 0,
      },
    ],
    deductions: [
      {
        amount: 2400,
        name: 'Standard Deduction (Head of Household)',
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
        amount: 4800,
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
        amount: 2400,
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
        amount: 2400,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default newHampshire;
