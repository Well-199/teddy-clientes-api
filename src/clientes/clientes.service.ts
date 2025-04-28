import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cliente } from './cliente.entity'

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async buscaPorToken(token: string): Promise<boolean> {
    const user = await this.clienteRepository.findOneBy({ token })
    if (token === user?.token) {
      return true
    }
    return false
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find()
  }

  async findbyName(nome: string): Promise<Cliente | null> {
    return await this.clienteRepository.findOneBy({ nome })
  }

  async findOne(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.findOneBy({ id })
  }

  async create(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.save(cliente)
  }

  async update(id: number, cliente: Partial<Cliente>): Promise<Cliente | null> {
    await this.clienteRepository.update(id, cliente)
    return this.findOne(id)
  }

  async delete(id: number): Promise<void> {
    return await this.clienteRepository.delete(id).then(() => undefined)
  }
}

