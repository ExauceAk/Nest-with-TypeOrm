import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPointsDto {

  @IsNumber()
  @IsNotEmpty({ message: 'wtf' })
  amount: number;

  @IsNotEmpty({ message: 'wtf' })
  type: string;
}
