import { Jurisdiction } from '../..';

const kentucky: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2650,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 2650,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 2650,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 2650,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      }
    ]
  }
};

export default kentucky;
