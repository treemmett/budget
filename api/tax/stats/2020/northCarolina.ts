import { Jurisdiction } from '../..';

const northCarolina: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 5.499,
      },
    ],
    deductions: [
      {
        amount: 20000,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 5.499,
      },
    ],
    deductions: [
      {
        amount: 20000,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 5.499,
      },
    ],
    deductions: [
      {
        amount: 10000,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 5.499,
      },
    ],
    deductions: [
      {
        amount: 10000,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default northCarolina;
