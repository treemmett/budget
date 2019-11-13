import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Token from './Token';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Index({ unique: true })
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ type: 'bytea' })
  public hash: Buffer;

  @CreateDateColumn()
  public dateCreated: Date;

  @OneToMany(
    () => Token,
    token => token.user
  )
  public tokens: Token[];
}
