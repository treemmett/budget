import { Jurisdiction } from '../..';

const nebraska: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 2.46,
      },
      {
        bracket: 5870,
        rate: 3.51,
      },
      {
        bracket: 30210,
        rate: 5.01,
      },
      {
        bracket: 45110,
        rate: 6.84,
      },
    ],
    deductions: [
      {
        amount: 9900,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 2.46,
      },
      {
        bracket: 6290,
        rate: 3.51,
      },
      {
        bracket: 37770,
        rate: 5.01,
      },
      {
        bracket: 60840,
        rate: 6.84,
      },
    ],
    deductions: [
      {
        amount: 13500,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 2.46,
      },
      {
        bracket: 3150,
        rate: 3.51,
      },
      {
        bracket: 18880,
        rate: 5.01,
      },
      {
        bracket: 30420,
        rate: 6.84,
      },
    ],
    deductions: [
      {
        amount: 6750,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 2.46,
      },
      {
        bracket: 3150,
        rate: 3.51,
      },
      {
        bracket: 18880,
        rate: 5.01,
      },
      {
        bracket: 30420,
        rate: 6.84,
      },
    ],
    deductions: [
      {
        amount: 6750,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default nebraska;
