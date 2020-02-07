import { Jurisdiction } from '../..';

const mississippi: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2300,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 4
      },
      {
        bracket: 10000,
        rate: 5
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 4600,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 4
      },
      {
        bracket: 10000,
        rate: 5
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 2300,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 4
      },
      {
        bracket: 10000,
        rate: 5
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 3400,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 4
      },
      {
        bracket: 10000,
        rate: 5
      }
    ]
  }
};

export default mississippi;
