import { Request } from 'express';
import { Event } from '../repository/event.entity';

export interface IRequestEvent extends Request {
  event: Event;
}
