import { Jurisdiction } from '../..';

const louisiana: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 12500,
        rate: 4,
      },
      {
        bracket: 50000,
        rate: 6,
      },
    ],
    deductions: [],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 25000,
        rate: 4,
      },
      {
        bracket: 100000,
        rate: 6,
      },
    ],
    deductions: [],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 12500,
        rate: 4,
      },
      {
        bracket: 50000,
        rate: 6,
      },
    ],
    deductions: [],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 2,
      },
      {
        bracket: 12500,
        rate: 4,
      },
      {
        bracket: 50000,
        rate: 6,
      },
    ],
    deductions: [],
  },
};

export default louisiana;
