import { Jurisdiction } from '../..';

const newMexico: Jurisdiction = {
  single: {
    deductions: [
      {
        amount: 12200,
        name: 'Standard Deduction (Single)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1.7
      },
      {
        bracket: 5500,
        rate: 3.2
      },
      {
        bracket: 11000,
        rate: 4.7
      },
      {
        bracket: 16000,
        rate: 4.9
      }
    ]
  },
  married: {
    deductions: [
      {
        amount: 24400,
        name: 'Standard Deduction (Married)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1.7
      },
      {
        bracket: 8000,
        rate: 3.2
      },
      {
        bracket: 16000,
        rate: 4.7
      },
      {
        bracket: 24000,
        rate: 4.9
      }
    ]
  },
  marriedSeparately: {
    deductions: [
      {
        amount: 12200,
        name: 'Standard Deduction (Married Separately)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1.7
      },
      {
        bracket: 4000,
        rate: 3.2
      },
      {
        bracket: 8000,
        rate: 4.7
      },
      {
        bracket: 12000,
        rate: 4.9
      }
    ]
  },
  headOfHousehold: {
    deductions: [
      {
        amount: 18350,
        name: 'Standard Deduction (Head Of Household)'
      }
    ],
    brackets: [
      {
        bracket: 0,
        rate: 1.7
      },
      {
        bracket: 8000,
        rate: 3.2
      },
      {
        bracket: 16000,
        rate: 4.7
      },
      {
        bracket: 24000,
        rate: 4.9
      }
    ]
  }
};

export default newMexico;
