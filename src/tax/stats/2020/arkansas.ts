import { Jurisdiction } from '../..';

const arkansas: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 2200,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.9
      },
      {
        bracket: 4299,
        rate: 2.5
      },
      {
        bracket: 8500,
        rate: 3.5
      },
      {
        bracket: 12699,
        rate: 4.5
      },
      {
        bracket: 21199,
        rate: 6
      },
      {
        bracket: 35100,
        rate: 6.9
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 4400,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.9
      },
      {
        bracket: 4299,
        rate: 2.5
      },
      {
        bracket: 8500,
        rate: 3.5
      },
      {
        bracket: 12699,
        rate: 4.5
      },
      {
        bracket: 21199,
        rate: 6
      },
      {
        bracket: 35100,
        rate: 6.9
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 2200,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.9
      },
      {
        bracket: 4299,
        rate: 2.5
      },
      {
        bracket: 8500,
        rate: 3.5
      },
      {
        bracket: 12699,
        rate: 4.5
      },
      {
        bracket: 21199,
        rate: 6
      },
      {
        bracket: 35100,
        rate: 6.9
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 2200,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 0.9
      },
      {
        bracket: 4299,
        rate: 2.5
      },
      {
        bracket: 8500,
        rate: 3.5
      },
      {
        bracket: 12699,
        rate: 4.5
      },
      {
        bracket: 21199,
        rate: 6
      },
      {
        bracket: 35100,
        rate: 6.9
      }
    ]
  }
};

export default arkansas;
