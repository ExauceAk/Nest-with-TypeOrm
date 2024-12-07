import { Injectable } from '@nestjs/common';
import { PointsRepository } from './point.repository';
import { UsersRepository } from 'src/users/user.repository';
import { Point } from './entities/point.entity';
import { AddPointsDto } from './dto/addPoint';

@Injectable()
export class PointsService {
    constructor(
        private readonly pointsRepository: PointsRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

     // Ajouter des points
  async addPoints(userId: string, addPointsDto: AddPointsDto): Promise<number> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const newPoints = new Point({});
    newPoints.amount = addPointsDto.amount;
    newPoints.type = addPointsDto.type;
    newPoints.user = user;

    const points = await this.pointsRepository.save(newPoints)

    const totalPoints = await this.getUserTotalPoints(userId);

    const result = await this.usersRepository.update({ id: userId }, { points: totalPoints });

    if (!result) {
      throw new Error();
    }


    return points.amount;
  }

  // Récupérer tous les points d'un utilisateur
  private async getUserPoints(userId: string): Promise<Point[]> {
    return this.pointsRepository.find({
      where: { user: { id: userId } },
    });
  }

  // Calculer le total des points d'un utilisateur
  private async getUserTotalPoints(userId: string): Promise<number> {
    const points = await this.getUserPoints(userId);
    return points.reduce((total, point) => total + point.amount, 0);
  }

}
