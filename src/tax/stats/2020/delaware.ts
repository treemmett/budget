import { Jurisdiction } from '../..';

const delaware: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 3250,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2000,
        rate: 2.2
      },
      {
        bracket: 5000,
        rate: 3.9
      },
      {
        bracket: 10000,
        rate: 4.8
      },
      {
        bracket: 20000,
        rate: 5.2
      },
      {
        bracket: 25000,
        rate: 5.55
      },
      {
        bracket: 60000,
        rate: 6.6
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 6500,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2000,
        rate: 2.2
      },
      {
        bracket: 5000,
        rate: 3.9
      },
      {
        bracket: 10000,
        rate: 4.8
      },
      {
        bracket: 20000,
        rate: 5.2
      },
      {
        bracket: 25000,
        rate: 5.55
      },
      {
        bracket: 60000,
        rate: 6.6
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 3250,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2000,
        rate: 2.2
      },
      {
        bracket: 5000,
        rate: 3.9
      },
      {
        bracket: 10000,
        rate: 4.8
      },
      {
        bracket: 20000,
        rate: 5.2
      },
      {
        bracket: 25000,
        rate: 5.55
      },
      {
        bracket: 60000,
        rate: 6.6
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 3250,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2000,
        rate: 2.2
      },
      {
        bracket: 5000,
        rate: 3.9
      },
      {
        bracket: 10000,
        rate: 4.8
      },
      {
        bracket: 20000,
        rate: 5.2
      },
      {
        bracket: 25000,
        rate: 5.55
      },
      {
        bracket: 60000,
        rate: 6.6
      }
    ]
  }
};

export default delaware;
