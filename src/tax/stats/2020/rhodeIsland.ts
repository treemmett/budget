import { Jurisdiction } from '../..';

const rhodeIsland: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 3.75,
      },
      {
        bracket: 62550,
        rate: 4.75,
      },
      {
        bracket: 142150,
        rate: 5.99,
      },
    ],
    deductions: [
      {
        amount: 13100,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 3.75,
      },
      {
        bracket: 62550,
        rate: 4.75,
      },
      {
        bracket: 142150,
        rate: 5.99,
      },
    ],
    deductions: [
      {
        amount: 17500,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 3.75,
      },
      {
        bracket: 62550,
        rate: 4.75,
      },
      {
        bracket: 142150,
        rate: 5.99,
      },
    ],
    deductions: [
      {
        amount: 8750,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 3.75,
      },
      {
        bracket: 62550,
        rate: 4.75,
      },
      {
        bracket: 142150,
        rate: 5.99,
      },
    ],
    deductions: [
      {
        amount: 8750,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default rhodeIsland;
