import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IRequestEvent } from '../interfaces/request.interface';
import { Event } from '../repository/event.entity';

@Injectable()
export class AccessEvent implements CanActivate {
  public constructor(@InjectModel(Event) private readonly events: typeof Event) {}

  private CheckAccess(id: string): Promise<Event> {
    return new Promise(async (resolve, reject) => {
      try {
        const event = await this.events.findByPk(id);
        if (!event) {
          throw new NotFoundException();
        }
        resolve(event);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IRequestEvent = context.switchToHttp().getRequest();
    if (!req.params.id) {
      return true;
    }
    const event = await this.CheckAccess(req.params.id);
    req.event = event;
    return true;
  }
}
