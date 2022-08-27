import { Jurisdiction } from '../..';

const wisconsin: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 4,
      },
      {
        bracket: 11450,
        rate: 5.84,
      },
      {
        bracket: 22900,
        rate: 6.27,
      },
      {
        bracket: 252150,
        rate: 7.65,
      },
    ],
    deductions: [
      {
        amount: 10380,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 4,
      },
      {
        bracket: 15270,
        rate: 5.84,
      },
      {
        bracket: 30540,
        rate: 6.27,
      },
      {
        bracket: 336200,
        rate: 7.65,
      },
    ],
    deductions: [
      {
        amount: 14570,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 4,
      },
      {
        bracket: 7630,
        rate: 5.84,
      },
      {
        bracket: 15270,
        rate: 6.27,
      },
      {
        bracket: 168100,
        rate: 7.65,
      },
    ],
    deductions: [
      {
        amount: 10380,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 4,
      },
      {
        bracket: 11450,
        rate: 5.84,
      },
      {
        bracket: 22900,
        rate: 6.27,
      },
      {
        bracket: 252150,
        rate: 7.65,
      },
    ],
    deductions: [
      {
        amount: 10380,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default wisconsin;
