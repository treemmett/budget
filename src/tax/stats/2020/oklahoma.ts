import { Jurisdiction } from '../..';

const oklahoma: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 6350,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.5
      },
      {
        bracket: 1000,
        rate: 1
      },
      {
        bracket: 2500,
        rate: 2
      },
      {
        bracket: 3750,
        rate: 3
      },
      {
        bracket: 4900,
        rate: 4
      },
      {
        bracket: 7200,
        rate: 5
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 12700,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.5
      },
      {
        bracket: 2000,
        rate: 1
      },
      {
        bracket: 5000,
        rate: 2
      },
      {
        bracket: 7500,
        rate: 3
      },
      {
        bracket: 9800,
        rate: 4
      },
      {
        bracket: 12200,
        rate: 5
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 6350,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.5
      },
      {
        bracket: 1000,
        rate: 1
      },
      {
        bracket: 2500,
        rate: 2
      },
      {
        bracket: 3750,
        rate: 3
      },
      {
        bracket: 4900,
        rate: 4
      },
      {
        bracket: 7200,
        rate: 5
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 12700,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.5
      },
      {
        bracket: 1000,
        rate: 1
      },
      {
        bracket: 2500,
        rate: 2
      },
      {
        bracket: 3750,
        rate: 3
      },
      {
        bracket: 4900,
        rate: 4
      },
      {
        bracket: 12200,
        rate: 5
      }
    ]
  }
};

export default oklahoma;
