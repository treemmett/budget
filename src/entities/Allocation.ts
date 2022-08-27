import { IsDate, IsInt, IsUUID } from 'class-validator';

export default class Allocation {
  @IsUUID()
  public id: string;

  @IsInt()
  public amount: number;

  @IsDate()
  public date: Date;
}
