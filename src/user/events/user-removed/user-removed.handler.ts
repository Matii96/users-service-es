import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRepo } from 'src/user/repository/user.repository';
import { UserRemovedEvent } from './user-removed.event';

@EventsHandler(UserRemovedEvent)
export class UserRemovedHandler implements IEventHandler<UserRemovedEvent> {
  public constructor(private readonly userRepository: UserRepo) {}

  public async handle(event: UserRemovedEvent) {
    await this.userRepository.deleteUser(event.id);
  }
}
