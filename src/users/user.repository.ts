import { EntityManager, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { AbstractRepository } from 'libs/common/src/database';

@Injectable()
export class UsersRepository extends AbstractRepository<Users> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(Users)
    usersRepository: Repository<Users>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
  async save(users: Users): Promise<Users> {
    return this.entityManager.save(users);
  }
}
