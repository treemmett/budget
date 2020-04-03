import { Jurisdiction } from '../..';

const newMexico: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1.7,
      },
      {
        bracket: 8000,
        rate: 3.2,
      },
      {
        bracket: 16000,
        rate: 4.7,
      },
      {
        bracket: 24000,
        rate: 4.9,
      },
    ],
    deductions: [
      {
        amount: 18350,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 1.7,
      },
      {
        bracket: 8000,
        rate: 3.2,
      },
      {
        bracket: 16000,
        rate: 4.7,
      },
      {
        bracket: 24000,
        rate: 4.9,
      },
    ],
    deductions: [
      {
        amount: 24400,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 1.7,
      },
      {
        bracket: 4000,
        rate: 3.2,
      },
      {
        bracket: 8000,
        rate: 4.7,
      },
      {
        bracket: 12000,
        rate: 4.9,
      },
    ],
    deductions: [
      {
        amount: 12200,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 1.7,
      },
      {
        bracket: 5500,
        rate: 3.2,
      },
      {
        bracket: 11000,
        rate: 4.7,
      },
      {
        bracket: 16000,
        rate: 4.9,
      },
    ],
    deductions: [
      {
        amount: 12200,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default newMexico;
