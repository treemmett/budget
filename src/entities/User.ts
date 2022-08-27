import { IsDate, IsEmail, IsUUID, MaxLength, ValidateNested } from 'class-validator';
import Budget from './Budget';

export default class User {
  @IsUUID()
  public readonly id: string;

  @IsEmail()
  @MaxLength(255, {
    message: 'Email must be shorter than or equal to $constraint1 characters',
  })
  public email: string;

  @MaxLength(50, {
    message: 'First name must be shorter than or equal to $constraint1 characters',
  })
  public firstName: string;

  @MaxLength(50, {
    message: 'Last name must be shorter than or equal to $constraint1 characters',
  })
  public lastName: string;

  @ValidateNested()
  public hash: Buffer;

  @ValidateNested()
  public budgets: Budget[];

  @IsDate()
  public dateCreated: Date;
}
