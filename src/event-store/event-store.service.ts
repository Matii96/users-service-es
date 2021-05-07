import { Injectable } from '@nestjs/common';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { GetEventDto } from './dto/get.dto';
import { Event } from './repository/event.entity';
import { Events } from './events-list';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EventStoreService {
  public constructor(
    private readonly eventBus: EventBus,
    @InjectModel(Event) private readonly events: typeof Event,
    @InjectModel(User) private readonly userEntity: typeof User
  ) {}

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

  public async MakeProjection(upTo: Date) {
    // Drop all users
    await this.userEntity.destroy({ where: { id: { [Op.ne]: null } } });

    // Get events up to given moment
    const storeEvents = await this.events.findAll({
      attributes: ['name', 'json'],
      where: { createdAt: { [Op.lte]: upTo } },
      order: [['createdAt', 'ASC']]
    });

    // Publish events from the store again
    for (let storeEvent of storeEvents) {
      for (let Event of Events) {
        if (Event.name === storeEvent.name) {
          // @ts-ignore
          const eventToPublish = new Event(...Object.values(storeEvent.json));
          this.eventBus.publish(eventToPublish);
          break;
        }
      }
    }
  }
}
