import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Ticket } from './ticket.type';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    private tickets: Ticket[] = []

    findAll() {
        return this.tickets
    }

    findOne(id: string) {
        const ticket = this.tickets.find(ticket => ticket.id === id)
        if (!ticket) {
            throw new NotFoundException(`Ticket with id ${id} not found`)
        }
        return ticket
    }


    create(input: CreateTicketDto): Ticket {
    const now = new Date().toISOString();
    const ticket: Ticket = {
      id: randomUUID(),
      title: input.title,
      description: input.description,
      priority: input.priority ?? "MEDIUM",
      status: "OPEN",
      createdAt: now,
      updatedAt: now,
    };
    this.tickets.push(ticket);
    return ticket;
  }

    update(id: string, input: UpdateTicketDto): Ticket {
        const ticket = this.findOne(id)
        ticket.title = input.title ?? ticket.title
        ticket.description = input.description ?? ticket.description
        ticket.priority = input.priority ?? ticket.priority
        ticket.updatedAt = new Date().toISOString()
        return ticket

    }

}
