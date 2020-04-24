import { Field, InputType } from 'type-graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export default class CreateUserInput {
  @Field()
  @IsEmail()
  @MaxLength(62, {
    message: 'Email must be shorter than or equal to $constraint1 characters',
  })
  public readonly email: string;

  @Field()
  public readonly password: string;

  @Field()
  @MaxLength(50, {
    message:
      'First name must be shorter than or equal to $constraint1 characters',
  })
  public readonly firstName: string;

  @Field()
  @MaxLength(50, {
    message:
      'Last name must be shorter than or equal to $constraint1 characters',
  })
  public readonly lastName: string;

  public constructor(data: CreateUserInput) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
  }
}
