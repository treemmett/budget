import { Jurisdiction } from '../..';

const iowa: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2110,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.36
      },
      {
        bracket: 1573,
        rate: 0.72
      },
      {
        bracket: 3146,
        rate: 2.43
      },
      {
        bracket: 6292,
        rate: 4.5
      },
      {
        bracket: 14157,
        rate: 6.12
      },
      {
        bracket: 23595,
        rate: 6.48
      },
      {
        bracket: 31460,
        rate: 6.8
      },
      {
        bracket: 47190,
        rate: 7.92
      },
      {
        bracket: 70785,
        rate: 8.98
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 5210,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.36
      },
      {
        bracket: 1573,
        rate: 0.72
      },
      {
        bracket: 3146,
        rate: 2.43
      },
      {
        bracket: 6292,
        rate: 4.5
      },
      {
        bracket: 14157,
        rate: 6.12
      },
      {
        bracket: 23595,
        rate: 6.48
      },
      {
        bracket: 31460,
        rate: 6.8
      },
      {
        bracket: 47190,
        rate: 7.92
      },
      {
        bracket: 70785,
        rate: 8.98
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 2110,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.36
      },
      {
        bracket: 1573,
        rate: 0.72
      },
      {
        bracket: 3146,
        rate: 2.43
      },
      {
        bracket: 6292,
        rate: 4.5
      },
      {
        bracket: 14157,
        rate: 6.12
      },
      {
        bracket: 23595,
        rate: 6.48
      },
      {
        bracket: 31460,
        rate: 6.8
      },
      {
        bracket: 47190,
        rate: 7.92
      },
      {
        bracket: 70785,
        rate: 8.98
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 2110,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.36
      },
      {
        bracket: 1573,
        rate: 0.72
      },
      {
        bracket: 3146,
        rate: 2.43
      },
      {
        bracket: 6292,
        rate: 4.5
      },
      {
        bracket: 14157,
        rate: 6.12
      },
      {
        bracket: 23595,
        rate: 6.48
      },
      {
        bracket: 31460,
        rate: 6.8
      },
      {
        bracket: 47190,
        rate: 7.92
      },
      {
        bracket: 70785,
        rate: 8.98
      }
    ]
  }
};

export default iowa;
