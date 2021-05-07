import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRepo } from 'src/user/repository/user.repository';
import { UserGreetedEvent } from './user-greeted.event';

@EventsHandler(UserGreetedEvent)
export class UserGreetedHandler implements IEventHandler<UserGreetedEvent> {
  private logger: Logger;

  public constructor(private readonly userRepository: UserRepo) {
    this.logger = new Logger(UserGreetedHandler.name);
  }

  public async handle(event: UserGreetedEvent) {
    const user = await this.userRepository.findById(event.userId);
    this.logger.log(`Welcome ${user.data.name} :)`);
    // TODO: send email
  }
}
