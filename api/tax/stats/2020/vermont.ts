import { Jurisdiction } from '../..';

const vermont: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 3.35,
      },
      {
        bracket: 51850,
        rate: 6.6,
      },
      {
        bracket: 133850,
        rate: 7.6,
      },
      {
        bracket: 216700,
        rate: 8.75,
      },
    ],
    deductions: [
      {
        amount: 9000,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 3.35,
      },
      {
        bracket: 64600,
        rate: 6.6,
      },
      {
        bracket: 156150,
        rate: 7.6,
      },
      {
        bracket: 237950,
        rate: 8.75,
      },
    ],
    deductions: [
      {
        amount: 12000,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 3.35,
      },
      {
        bracket: 32300,
        rate: 6.6,
      },
      {
        bracket: 78075,
        rate: 7.6,
      },
      {
        bracket: 118975,
        rate: 8.75,
      },
    ],
    deductions: [
      {
        amount: 6000,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 3.35,
      },
      {
        bracket: 38700,
        rate: 6.6,
      },
      {
        bracket: 93700,
        rate: 7.6,
      },
      {
        bracket: 195450,
        rate: 8.75,
      },
    ],
    deductions: [
      {
        amount: 6000,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default vermont;
