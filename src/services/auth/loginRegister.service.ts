import { Injectable } from '@nestjs/common';
import {PrismaClient,Usuario} from '@prisma/client'
import * as bcrypt from 'bcrypt'; // Importa la librería bcrypt para encriptar contraseñas

@Injectable()
export class LoginRegisterService {
    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }


    async login(data: { email: string; password: string }): Promise<Usuario> {
        const { email, password } = data;
        const user = await this.prisma.usuario.findUnique({
          where: { email },
          include: { role: true },
        });
        if (!user) {
          throw new Error('El usuario no existe');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('La contraseña es incorrecta');
        }
        return user;
    }
    async registerUser(userData):Promise<{message:'success'}>{
        const { password, ...rest } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.prisma.usuario.create({
          data: {
            ...rest,
            password: hashedPassword,
          },
          
        });
        return { message: 'success' };
    }
}