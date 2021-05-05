import { IEvent } from '@nestjs/cqrs';
import { ModifyUserDto } from 'src/user/dto/modify.dto';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly data: ModifyUserDto) {}
}
