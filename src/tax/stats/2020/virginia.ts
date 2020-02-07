import { Jurisdiction } from '../..';

const virginia: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 4500,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 3000,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 5
      },
      {
        bracket: 17000,
        rate: 5.75
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 9000,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 3000,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 5
      },
      {
        bracket: 17000,
        rate: 5.75
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 4500,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 3000,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 5
      },
      {
        bracket: 17000,
        rate: 5.75
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 4500,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 3000,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 5
      },
      {
        bracket: 17000,
        rate: 5.75
      }
    ]
  }
};

export default virginia;
