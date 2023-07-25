import { Injectable } from '@nestjs/common';
import { PrismaClient, Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async createUsuario(data: { nombre: string; email: string; edad?: number; password: string; roleId: number }): Promise<Usuario> {
    const { roleId, ...userData } = data;
    
    return this.prisma.usuario.create({
      data: {
        ...userData,
        role: {
          connect: { id: roleId },
        },
      },
    });
  }
}
