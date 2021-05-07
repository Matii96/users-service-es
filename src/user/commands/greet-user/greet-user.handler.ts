import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { UserRepo } from 'src/user/repository/user.repository';
import { GreetUserCommand } from './greet-user.command';

@CommandHandler(GreetUserCommand)
export class GreetUserHandler implements IQueryHandler<GreetUserCommand> {
  public constructor(private readonly publisher: EventPublisher, private readonly userRepository: UserRepo) {}

  public async execute(command: GreetUserCommand) {
    const user = this.publisher.mergeObjectContext(await this.userRepository.findByLogin(command.userName));
    user.greet(user.data.id);
    user.commit();
  }
}
