import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cliente } from './clientes/cliente.entity'
import { Usuario } from './usuarios/usuario.entity'
import { ClientesModule } from './clientes/clientes.module'
import { UsuarioModule } from './usuarios/usuario.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        schema: 'teddy',
        entities: [Cliente, Usuario],
        synchronize: false,
      }),
    }),
    ClientesModule,
    UsuarioModule
  ],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
