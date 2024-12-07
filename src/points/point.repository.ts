import { EntityManager, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'libs/common/src/database';
import { Point } from './entities/point.entity';

@Injectable()
export class PointsRepository extends AbstractRepository<Point> {
  protected readonly logger = new Logger(PointsRepository.name);
  constructor(
    @InjectRepository(Point)
    pointsRepository: Repository<Point>,
    entityManager: EntityManager,
  ) {
    super(pointsRepository, entityManager);
  }
  async save(points: Point): Promise<Point> {
    return this.entityManager.save(points);
  }
}
