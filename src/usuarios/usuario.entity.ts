import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Cliente } from '../clientes/cliente.entity'

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  nome: string

  @Column({ type: 'varchar', length: 255 })
  token: string

  @OneToMany(() => Cliente, cliente => cliente.usuario)
  clientes: Cliente[]
}
