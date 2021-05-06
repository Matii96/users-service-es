import { UserCreatedHandler } from './user-created/user-created.handler';
import { UserUpdatedHandler } from './user-updated/user-data-updated.handler';
import { UserLoggedInHandler } from './user-logged-in/user-logged-in.handler';
import { UserRemovedHandler } from './user-removed/user-removed.handler';

export const UserEventHandlers = [UserCreatedHandler, UserUpdatedHandler, UserLoggedInHandler, UserRemovedHandler];
