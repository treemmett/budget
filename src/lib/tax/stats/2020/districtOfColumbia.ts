import type { Jurisdiction } from '../..';

const districtOfColumbia: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 6,
      },
      {
        bracket: 40000,
        rate: 6.5,
      },
      {
        bracket: 60000,
        rate: 8.5,
      },
      {
        bracket: 350000,
        rate: 8.75,
      },
      {
        bracket: 1000000,
        rate: 8.95,
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
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 6,
      },
      {
        bracket: 40000,
        rate: 6.5,
      },
      {
        bracket: 60000,
        rate: 8.5,
      },
      {
        bracket: 350000,
        rate: 8.75,
      },
      {
        bracket: 1000000,
        rate: 8.95,
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
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 6,
      },
      {
        bracket: 40000,
        rate: 6.5,
      },
      {
        bracket: 60000,
        rate: 8.5,
      },
      {
        bracket: 350000,
        rate: 8.75,
      },
      {
        bracket: 1000000,
        rate: 8.95,
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
        rate: 4,
      },
      {
        bracket: 10000,
        rate: 6,
      },
      {
        bracket: 40000,
        rate: 6.5,
      },
      {
        bracket: 60000,
        rate: 8.5,
      },
      {
        bracket: 350000,
        rate: 8.75,
      },
      {
        bracket: 1000000,
        rate: 8.95,
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

export default districtOfColumbia;
