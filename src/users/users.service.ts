import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor( private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  getAllUsers() {
    return this.usersRepository.find({});
  }

}
