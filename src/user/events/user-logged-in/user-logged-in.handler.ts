import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { LoginHistory } from 'src/user/entities/user-login-history.model';
import { UserLoggedInEvent } from './user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent> {
  public constructor(@InjectModel(LoginHistory) private readonly loginHistory: typeof LoginHistory) {}

  public async handle(event: UserLoggedInEvent) {
    await this.loginHistory.create(event);
  }
}
