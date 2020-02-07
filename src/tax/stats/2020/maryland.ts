import { Jurisdiction } from '../..';

const maryland: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2250,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 1000,
        rate: 3
      },
      {
        bracket: 2000,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 4.75
      },
      {
        bracket: 100000,
        rate: 5
      },
      {
        bracket: 125000,
        rate: 5.25
      },
      {
        bracket: 150000,
        rate: 5.5
      },
      {
        bracket: 250000,
        rate: 5.75
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 4550,
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
        rate: 3
      },
      {
        bracket: 2000,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 4.75
      },
      {
        bracket: 150000,
        rate: 5
      },
      {
        bracket: 175000,
        rate: 5.25
      },
      {
        bracket: 225000,
        rate: 5.5
      },
      {
        bracket: 300000,
        rate: 5.75
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 4550,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 1000,
        rate: 3
      },
      {
        bracket: 2000,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 4.75
      },
      {
        bracket: 100000,
        rate: 5
      },
      {
        bracket: 125000,
        rate: 5.25
      },
      {
        bracket: 150000,
        rate: 5.5
      },
      {
        bracket: 250000,
        rate: 5.75
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 2000,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 1000,
        rate: 3
      },
      {
        bracket: 2000,
        rate: 4
      },
      {
        bracket: 3000,
        rate: 4.75
      },
      {
        bracket: 150000,
        rate: 5
      },
      {
        bracket: 175000,
        rate: 5.25
      },
      {
        bracket: 225000,
        rate: 5.5
      },
      {
        bracket: 300000,
        rate: 5.75
      }
    ]
  }
};

export default maryland;
