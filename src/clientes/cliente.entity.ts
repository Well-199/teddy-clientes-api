import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clientes') // Nome da tabela
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'valor_empresa' })
  valorEmpresa: number;

  @Column({ type: 'varchar', length: 255 })
  token: string;
}

