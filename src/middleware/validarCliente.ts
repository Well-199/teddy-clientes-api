import { 
    Controller, UseGuards, HttpCode, BadRequestException, 
    Get, Post, Body, Param, Put, Delete 
} from '@nestjs/common'

export const validarCliente = (cliente: any) => {

    if(!cliente){
        throw new BadRequestException('Dados do cliente não enviado')
    }

    if (!cliente.nome || typeof cliente.nome !== 'string') {
      throw new BadRequestException('Campo "nome" é obrigatório e deve ser uma string')
    }
  
    if (!cliente.salario) {
      throw new BadRequestException('Campo "salario" é obrigatório')
    }
  
    if (!cliente.valorEmpresa) {
      throw new BadRequestException('Campo "empresa" é obrigatório')
    }

    if (!cliente.usuario) {
        throw new BadRequestException('Campo "usuario id" é obrigatório')
    }
}
