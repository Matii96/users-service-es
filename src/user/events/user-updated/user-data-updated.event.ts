import { IEvent } from '@nestjs/cqrs';
import { ModifyUserDto } from 'src/user/dto/modify.dto';

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly id: number, public readonly data: ModifyUserDto) {}
}
