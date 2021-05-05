import { UserCreatedEvent } from './user-created/user-created.event';
import { UserUpdatedEvent } from './user-updated/user-data-updated.event';
import { UserLoggedInEvent } from './user-logged-in/user-logged-in.event';
import { UserRemovedEvent } from './user-removed/user-removed.event';

export const UserEventHandlers = [UserCreatedEvent, UserUpdatedEvent, UserLoggedInEvent, UserRemovedEvent];
