import { Jurisdiction } from '../..';

const alabama: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2500,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 500,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 5
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 7500,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 1000,
        rate: 4
      },
      {
        bracket: 6000,
        rate: 5
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 2500,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 500,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 5
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 2500,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 500,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 5
      }
    ]
  }
};

export default alabama;
