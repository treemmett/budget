import { Jurisdiction } from '../..';

const northCarolina: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 10000,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.499
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 20000,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.499
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 10000,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.499
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 20000,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.499
      }
    ]
  }
};

export default northCarolina;
