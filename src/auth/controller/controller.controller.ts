import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../service/service.service';
import { AuthUserDto } from '../dto/auth-user.dto';

@Controller('auth')
export class ControllerController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: AuthUserDto){
        return this.authService.login(dto);
    }

}
