import { Jurisdiction } from '../..';

const kansas: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 3000,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.1
      },
      {
        bracket: 15000,
        rate: 5.25
      },
      {
        bracket: 30000,
        rate: 5.7
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
        rate: 3.1
      },
      {
        bracket: 30000,
        rate: 5.25
      },
      {
        bracket: 60000,
        rate: 5.7
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 3000,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.1
      },
      {
        bracket: 15000,
        rate: 5.25
      },
      {
        bracket: 30000,
        rate: 5.7
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 3000,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.1
      },
      {
        bracket: 15000,
        rate: 5.25
      },
      {
        bracket: 30000,
        rate: 5.7
      }
    ]
  }
};

export default kansas;
