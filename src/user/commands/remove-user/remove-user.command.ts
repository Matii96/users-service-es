import { ICommand } from '@nestjs/cqrs';
import { UserAggregate } from 'src/user/models/user.model';

export class RemoveUserCommand implements ICommand {
  public constructor(public readonly user: UserAggregate) {}
}
