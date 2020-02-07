import { Jurisdiction } from '../..';

const louisiana: Jurisdiction = {
  single: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 12500,
        rate: 4
      },
      {
        bracket: 50000,
        rate: 6
      }
    ]
  },
  married: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 25000,
        rate: 4
      },
      {
        bracket: 100000,
        rate: 6
      }
    ]
  },
  marriedSeparately: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 12500,
        rate: 4
      },
      {
        bracket: 50000,
        rate: 6
      }
    ]
  },
  headOfHousehold: {
    deductions: [],
    brackets: [
      {
        bracket: 0,
        rate: 2
      },
      {
        bracket: 12500,
        rate: 4
      },
      {
        bracket: 50000,
        rate: 6
      }
    ]
  }
};

export default louisiana;
