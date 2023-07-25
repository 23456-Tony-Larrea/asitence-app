import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from '@prisma/client';

@Controller('api/users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.getAllUsuarios();
  }

  @Post()
  async createUsuario(@Body() data: { nombre: string; email: string; edad?: number; password: string; roleId: number }): Promise<Usuario> {
    return this.usuarioService.createUsuario(data);
  }
}
