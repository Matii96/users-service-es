import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './repository/event.entity';

@Module({
  imports: [SequelizeModule.forFeature([Event])]
})
export class EventStoreModule {}
