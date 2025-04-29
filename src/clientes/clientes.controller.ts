import { 
  Controller, UseGuards, HttpCode, BadRequestException, 
  Get, Post, Body, Param, Put, Delete 
} from '@nestjs/common'
import { ClientesService } from './clientes.service'
import { AuthGuard } from '../middleware/auth.guard'
import { Cliente } from './cliente.entity'

import { validarCliente } from '../middleware/validarCliente'

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @UseGuards(AuthGuard)
  @Get(':usuario_id')
  async findAll(@Param('usuario_id') usuarioId: string) {
    console.log(usuarioId)
    if(!usuarioId){
      throw new BadRequestException('ID do usuario não enviado')
    }
    return await this.clientesService.findAll(+usuarioId)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientesService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() cliente: Cliente) {
    validarCliente(cliente)
    return await this.clientesService.create(cliente)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() cliente: Cliente) {
    validarCliente(cliente)
    return await this.clientesService.update(+id, cliente)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clientesService.delete(+id)
  }
}
