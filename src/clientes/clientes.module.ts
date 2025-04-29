import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientesService } from './clientes.service'
import { ClientesController } from './clientes.controller'
import { Cliente } from './cliente.entity'
import { UsuarioModule } from '../usuarios/usuario.module'

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), UsuarioModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}

