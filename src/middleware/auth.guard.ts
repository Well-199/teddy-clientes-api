import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { ClientesService } from '../clientes/clientes.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usuariosService: ClientesService) {}

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
