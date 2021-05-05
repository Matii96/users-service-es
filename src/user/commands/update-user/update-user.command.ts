import { ICommand } from '@nestjs/cqrs';
import { ModifyUserDto } from 'src/user/dto/modify.dto';
import { UserAggregate } from 'src/user/models/user.model';

export class UpdateUserCommand implements ICommand {
  public constructor(public user: UserAggregate, public data: ModifyUserDto) {}
}
