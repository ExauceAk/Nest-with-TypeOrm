import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ForgotPasswordDto {

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
