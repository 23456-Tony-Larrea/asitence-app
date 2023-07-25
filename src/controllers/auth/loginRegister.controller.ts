import { Controller, Post, Body } from '@nestjs/common';
import {LoginRegisterService} from 'src/services/auth/loginRegister.service';
import { Usuario } from '@prisma/client';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly loginRegisterService: LoginRegisterService) {}

    @Post('/login')
    async login(@Body() data: { email: string; password: string }): Promise<Usuario> {
        return this.loginRegisterService.login(data);
    }

    @Post('register')
    async registerUser(@Body() userData):Promise<{message:'success'}>{
        return this.loginRegisterService.registerUser(userData);
    }
}

