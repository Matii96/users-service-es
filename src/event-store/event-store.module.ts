import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './repository/event.entity';
import { EventStoreController } from './event-store.controller';
import { EventStoreService } from './event-store.service';
import { UserEntities } from 'src/user/entities';

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([Event, ...UserEntities])],
  controllers: [EventStoreController],
  providers: [EventStoreService]
})
export class EventStoreModule implements OnModuleInit {
  public constructor(private readonly eventBus: EventBus, private readonly eventStoreService: EventStoreService) {}

  public onModuleInit(): void {
    this.eventBus.subscribe(this.eventStoreService.RegisterEvent.bind(this.eventStoreService));
  }
}
