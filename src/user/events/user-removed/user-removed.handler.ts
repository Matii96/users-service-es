import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserRemovedEvent } from './user-removed.event';

@EventsHandler(UserRemovedEvent)
export class UserDataUpdatedHandler implements IEventHandler<UserRemovedEvent> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async handle(event: UserRemovedEvent) {
    await this.userRepository.deleteUser(event.id);
  }
}
