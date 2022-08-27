import { ArgumentValidationError, Field, ID, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';
import { IsEmail, MaxLength, validateOrReject } from 'class-validator';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import Budget from './Budget';
import Config from '../utils/config';
import CreateUserInput from '../inputs/CreateUserInput';
import LoginInput from '../inputs/LoginInput';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

@ObjectType({ description: 'User account' })
@Entity({ name: 'users' })
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @IsEmail()
  @MaxLength(62, {
    message: 'Email must be shorter than or equal to $constraint1 characters',
  })
  @Field({ description: 'Email address of the user' })
  @Column({ length: 62 })
  @Index({ unique: true })
  public email: string;

  @MaxLength(50, {
    message:
      'First name must be shorter than or equal to $constraint1 characters',
  })
  @Field({ description: 'First name of user' })
  @Column({ length: 50 })
  public firstName: string;

  @MaxLength(50, {
    message:
      'Last name must be shorter than or equal to $constraint1 characters',
  })
  @Field({ description: 'Last name of user' })
  @Column({ length: 50 })
  public lastName: string;

  @Column({ select: false, type: 'bytea' })
  public hash: Buffer;

  @OneToMany(() => Budget, budget => budget.user)
  public budgets: Promise<Budget[]>;

  @Field({ description: 'Date the user was registered' })
  @CreateDateColumn()
  public dateCreated: Date;

  public static async create(data: CreateUserInput): Promise<User> {
    // check if the email is already registered
    const [, userCount] = await getRepository(User).findAndCount({
      where: { email: data.email },
    });

    if (userCount) {
      throw new ArgumentValidationError([
        {
          children: [],
          constraints: { isUnique: 'Email is already registered' },
          property: 'email',
        },
      ]);
    }

    // hash password with sha512
    const hash = crypto
      .createHash('sha512')
      .update(data.password)
      .digest('base64');

    // bcrypt hash
    const bcrypted = await bcrypt.hash(hash, 10);

    // TODO: encrypt hash with AES256

    // save user to dataabase
    const user = new User();
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.hash = Buffer.from(bcrypted);
    await getRepository(User).save(user);

    return user;
  }

  public static async login(data: LoginInput): Promise<string> {
    // get user
    const user = await getRepository(User).findOne({
      select: ['id', 'hash'],
      where: { email: data.email },
    });

    if (!user) {
      throw new ArgumentValidationError([
        {
          children: [],
          constraints: {
            validEmail: 'Email is not registered',
          },
          property: 'email',
        },
      ]);
    }

    // encode hash
    const bcryptedHash = Buffer.from(user.hash).toString();

    // hash input password
    const hashedPassword = crypto
      .createHash('sha512')
      .update(data.password)
      .digest('base64');

    // compare hash
    const match = await bcrypt.compare(hashedPassword, bcryptedHash);

    if (!match) {
      throw new ArgumentValidationError([
        {
          children: [],
          constraints: {
            validPassword: 'Password is incorrect',
          },
          property: 'password',
        },
      ]);
    }

    // sign jwt
    const token = jwt.sign({}, Config.JWT_SECRET, {
      expiresIn: '7d',
      subject: user.id,
    });

    return token;
  }

  public static async validateToken(token: string): Promise<User> {
    try {
      const payload = jwt.verify(token, Config.JWT_SECRET) as { sub: string };

      const user = await getRepository(User).findOne(payload.sub);

      if (!user) {
        throw new AuthenticationError('Invalid authorization token');
      }

      return user;
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new AuthenticationError('Invalid authorization token');
      }

      throw e;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
