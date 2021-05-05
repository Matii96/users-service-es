import { IEvent } from '@nestjs/cqrs';

export class UserLoggedInEvent implements IEvent {
  constructor(public readonly userId: number, public readonly address: string, public readonly browser: string) {}
}
