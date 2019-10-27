import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import User from './User';

@Entity({ name: 'budgets' })
export default class Budget {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(() => User)
  @Index()
  public user: User;
}
