import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import User from './User';

@Entity({ name: 'tokens' })
export default class Token {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Index({ unique: true })
  public jti: string;

  @Column()
  public expires: Date;

  @CreateDateColumn()
  public issued: Date;

  @UpdateDateColumn()
  public lastUsed: Date;

  @ManyToOne(
    () => User,
    user => user.tokens
  )
  public user: User;
}
