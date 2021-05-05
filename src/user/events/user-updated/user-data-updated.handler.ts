import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserUpdatedEvent } from './user-data-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserDataUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async handle(event: UserUpdatedEvent) {
    await this.userRepository.updateUser(event.id, event.data);
  }
}
