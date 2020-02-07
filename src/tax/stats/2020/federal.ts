import { Jurisdiction } from '../..';

const federal: Jurisdiction = {
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
        rate: 10
      },
      {
        bracket: 9875,
        rate: 12
      },
      {
        bracket: 40125,
        rate: 22
      },
      {
        bracket: 85525,
        rate: 24
      },
      {
        bracket: 163300,
        rate: 32
      },
      {
        bracket: 207350,
        rate: 35
      },
      {
        bracket: 510300,
        rate: 37
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
        rate: 10
      },
      {
        bracket: 19750,
        rate: 12
      },
      {
        bracket: 80250,
        rate: 22
      },
      {
        bracket: 171050,
        rate: 24
      },
      {
        bracket: 326600,
        rate: 32
      },
      {
        bracket: 414700,
        rate: 35
      },
      {
        bracket: 622050,
        rate: 37
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Married Filing Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 10
      },
      {
        bracket: 9875,
        rate: 12
      },
      {
        bracket: 40125,
        rate: 22
      },
      {
        bracket: 85525,
        rate: 24
      },
      {
        bracket: 163300,
        rate: 32
      },
      {
        bracket: 207350,
        rate: 35
      },
      {
        bracket: 510300,
        rate: 37
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 18650,
        name: 'Standard Deduction (Head of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 10
      },
      {
        bracket: 19750,
        rate: 12
      },
      {
        bracket: 80250,
        rate: 22
      },
      {
        bracket: 171050,
        rate: 24
      },
      {
        bracket: 326600,
        rate: 32
      },
      {
        bracket: 414700,
        rate: 35
      },
      {
        bracket: 622050,
        rate: 37
      }
    ]
  }
};

export default federal;
