import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.ticketsService.findOne(id)
  }

  @Post()
  create(@Body() ticket: CreateTicketDto){
    return this.ticketsService.create(ticket)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ticket: UpdateTicketDto){
    return this.ticketsService.update(id, ticket)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string){
    return this.ticketsService.remove(id)
  }


}
