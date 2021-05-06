import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements IQueryHandler<UpdateUserCommand> {
  public constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: UpdateUserCommand) {
    const user = this.publisher.mergeObjectContext(command.user);
    user.update(command.data);
    user.commit();
  }
}
