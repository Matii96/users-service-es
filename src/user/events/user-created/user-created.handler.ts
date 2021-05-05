import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { UserRepository } from 'src/user/repository/user.repository';

@EventsHandler(UserCreatedEvent)
export class UserDataUpdatedHandler implements IEventHandler<UserCreatedEvent> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async handle(event: UserCreatedEvent) {
    await this.userRepository.createUser(event.data);
  }
}
