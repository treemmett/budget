import { Jurisdiction } from '../..';

const montana: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 4580,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1
      },
      {
        bracket: 3000,
        rate: 2
      },
      {
        bracket: 5200,
        rate: 3
      },
      {
        bracket: 8000,
        rate: 4
      },
      {
        bracket: 10800,
        rate: 5
      },
      {
        bracket: 13900,
        rate: 6
      },
      {
        bracket: 17900,
        rate: 6.9
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 9160,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1
      },
      {
        bracket: 3000,
        rate: 2
      },
      {
        bracket: 5200,
        rate: 3
      },
      {
        bracket: 8000,
        rate: 4
      },
      {
        bracket: 10800,
        rate: 5
      },
      {
        bracket: 13900,
        rate: 6
      },
      {
        bracket: 17900,
        rate: 6.9
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 4580,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1
      },
      {
        bracket: 3000,
        rate: 2
      },
      {
        bracket: 5200,
        rate: 3
      },
      {
        bracket: 8000,
        rate: 4
      },
      {
        bracket: 10800,
        rate: 5
      },
      {
        bracket: 13900,
        rate: 6
      },
      {
        bracket: 17900,
        rate: 6.9
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 9160,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1
      },
      {
        bracket: 3000,
        rate: 2
      },
      {
        bracket: 5200,
        rate: 3
      },
      {
        bracket: 8000,
        rate: 4
      },
      {
        bracket: 10800,
        rate: 5
      },
      {
        bracket: 13900,
        rate: 6
      },
      {
        bracket: 17900,
        rate: 6.9
      }
    ]
  }
};

export default montana;
