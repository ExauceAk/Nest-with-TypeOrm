import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PointsService } from './points.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddPointsDto } from './dto/addPoint';

@Controller('points')
export class PointsController {
    constructor(
        private readonly pointsService: PointsService,
    ) {}

    // Ajouter des 
    @UseGuards(JwtAuthGuard)
    @Post('add-user-points')
    async addPoints(@Body() addPointsDto : AddPointsDto , @Request() req) {
        return this.pointsService.addPoints(req.user.id, addPointsDto);
    }
}
