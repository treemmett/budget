import type { Jurisdiction } from '../..';

const arizona: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 2.59,
      },
      {
        bracket: 53001,
        rate: 3.34,
      },
      {
        bracket: 106001,
        rate: 4.17,
      },
      {
        bracket: 318001,
        rate: 4.5,
      },
    ],
    deductions: [
      {
        amount: 18650,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 2.59,
      },
      {
        bracket: 53001,
        rate: 3.34,
      },
      {
        bracket: 106001,
        rate: 4.17,
      },
      {
        bracket: 318001,
        rate: 4.5,
      },
    ],
    deductions: [
      {
        amount: 24800,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 2.59,
      },
      {
        bracket: 26501,
        rate: 3.34,
      },
      {
        bracket: 53001,
        rate: 4.17,
      },
      {
        bracket: 159001,
        rate: 4.5,
      },
    ],
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 2.59,
      },
      {
        bracket: 26501,
        rate: 3.34,
      },
      {
        bracket: 53001,
        rate: 4.17,
      },
      {
        bracket: 159001,
        rate: 4.5,
      },
    ],
    deductions: [
      {
        amount: 12400,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default arizona;
