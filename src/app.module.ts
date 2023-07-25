import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/user.controller';
import { AuthController } from './controllers/auth/loginRegister.controller';
import { LoginRegisterService } from 'src/services/auth/loginRegister.service';

@Module({
  imports: [],
  controllers: [UsuarioController,AuthController],
  providers: [UsuarioService,LoginRegisterService],

})
export class AppModule {}
