import { Jurisdiction } from '../..';

const minnesota: Jurisdiction = {
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
        rate: 5.35
      },
      {
        bracket: 25891,
        rate: 7.05
      },
      {
        bracket: 85061,
        rate: 7.85
      },
      {
        bracket: 160020,
        rate: 9.85
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
        rate: 5.35
      },
      {
        bracket: 37851,
        rate: 7.05
      },
      {
        bracket: 150381,
        rate: 7.85
      },
      {
        bracket: 266700,
        rate: 9.85
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
        rate: 5.35
      },
      {
        bracket: 18931,
        rate: 7.05
      },
      {
        bracket: 75191,
        rate: 7.85
      },
      {
        bracket: 133350,
        rate: 9.85
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
        rate: 5.35
      },
      {
        bracket: 31881,
        rate: 7.05
      },
      {
        bracket: 128091,
        rate: 7.85
      },
      {
        bracket: 213360,
        rate: 9.85
      }
    ]
  }
};

export default minnesota;
