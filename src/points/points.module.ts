import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { PointsRepository } from './point.repository';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point]) , UsersModule],
  controllers: [PointsController],
  providers: [PointsService , PointsRepository]
})
export class PointsModule {}
