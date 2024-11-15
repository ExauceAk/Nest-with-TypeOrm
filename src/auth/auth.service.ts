import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/users/user.repository';
import { LoginUserDto } from './dto/loginUser.dto';
import { Users } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,

    ) {}

    private async findUserByEmail(email: string): Promise<Users> {
        if (email) return await this.usersRepository.findOne({ where: { email } });
        throw new Error('Either email or username must be provided');
      }
    
      /**
       * Generate a token for a user
       * @param user
       * @returns string
       */
      private generateToken(user: Users) {
        const payload = { email: user.email, id: user.id };
        return this.jwtService.sign(payload);
      }

  /**
   * Login a user
   * @param loginUserDto
   * @returns { user: Users; token: string }
  */
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: Users; token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.findUserByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');


    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials');
    const token = this.generateToken(user);
    return { user, token };
  }


   /**
   * Register a user
   * @param loginUserDto
   * @returns { user: Users; token: string }
  */
   async register(
    registerUserDto: RegisterUserDto,
  ): Promise< Users> {
    const { email, password , firstName, lastName, username } = registerUserDto;
    const user = await this.findUserByEmail(email);

    if (user) throw new UnauthorizedException('Email already in use');

    const userNameCheck = await this.usersRepository.findOne({ where: { username } });

    if (userNameCheck) throw new UnauthorizedException('UserName already in use');
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser =  new Users({});
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.username = username;

    return await this.usersRepository.save(newUser);

  
  }

 

}
