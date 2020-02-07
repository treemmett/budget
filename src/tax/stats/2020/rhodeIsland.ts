import { Jurisdiction } from '../..';

const rhodeIsland: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 8750,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.75
      },
      {
        bracket: 62550,
        rate: 4.75
      },
      {
        bracket: 142150,
        rate: 5.99
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 17500,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.75
      },
      {
        bracket: 62550,
        rate: 4.75
      },
      {
        bracket: 142150,
        rate: 5.99
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 8750,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.75
      },
      {
        bracket: 62550,
        rate: 4.75
      },
      {
        bracket: 142150,
        rate: 5.99
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 13100,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 3.75
      },
      {
        bracket: 62550,
        rate: 4.75
      },
      {
        bracket: 142150,
        rate: 5.99
      }
    ]
  }
};

export default rhodeIsland;
