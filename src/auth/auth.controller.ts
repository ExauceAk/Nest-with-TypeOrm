import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('login')
    async login(@Body() loginUserDto : LoginUserDto  ) {
        return this.authService.login(loginUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async authUser(@Request() req) {
        return req.user;
    }
}
