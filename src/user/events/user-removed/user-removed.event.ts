import { IEvent } from '@nestjs/cqrs';

export class UserRemovedEvent implements IEvent {
  constructor(public readonly id: number) {}
}
