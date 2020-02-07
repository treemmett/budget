import { Jurisdiction } from '../..';

const westVirginia: Jurisdiction = {
  single: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 10000,
        rate: 4
      },
      {
        bracket: 25000,
        rate: 4.5
      },
      {
        bracket: 40000,
        rate: 6
      },
      {
        bracket: 60000,
        rate: 6.5
      }
    ]
  },
  married: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 10000,
        rate: 4
      },
      {
        bracket: 25000,
        rate: 4.5
      },
      {
        bracket: 40000,
        rate: 6
      },
      {
        bracket: 60000,
        rate: 6.5
      }
    ]
  },
  marriedSeparately: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 5000,
        rate: 4
      },
      {
        bracket: 12500,
        rate: 4.5
      },
      {
        bracket: 20000,
        rate: 6
      },
      {
        bracket: 30000,
        rate: 6.5
      }
    ]
  },
  headOfHousehold: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 3
      },
      {
        bracket: 10000,
        rate: 4
      },
      {
        bracket: 25000,
        rate: 4.5
      },
      {
        bracket: 40000,
        rate: 6
      },
      {
        bracket: 60000,
        rate: 6.5
      }
    ]
  }
};

export default westVirginia;
