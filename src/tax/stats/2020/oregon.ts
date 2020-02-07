import { Jurisdiction } from '../..';

const oregon: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2270,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      },
      {
        bracket: 3400,
        rate: 7
      },
      {
        bracket: 8500,
        rate: 9
      },
      {
        bracket: 125000,
        rate: 9.9
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 4545,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      },
      {
        bracket: 6800,
        rate: 7
      },
      {
        bracket: 17000,
        rate: 9
      },
      {
        bracket: 250000,
        rate: 9.9
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 2270,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      },
      {
        bracket: 3400,
        rate: 7
      },
      {
        bracket: 8500,
        rate: 9
      },
      {
        bracket: 125000,
        rate: 9.9
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 3655,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 5
      },
      {
        bracket: 6800,
        rate: 7
      },
      {
        bracket: 17000,
        rate: 9
      },
      {
        bracket: 250000,
        rate: 9.9
      }
    ]
  }
};

export default oregon;
