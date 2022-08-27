import { Jurisdiction } from '../..';

const northDakota: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1.1,
      },
      {
        bracket: 51850,
        rate: 2.04,
      },
      {
        bracket: 133850,
        rate: 2.27,
      },
      {
        bracket: 216700,
        rate: 2.64,
      },
      {
        bracket: 424950,
        rate: 2.9,
      },
    ],
    deductions: [],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 1.1,
      },
      {
        bracket: 64650,
        rate: 2.04,
      },
      {
        bracket: 156150,
        rate: 2.27,
      },
      {
        bracket: 237950,
        rate: 2.64,
      },
      {
        bracket: 424950,
        rate: 2.9,
      },
    ],
    deductions: [],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 1.1,
      },
      {
        bracket: 32325,
        rate: 2.04,
      },
      {
        bracket: 78075,
        rate: 2.27,
      },
      {
        bracket: 118975,
        rate: 2.64,
      },
      {
        bracket: 212475,
        rate: 2.9,
      },
    ],
    deductions: [],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 1.1,
      },
      {
        bracket: 38700,
        rate: 2.04,
      },
      {
        bracket: 93700,
        rate: 2.27,
      },
      {
        bracket: 195450,
        rate: 2.64,
      },
      {
        bracket: 424950,
        rate: 2.9,
      },
    ],
    deductions: [],
  },
};

export default northDakota;
