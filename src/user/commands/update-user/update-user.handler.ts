import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { GetUserDto } from 'src/user/dto/get.dto';
import { UserAggregate } from 'src/user/models/user.model';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements IQueryHandler<UpdateUserCommand> {
  public constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: UpdateUserCommand): Promise<GetUserDto> {
    const user = this.publisher.mergeObjectContext(command.user);
    user.update(command.data);
    user.commit();
    return user.dataFormatted;
  }
}
