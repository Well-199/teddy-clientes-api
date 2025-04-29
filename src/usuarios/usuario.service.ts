import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Usuario } from './usuario.entity'

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async buscaPorToken(token: string): Promise<boolean> {
        const user = await this.usuarioRepository.findOneBy({ token })
        if (token === user?.token) {
          return true
        }
        return false
    }

    async findByName(nome: string): Promise<Usuario | null> {
        const user = await this.usuarioRepository.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.clientes', 'cliente')
        .where('usuario.nome = :nome', { nome: nome })
        .getOne()
        return user
    }

    async updateToken(id: number, token: string): Promise<void> {
        await this.usuarioRepository.update(id, { token })
    }
}
