import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  VersionColumn
} from 'typeorm';
import User from './User';

@Entity({ name: 'sessions' })
export default class Session {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @VersionColumn()
  public version: number;

  @CreateDateColumn()
  public timeIssued: Date;

  @ManyToOne(() => User, user => user.sessions, {
    onDelete: 'CASCADE',
    nullable: false
  })
  public user: User;
}
