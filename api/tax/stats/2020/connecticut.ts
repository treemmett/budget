import { Jurisdiction } from '../..';

const connecticut: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 16000,
        rate: 5,
      },
      {
        bracket: 80000,
        rate: 5.5,
      },
      {
        bracket: 160000,
        rate: 6,
      },
      {
        bracket: 320000,
        rate: 6.5,
      },
      {
        bracket: 400000,
        rate: 6.9,
      },
      {
        bracket: 800000,
        rate: 6.99,
      },
    ],
    deductions: [],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 20000,
        rate: 5,
      },
      {
        bracket: 100000,
        rate: 5.5,
      },
      {
        bracket: 200000,
        rate: 6,
      },
      {
        bracket: 400000,
        rate: 6.5,
      },
      {
        bracket: 500000,
        rate: 6.9,
      },
      {
        bracket: 1000000,
        rate: 6.99,
      },
    ],
    deductions: [],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 10000,
        rate: 5,
      },
      {
        bracket: 50000,
        rate: 5.5,
      },
      {
        bracket: 100000,
        rate: 6,
      },
      {
        bracket: 200000,
        rate: 6.5,
      },
      {
        bracket: 250000,
        rate: 6.9,
      },
      {
        bracket: 500000,
        rate: 6.99,
      },
    ],
    deductions: [],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 3,
      },
      {
        bracket: 10000,
        rate: 5,
      },
      {
        bracket: 50000,
        rate: 5.5,
      },
      {
        bracket: 100000,
        rate: 6,
      },
      {
        bracket: 200000,
        rate: 6.5,
      },
      {
        bracket: 250000,
        rate: 6.9,
      },
      {
        bracket: 500000,
        rate: 6.99,
      },
    ],
    deductions: [],
  },
};

export default connecticut;
