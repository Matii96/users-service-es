import { IEvent } from '@nestjs/cqrs';

export class UserGreetedEvent implements IEvent {
  constructor(public readonly userId: number) {}
}
