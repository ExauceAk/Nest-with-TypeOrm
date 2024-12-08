import { IsEmail, IsNotEmpty } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  // @ApiProperty()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
