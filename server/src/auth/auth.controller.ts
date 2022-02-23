import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { User } from '../core/entities/user';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';
import { LoginUser } from './user.decorator';

@Controller('auth')
export class AuthController {

    constructor (private authservice: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Request() req) {
        return this.authservice.login(req.user);
    }

    @Get('info')
    async getUserInfo(@LoginUser() user: User) {
        console.log(user)
        return this.authservice.getUserInfo(user.id);
    }

    @Public()
    @Post('register')
    async register(@Body() user: User) {
        return this.authservice.register(user);
    }
}
