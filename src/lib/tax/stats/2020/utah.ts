import type { Jurisdiction } from '../..';

const utah: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 4.95,
      },
    ],
    deductions: [
      {
        amount: 18650,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 4.95,
      },
    ],
    deductions: [
      {
        amount: 24800,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 4.95,
      },
    ],
    deductions: [
      {
        amount: 12200,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 4.95,
      },
    ],
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default utah;
