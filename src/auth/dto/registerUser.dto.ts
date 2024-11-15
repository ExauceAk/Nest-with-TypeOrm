import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  // @ApiProperty({
  //   type: String,
  //   example: `example@gmail.com`,
  // })
  @IsEmail()
  @IsOptional()
  email: string;

  // @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 6,
      minNumbers: 1,
      minUppercase: 1,
    },
    {
      message: `Password is not strong enough. Must contain: 6 characters, 1 number, 1 uppercase letter`,
    },
  )
  password: string;

  // @ApiProperty()
  @IsNotEmpty({ message: 'confirm password is required' })
  @IsString()
  firstName: string;

  // @ApiProperty()
  @IsNotEmpty({ message: 'confirm password is required' })
  @IsString()
  lastName: string;

  // @ApiProperty()
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;
}
