import { Jurisdiction } from '../..';

const maine: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 12000,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.8
      },
      {
        bracket: 21450,
        rate: 6.75
      },
      {
        bracket: 50750,
        rate: 7.15
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 24000,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.8
      },
      {
        bracket: 42900,
        rate: 6.75
      },
      {
        bracket: 101550,
        rate: 7.15
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 12000,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.8
      },
      {
        bracket: 21450,
        rate: 6.75
      },
      {
        bracket: 50750,
        rate: 7.15
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 18000,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5.8
      },
      {
        bracket: 32150,
        rate: 6.75
      },
      {
        bracket: 76150,
        rate: 7.15
      }
    ]
  }
};

export default maine;
