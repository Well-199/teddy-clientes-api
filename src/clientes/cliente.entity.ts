import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Usuario } from '../usuarios/usuario.entity'

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  nome: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salario: number

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'valor_empresa' })
  valorEmpresa: number

  @ManyToOne(() => Usuario, usuario => usuario.clientes)
  @JoinColumn({ name: 'usuario_id' }) 
  usuario: Usuario
}
