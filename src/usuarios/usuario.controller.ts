import { Controller, BadRequestException, HttpCode, Post, Body } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import * as bcrypt from 'bcrypt'

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body('nome') nome: string) {
    
    if(!nome){
      throw new BadRequestException('Nome não enviado')
    }

    const user = await this.usuarioService.findByName(nome)
    console.log(`RETORNO LOGIN: ${user}`)
    if(!user){
      throw new BadRequestException('Cliente não encontrado!')
    }

    // gerar um token
    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10)
    
    // atualiza a propriedade token
    user.token = token

    // atualiza o token no banco de dados
    await this.usuarioService.updateToken(user.id, token)

    return user
  }
}
