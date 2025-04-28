import { 
  Controller, UseGuards, HttpCode, BadRequestException, 
  Get, Post, Body, Param, Put, Delete 
} from '@nestjs/common'
import { ClientesService } from './clientes.service'
import { AuthGuard } from '../middleware/auth.guard'
import { Cliente } from './cliente.entity'
import * as bcrypt from 'bcrypt'

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.clientesService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientesService.findOne(+id)
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body('nome') nome: string) {
    
    if(!nome){
      throw new BadRequestException('Nome não enviado')
    }

    const user = await this.clientesService.findbyName(nome)
    if(!user){
      throw new BadRequestException('Cliente não encontrado!')
    }

    // gerar um token
    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10)
    
    // atualiza a propriedade token
    user.token = token

    // atualiza o token no banco de dados
    await this.clientesService.update(user.id, user)

    return user
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() cliente: Cliente) {
    return await this.clientesService.create(cliente)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() cliente: Cliente) {
    return await this.clientesService.update(+id, cliente)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clientesService.delete(+id)
  }
}
