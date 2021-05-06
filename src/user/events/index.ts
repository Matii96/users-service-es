import { UserCreatedHandler } from './user-created/user-created.handler';
import { UserUpdatedHandler } from './user-updated/user-data-updated.handler';
import { UserLoggedInHandler } from './user-logged-in/user-logged-in.handler';
import { UserRemovedHandler } from './user-removed/user-removed.handler';
import { UserCreatedEvent } from './user-created/user-created.event';
import { UserUpdatedEvent } from './user-updated/user-data-updated.event';
import { UserLoggedInEvent } from './user-logged-in/user-logged-in.event';
import { UserRemovedEvent } from './user-removed/user-removed.event';

export const UserEventHandlers = [UserCreatedHandler, UserUpdatedHandler, UserLoggedInHandler, UserRemovedHandler];
export const UserEvents = [UserCreatedEvent, UserUpdatedEvent, UserLoggedInEvent, UserRemovedEvent];
