import { IsInt, IsNotEmpty, IsUUID, MaxLength, Min } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import BudgetCategory from './BudgetCategory';

@Entity()
export default class BudgetGroup extends BaseEntity {
  @IsUUID()
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @MaxLength(62)
  @IsNotEmpty()
  @Column()
  public name: string;

  @IsInt()
  @Min(0)
  @Column()
  public sort: number;

  @OneToMany('BudgetCategory', 'group')
  categories: BudgetCategory[];
}
