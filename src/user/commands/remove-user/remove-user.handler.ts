import { CommandHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { RemoveUserCommand } from './remove-user.command';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements IQueryHandler<RemoveUserCommand> {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly publisher: EventPublisher
  ) {}

  public async execute(command: RemoveUserCommand) {
    await this.userModel.destroy({ where: { id: command.id } });
  }
}
