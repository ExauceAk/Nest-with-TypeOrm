import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from 'libs/common/src/database';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Point extends AbstractEntity<Point> {
  @Column({ type: 'int', default: 0 })
  amount: number;

  @Column()
  type: string;

  @ManyToOne(() => Users, (user) => user.points, { nullable: true })
  user: Users;
 
}
