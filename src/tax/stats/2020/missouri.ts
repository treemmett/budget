import { Jurisdiction } from '../..';

const missouri: Jurisdiction = {
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
        rate: 0
      },
      {
        bracket: 103,
        rate: 1.5
      },
      {
        bracket: 1028,
        rate: 2
      },
      {
        bracket: 2056,
        rate: 2.5
      },
      {
        bracket: 3084,
        rate: 3
      },
      {
        bracket: 4113,
        rate: 3.5
      },
      {
        bracket: 5141,
        rate: 4
      },
      {
        bracket: 6169,
        rate: 4.5
      },
      {
        bracket: 7197,
        rate: 5
      },
      {
        bracket: 8225,
        rate: 5.5
      },
      {
        bracket: 9253,
        rate: 5.9
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
        rate: 0
      },
      {
        bracket: 103,
        rate: 1.5
      },
      {
        bracket: 1028,
        rate: 2
      },
      {
        bracket: 2056,
        rate: 2.5
      },
      {
        bracket: 3084,
        rate: 3
      },
      {
        bracket: 4113,
        rate: 3.5
      },
      {
        bracket: 5141,
        rate: 4
      },
      {
        bracket: 6169,
        rate: 4.5
      },
      {
        bracket: 7197,
        rate: 5
      },
      {
        bracket: 8225,
        rate: 5.5
      },
      {
        bracket: 9253,
        rate: 5.9
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
        rate: 0
      },
      {
        bracket: 103,
        rate: 1.5
      },
      {
        bracket: 1028,
        rate: 2
      },
      {
        bracket: 2056,
        rate: 2.5
      },
      {
        bracket: 3084,
        rate: 3
      },
      {
        bracket: 4113,
        rate: 3.5
      },
      {
        bracket: 5141,
        rate: 4
      },
      {
        bracket: 6169,
        rate: 4.5
      },
      {
        bracket: 7197,
        rate: 5
      },
      {
        bracket: 8225,
        rate: 5.5
      },
      {
        bracket: 9253,
        rate: 5.9
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
        rate: 0
      },
      {
        bracket: 103,
        rate: 1.5
      },
      {
        bracket: 1028,
        rate: 2
      },
      {
        bracket: 2056,
        rate: 2.5
      },
      {
        bracket: 3084,
        rate: 3
      },
      {
        bracket: 4113,
        rate: 3.5
      },
      {
        bracket: 5141,
        rate: 4
      },
      {
        bracket: 6169,
        rate: 4.5
      },
      {
        bracket: 7197,
        rate: 5
      },
      {
        bracket: 8225,
        rate: 5.5
      },
      {
        bracket: 9253,
        rate: 5.9
      }
    ]
  }
};

export default missouri;
