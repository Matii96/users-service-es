import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './repository/event.entity';
import { EventStoreController } from './event-store.controller';
import { EventStoreService } from './event-store.service';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventStoreController],
  providers: [EventStoreService]
})
export class EventStoreModule {}
