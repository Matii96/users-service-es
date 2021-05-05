import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { RemoveUserCommand } from './remove-user.command';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements IQueryHandler<RemoveUserCommand> {
  public constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: RemoveUserCommand) {
    const user = this.publisher.mergeObjectContext(command.user);
    user.delete();
    user.commit();
    return user.dataFormatted;
  }
}
