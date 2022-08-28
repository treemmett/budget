import type { Jurisdiction } from '../..';

const southCarolina: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 0,
      },
      {
        bracket: 2970,
        rate: 3,
      },
      {
        bracket: 5940,
        rate: 4,
      },
      {
        bracket: 8910,
        rate: 5,
      },
      {
        bracket: 11880,
        rate: 6,
      },
      {
        bracket: 14860,
        rate: 7,
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
        rate: 0,
      },
      {
        bracket: 2970,
        rate: 3,
      },
      {
        bracket: 5940,
        rate: 4,
      },
      {
        bracket: 8910,
        rate: 5,
      },
      {
        bracket: 11880,
        rate: 6,
      },
      {
        bracket: 14860,
        rate: 7,
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
        rate: 0,
      },
      {
        bracket: 2970,
        rate: 3,
      },
      {
        bracket: 5940,
        rate: 4,
      },
      {
        bracket: 8910,
        rate: 5,
      },
      {
        bracket: 11880,
        rate: 6,
      },
      {
        bracket: 14860,
        rate: 7,
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
        rate: 0,
      },
      {
        bracket: 2970,
        rate: 3,
      },
      {
        bracket: 5940,
        rate: 4,
      },
      {
        bracket: 8910,
        rate: 5,
      },
      {
        bracket: 11880,
        rate: 6,
      },
      {
        bracket: 14860,
        rate: 7,
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

export default southCarolina;
