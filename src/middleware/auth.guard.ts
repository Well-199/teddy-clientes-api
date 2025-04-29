import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { UsuarioService } from '../usuarios/usuario.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usuariosService: UsuarioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const token = request.headers.authorization

    if (!token || token.trim() === '') {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.usuariosService.buscaPorToken(token as string)

    if (!user) {
      throw new UnauthorizedException('Usuário não existe ou token inválido')
    }

    return true
  }
}
