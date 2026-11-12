import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Ticket } from './ticket.type';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.tickets.findMany({orderBy: [{ createdAt: 'desc' }, { id: 'desc' }]});
    }
    
    async create(dto: CreateTicketDto){
        return this.prisma.tickets.create({ data: dto });
    }

    async findOne(id: string) {
        const ticket = await this.prisma.tickets.findUnique({ where: { id } });
        if (!ticket) {
            throw new NotFoundException(`Ticket with id ${id} not found`)
        }
        return ticket
    }

    async update(id: string, dto: UpdateTicketDto) {
        if (dto.title === undefined 
            && dto.description === undefined
            && dto.priority === undefined) {
            throw new BadRequestException('Envía title o description');
        }
        try {
            return await this.prisma.tickets.update({ where: { id }, data: dto });
        } catch (error: unknown) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException('La nota no existe');
            }
            throw error;
        }

    }

}
