import { Jurisdiction } from '../..';

const newYork: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 8000,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4
      },
      {
        bracket: 8500,
        rate: 4.5
      },
      {
        bracket: 11700,
        rate: 5.25
      },
      {
        bracket: 13900,
        rate: 5.9
      },
      {
        bracket: 21400,
        rate: 6.45
      },
      {
        bracket: 80650,
        rate: 6.65
      },
      {
        bracket: 215400,
        rate: 6.85
      },
      {
        bracket: 1077550,
        rate: 8.82
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 16050,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4
      },
      {
        bracket: 17150,
        rate: 4.5
      },
      {
        bracket: 23600,
        rate: 5.25
      },
      {
        bracket: 27900,
        rate: 5.9
      },
      {
        bracket: 43000,
        rate: 6.45
      },
      {
        bracket: 161550,
        rate: 6.65
      },
      {
        bracket: 323200,
        rate: 6.85
      },
      {
        bracket: 2155350,
        rate: 8.82
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 8000,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4
      },
      {
        bracket: 8500,
        rate: 4.5
      },
      {
        bracket: 11700,
        rate: 5.25
      },
      {
        bracket: 13900,
        rate: 5.9
      },
      {
        bracket: 21400,
        rate: 6.45
      },
      {
        bracket: 80650,
        rate: 6.65
      },
      {
        bracket: 215400,
        rate: 6.85
      },
      {
        bracket: 1077550,
        rate: 8.82
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 11200,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 4
      },
      {
        bracket: 12800,
        rate: 4.5
      },
      {
        bracket: 17650,
        rate: 5.25
      },
      {
        bracket: 20900,
        rate: 5.9
      },
      {
        bracket: 32200,
        rate: 6.45
      },
      {
        bracket: 107650,
        rate: 6.65
      },
      {
        bracket: 269300,
        rate: 6.85
      },
      {
        bracket: 1616450,
        rate: 8.82
      }
    ]
  }
};

export default newYork;
