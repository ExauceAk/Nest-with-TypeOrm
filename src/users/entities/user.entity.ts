import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from 'libs/common/src/database';
import { Exclude } from 'class-transformer';

@Entity()
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
  @Exclude()
  password: string;

  @Column({ nullable: false , default: 0 })
  points: number;

   // Code de parrainage unique pour chaque utilisateur
   @Column({ nullable: false, unique: true })
   referralCode: string;
 
   // Le parrain de cet utilisateur
   @ManyToOne(() => Users, (user) => user.referredUsers, { nullable: true })
   sponsor: Users;
 
   // Les utilisateurs parrainés par cet utilisateur
   @OneToMany(() => Users, (user) => user.sponsor)
   referredUsers: Users[];
}
