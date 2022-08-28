import type { Jurisdiction } from '../..';

const newJersey: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 20000,
        rate: 1.75,
      },
      {
        bracket: 50000,
        rate: 2.45,
      },
      {
        bracket: 70000,
        rate: 3.5,
      },
      {
        bracket: 80000,
        rate: 5.525,
      },
      {
        bracket: 150000,
        rate: 6.37,
      },
      {
        bracket: 500000,
        rate: 8.97,
      },
      {
        bracket: 5000000,
        rate: 10.75,
      },
    ],
    deductions: [],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 20000,
        rate: 1.75,
      },
      {
        bracket: 50000,
        rate: 2.45,
      },
      {
        bracket: 70000,
        rate: 3.5,
      },
      {
        bracket: 80000,
        rate: 5.525,
      },
      {
        bracket: 150000,
        rate: 6.37,
      },
      {
        bracket: 500000,
        rate: 8.97,
      },
      {
        bracket: 5000000,
        rate: 10.75,
      },
    ],
    deductions: [],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 20000,
        rate: 1.75,
      },
      {
        bracket: 35000,
        rate: 3.5,
      },
      {
        bracket: 40000,
        rate: 5.525,
      },
      {
        bracket: 75000,
        rate: 6.37,
      },
      {
        bracket: 500000,
        rate: 8.97,
      },
      {
        bracket: 5000000,
        rate: 10.75,
      },
    ],
    deductions: [],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 20000,
        rate: 1.75,
      },
      {
        bracket: 35000,
        rate: 3.5,
      },
      {
        bracket: 40000,
        rate: 5.525,
      },
      {
        bracket: 75000,
        rate: 6.37,
      },
      {
        bracket: 500000,
        rate: 8.97,
      },
      {
        bracket: 5000000,
        rate: 10.75,
      },
    ],
    deductions: [],
  },
};

export default newJersey;
