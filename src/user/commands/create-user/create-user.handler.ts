import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { UserAggregate } from 'src/user/models/user.model';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand> {
  public constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: CreateUserCommand) {
    const user = this.publisher.mergeObjectContext(new UserAggregate(undefined));
    user.create(command.data);
    user.commit();
  }
}
