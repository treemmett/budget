import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, Float, ObjectType, registerEnumType } from 'type-graphql';
import Budget from './Budget';

export enum State {
  'Alabama' = 'al',
  'Alaska' = 'ak',
  'Arizona' = 'az',
  'Arkansas' = 'ar',
  'California' = 'ca',
  'Colorado' = 'co',
  'Connecticut' = 'ct',
  'Delaware' = 'de',
  'Florida' = 'fl',
  'Georgia' = 'ga',
  'Hawaii' = 'hi',
  'Idaho' = 'id',
  'Illinois' = 'il',
  'Indiana' = 'in',
  'Iowa' = 'ia',
  'Kansas' = 'ks',
  'Kentucky' = 'ky',
  'Louisiana' = 'la',
  'Maine' = 'me',
  'Maryland' = 'md',
  'Massachusetts' = 'ma',
  'Michigan' = 'mi',
  'Minnesota' = 'mn',
  'Mississippi' = 'ms',
  'Missouri' = 'mo',
  'Montana' = 'mt',
  'Nebraska' = 'ne',
  'Nevada' = 'nv',
  'New_Hampshire' = 'nh',
  'New_Jersey' = 'nj',
  'New_Mexico' = 'nm',
  'New_York' = 'ny',
  'North_Carolina' = 'nc',
  'North_Dakota' = 'nd',
  'Ohio' = 'oh',
  'Oklahoma' = 'ok',
  'Oregon' = 'or',
  'Pennsylvania' = 'pa',
  'Rhode_Island' = 'ri',
  'South_Carolina' = 'sc',
  'South_Dakota' = 'sd',
  'Tennessee' = 'tn',
  'Texas' = 'tx',
  'Utah' = 'ut',
  'Vermont' = 'vt',
  'Virginia' = 'va',
  'Washington' = 'wa',
  'West_Virginia' = 'wv',
  'Wisconsin' = 'wi',
  'Wyoming' = 'wy'
}

registerEnumType(State, {
  name: 'State',
  description: 'Abbreviation of the state'
});

export enum FilingStatus {
  single,
  married,
  separate,
  head
}

registerEnumType(FilingStatus, { name: 'FilingStatus' });

@ObjectType({ description: 'Tax info for budget' })
@Entity()
export default class Tax {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(
    () => Budget,
    budget => budget.tax
  )
  @JoinColumn()
  public budget: Budget;

  @Field(() => State, { description: 'Filing state for income tax' })
  @Column({ type: 'enum', enum: State })
  public state: State;

  @Field(() => FilingStatus, { description: 'Filing status for income tax' })
  @Column({ type: 'enum', enum: FilingStatus })
  public status: FilingStatus;

  @Field(() => Float, { description: 'Calculated gross income ' })
  public grossIncome: number;

  @Field(() => Float, { description: 'Estimated income tax' })
  public incomeTax: number;

  @Field(() => Float, { description: 'Estimated net income' })
  public netIncome: number;
}
