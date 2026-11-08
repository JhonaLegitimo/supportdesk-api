import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';

@Module({ controllers: [AppController], providers: [AppService], imports: [TicketsModule] })
export class AppModule {}
