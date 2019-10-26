import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from 'typeorm';

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
}
