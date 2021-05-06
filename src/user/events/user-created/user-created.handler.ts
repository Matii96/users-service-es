import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { UserRepo } from 'src/user/repository/user.repository';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  public constructor(private readonly userRepository: UserRepo) {}

  public async handle(event: UserCreatedEvent) {
    await this.userRepository.createUser(event.data);
  }
}
