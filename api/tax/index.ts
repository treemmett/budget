import y2020 from './stats/2020';

interface Bracket {
  bracket: number;
  rate: number;
}

interface Deductions {
  name: string;
  amount: number;
}

interface TaxStatus {
  deductions: Deductions[];
  brackets: Bracket[];
}

export interface Jurisdiction {
  single: TaxStatus;
  married: TaxStatus;
  marriedSeparately: TaxStatus;
  headOfHousehold: TaxStatus;
}

interface TaxYear {
  alabama: Jurisdiction;
  alaska: Jurisdiction;
  arizona: Jurisdiction;
  arkansas: Jurisdiction;
  california: Jurisdiction;
  colorado: Jurisdiction;
  connecticut: Jurisdiction;
  delaware: Jurisdiction;
  districtOfColumbia: Jurisdiction;
  federal: Jurisdiction;
  florida: Jurisdiction;
  georgia: Jurisdiction;
  hawaii: Jurisdiction;
  idaho: Jurisdiction;
  illinois: Jurisdiction;
  indiana: Jurisdiction;
  iowa: Jurisdiction;
  kansas: Jurisdiction;
  kentucky: Jurisdiction;
  louisiana: Jurisdiction;
  maine: Jurisdiction;
  maryland: Jurisdiction;
  massachusetts: Jurisdiction;
  michigan: Jurisdiction;
  minnesota: Jurisdiction;
  mississippi: Jurisdiction;
  missouri: Jurisdiction;
  montana: Jurisdiction;
  nebraska: Jurisdiction;
  nevada: Jurisdiction;
  newHampshire: Jurisdiction;
  newJersey: Jurisdiction;
  newMexico: Jurisdiction;
  newYork: Jurisdiction;
  northCarolina: Jurisdiction;
  northDakota: Jurisdiction;
  ohio: Jurisdiction;
  oklahoma: Jurisdiction;
  oregon: Jurisdiction;
  pennsylvania: Jurisdiction;
  rhodeIsland: Jurisdiction;
  southCarolina: Jurisdiction;
  southDakota: Jurisdiction;
  tennessee: Jurisdiction;
  texas: Jurisdiction;
  utah: Jurisdiction;
  vermont: Jurisdiction;
  virginia: Jurisdiction;
  washington: Jurisdiction;
  westVirginia: Jurisdiction;
  wisconsin: Jurisdiction;
  wyoming: Jurisdiction;
}

interface TaxRates {
  2020: TaxYear;
}

const taxRates: TaxRates = {
  2020: y2020,
};

export default taxRates;
