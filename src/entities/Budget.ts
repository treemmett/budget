import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budgets' })
export default class Budget {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;
}
