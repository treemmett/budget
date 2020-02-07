import { Jurisdiction } from '../..';

const southCarolina: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2970,
        rate: 3
      },
      {
        bracket: 5940,
        rate: 4
      },
      {
        bracket: 8910,
        rate: 5
      },
      {
        bracket: 11880,
        rate: 6
      },
      {
        bracket: 14860,
        rate: 7
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 24800,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2970,
        rate: 3
      },
      {
        bracket: 5940,
        rate: 4
      },
      {
        bracket: 8910,
        rate: 5
      },
      {
        bracket: 11880,
        rate: 6
      },
      {
        bracket: 14860,
        rate: 7
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2970,
        rate: 3
      },
      {
        bracket: 5940,
        rate: 4
      },
      {
        bracket: 8910,
        rate: 5
      },
      {
        bracket: 11880,
        rate: 6
      },
      {
        bracket: 14860,
        rate: 7
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 18650,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0
      },
      {
        bracket: 2970,
        rate: 3
      },
      {
        bracket: 5940,
        rate: 4
      },
      {
        bracket: 8910,
        rate: 5
      },
      {
        bracket: 11880,
        rate: 6
      },
      {
        bracket: 14860,
        rate: 7
      }
    ]
  }
};

export default southCarolina;
