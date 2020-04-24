import { Field, InputType } from 'type-graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export default class LoginInput {
  @Field()
  @IsEmail()
  @MaxLength(62, {
    message: 'Email must be shorter than or equal to 62 characters',
  })
  public readonly email: string;

  @Field()
  public readonly password: string;

  public constructor(data: LoginInput) {
    this.email = data.email;
    this.password = data.password;
  }
}
