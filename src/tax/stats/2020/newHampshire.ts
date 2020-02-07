import { Jurisdiction } from '../..';

const newHampshire: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2400,
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
        amount: 4800,
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
        amount: 2400,
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
        amount: 2400,
        name: 'Standard Deduction (Head of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      }
    ]
  }
};

export default newHampshire;
