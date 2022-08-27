import { Jurisdiction } from '../..';

const idaho: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1.125,
      },
      {
        bracket: 3008,
        rate: 3.125,
      },
      {
        bracket: 6016,
        rate: 3.625,
      },
      {
        bracket: 9022,
        rate: 4.625,
      },
      {
        bracket: 12030,
        rate: 5.625,
      },
      {
        bracket: 15038,
        rate: 6.625,
      },
      {
        bracket: 22558,
        rate: 6.925,
      },
    ],
    deductions: [
      {
        amount: 18000,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 1.125,
      },
      {
        bracket: 3008,
        rate: 3.125,
      },
      {
        bracket: 6016,
        rate: 3.625,
      },
      {
        bracket: 9022,
        rate: 4.625,
      },
      {
        bracket: 12030,
        rate: 5.625,
      },
      {
        bracket: 15038,
        rate: 6.625,
      },
      {
        bracket: 22558,
        rate: 6.925,
      },
    ],
    deductions: [
      {
        amount: 24000,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 1.125,
      },
      {
        bracket: 1504,
        rate: 3.125,
      },
      {
        bracket: 3008,
        rate: 3.625,
      },
      {
        bracket: 4511,
        rate: 4.625,
      },
      {
        bracket: 6015,
        rate: 5.625,
      },
      {
        bracket: 7519,
        rate: 6.625,
      },
      {
        bracket: 11279,
        rate: 6.925,
      },
    ],
    deductions: [
      {
        amount: 12000,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 1.125,
      },
      {
        bracket: 1504,
        rate: 3.125,
      },
      {
        bracket: 3008,
        rate: 3.625,
      },
      {
        bracket: 4511,
        rate: 4.625,
      },
      {
        bracket: 6015,
        rate: 5.625,
      },
      {
        bracket: 7519,
        rate: 6.625,
      },
      {
        bracket: 11279,
        rate: 6.925,
      },
    ],
    deductions: [
      {
        amount: 12000,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default idaho;
