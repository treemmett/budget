import { Jurisdiction } from '../..';

const hawaii: Jurisdiction = {
  headOfHousehold: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 3600,
        rate: 3.2,
      },
      {
        bracket: 7200,
        rate: 5.5,
      },
      {
        bracket: 14400,
        rate: 6.4,
      },
      {
        bracket: 21600,
        rate: 6.8,
      },
      {
        bracket: 28800,
        rate: 7.2,
      },
      {
        bracket: 36000,
        rate: 7.6,
      },
      {
        bracket: 54000,
        rate: 7.9,
      },
      {
        bracket: 72000,
        rate: 8.25,
      },
      {
        bracket: 225000,
        rate: 9,
      },
      {
        bracket: 262500,
        rate: 10,
      },
      {
        bracket: 300000,
        rate: 11,
      },
    ],
    deductions: [
      {
        amount: 3212,
        name: 'Standard Deduction (Head Of Household)',
      },
    ],
  },
  married: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 4800,
        rate: 3.2,
      },
      {
        bracket: 9600,
        rate: 5.5,
      },
      {
        bracket: 19200,
        rate: 6.4,
      },
      {
        bracket: 28800,
        rate: 6.8,
      },
      {
        bracket: 38400,
        rate: 7.2,
      },
      {
        bracket: 48000,
        rate: 7.6,
      },
      {
        bracket: 72000,
        rate: 7.9,
      },
      {
        bracket: 96000,
        rate: 8.25,
      },
      {
        bracket: 300000,
        rate: 9,
      },
      {
        bracket: 350000,
        rate: 10,
      },
      {
        bracket: 400000,
        rate: 11,
      },
    ],
    deductions: [
      {
        amount: 4400,
        name: 'Standard Deduction (Married)',
      },
    ],
  },
  marriedSeparately: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 2400,
        rate: 3.2,
      },
      {
        bracket: 4800,
        rate: 5.5,
      },
      {
        bracket: 9600,
        rate: 6.4,
      },
      {
        bracket: 14400,
        rate: 6.8,
      },
      {
        bracket: 19200,
        rate: 7.2,
      },
      {
        bracket: 24000,
        rate: 7.6,
      },
      {
        bracket: 36000,
        rate: 7.9,
      },
      {
        bracket: 48000,
        rate: 8.25,
      },
      {
        bracket: 150000,
        rate: 9,
      },
      {
        bracket: 175000,
        rate: 10,
      },
      {
        bracket: 200000,
        rate: 11,
      },
    ],
    deductions: [
      {
        amount: 2200,
        name: 'Standard Deduction (Married Separately)',
      },
    ],
  },
  single: {
    brackets: [
      {
        bracket: 0,
        rate: 1.4,
      },
      {
        bracket: 2400,
        rate: 3.2,
      },
      {
        bracket: 4800,
        rate: 5.5,
      },
      {
        bracket: 9600,
        rate: 6.4,
      },
      {
        bracket: 14400,
        rate: 6.8,
      },
      {
        bracket: 19200,
        rate: 7.2,
      },
      {
        bracket: 24000,
        rate: 7.6,
      },
      {
        bracket: 36000,
        rate: 7.9,
      },
      {
        bracket: 48000,
        rate: 8.25,
      },
      {
        bracket: 150000,
        rate: 9,
      },
      {
        bracket: 175000,
        rate: 10,
      },
      {
        bracket: 200000,
        rate: 11,
      },
    ],
    deductions: [
      {
        amount: 2200,
        name: 'Standard Deduction (Single)',
      },
    ],
  },
};

export default hawaii;
