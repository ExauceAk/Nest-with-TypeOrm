import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'libs/common/src/database';

@Entity('users')
export class Users extends AbstractEntity<Users> {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;
}
