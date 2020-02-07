import { Jurisdiction } from '../..';

const utah: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4.95
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 24800,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4.95
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 12200,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4.95
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 18650,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4.95
      }
    ]
  }
};

export default utah;
