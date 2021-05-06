import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { GetEventDto } from './dto/get.dto';
import { Event } from './repository/event.entity';

@Injectable()
export class EventStoreService {
  public constructor(@InjectModel(Event) private readonly events: typeof Event) {}

  public Get(event: Event): GetEventDto {
    return { id: event.id, name: event.name, json: event.json, createdAt: event.createdAt };
  }

  public async List() {
    const events = await this.events.findAll({ attributes: ['id', 'name', 'json', 'createdAt'] });
    return events.map(this.Get);
  }

  public async RegisterEvent(event: IEvent) {
    await this.events.create({ name: event.constructor.name, json: event });
  }
}
