import { CreateUserHandler } from './create-user/create-user.handler';
import { GreetUserHandler } from './greet-user/greet-user.handler';
import { RemoveUserHandler } from './remove-user/remove-user.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';

export const UserCommandHandlers = [CreateUserHandler, GreetUserHandler, UpdateUserHandler, RemoveUserHandler];
