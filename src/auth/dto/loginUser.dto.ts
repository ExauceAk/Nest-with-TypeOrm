import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  // @ApiProperty({
  //   type: String,
  //   example: `example@gmail.com`,
  // })
  @IsEmail()
  @IsOptional()
  email: string;

  // @ApiProperty()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
