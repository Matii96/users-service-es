import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { GreetUserCommand } from '../commands/greet-user/greet-user.command';
import { UserCreatedEvent } from '../events/user-created/user-created.event';

@Injectable()
export class UserSagas {
  @Saga()
  userCreated = (events$: Observable<any>) =>
    events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map(event => new GreetUserCommand(event.data.name))
    );
}
