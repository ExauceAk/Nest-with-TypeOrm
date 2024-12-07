import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ForgotPasswordDto } from './dto/forgotPassword';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('login')
    async login(@Body() loginUserDto : LoginUserDto  ) {
        return this.authService.login(loginUserDto);
    }

    @Post('register')
    async register(@Body() registerUserDto : RegisterUserDto  ) {
        return this.authService.register(registerUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async authUser(@Request() req) {
        return this.authService.getMe(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-referral')
    async getMyReferral(@Request() req) {
        return this.authService.getMyReferral(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("fogot-password")
    async fogotPassword(@Body() fogotPasswordDto : ForgotPasswordDto  ) {
        // return this.authService.fogotPassword(fogotPasswordDto);
    }
}
