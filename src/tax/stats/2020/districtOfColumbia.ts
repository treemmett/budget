import { Jurisdiction } from '../..';

const districtOfColumbia: Jurisdiction = {
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
        rate: 4
      },
      {
        bracket: 10000,
        rate: 6
      },
      {
        bracket: 40000,
        rate: 6.5
      },
      {
        bracket: 60000,
        rate: 8.5
      },
      {
        bracket: 350000,
        rate: 8.75
      },
      {
        bracket: 1000000,
        rate: 8.95
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
        rate: 4
      },
      {
        bracket: 10000,
        rate: 6
      },
      {
        bracket: 40000,
        rate: 6.5
      },
      {
        bracket: 60000,
        rate: 8.5
      },
      {
        bracket: 350000,
        rate: 8.75
      },
      {
        bracket: 1000000,
        rate: 8.95
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
        rate: 4
      },
      {
        bracket: 10000,
        rate: 6
      },
      {
        bracket: 40000,
        rate: 6.5
      },
      {
        bracket: 60000,
        rate: 8.5
      },
      {
        bracket: 350000,
        rate: 8.75
      },
      {
        bracket: 1000000,
        rate: 8.95
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
        rate: 4
      },
      {
        bracket: 10000,
        rate: 6
      },
      {
        bracket: 40000,
        rate: 6.5
      },
      {
        bracket: 60000,
        rate: 8.5
      },
      {
        bracket: 350000,
        rate: 8.75
      },
      {
        bracket: 1000000,
        rate: 8.95
      }
    ]
  }
};

export default districtOfColumbia;
