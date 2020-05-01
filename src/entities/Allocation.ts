import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsDate, IsInt, validateOrReject } from 'class-validator';
import Category from './Category';

@Entity()
@Unique('cat_date', ['date', 'category'])
export default class Allocation {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Category, category => category.allocations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public category: Promise<Category>;

  @IsInt()
  @Column({ type: 'int' })
  public amount: number;

  @IsDate()
  @Column({ type: 'date' })
  public date: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
    this.amount = Math.floor(this.amount);
    this.date.setDate(1);
  }
}
