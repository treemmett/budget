import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export default class Budget {
  @IsUUID()
  public readonly id: string;

  @MaxLength(62)
  @IsNotEmpty()
  public name: string;
}
