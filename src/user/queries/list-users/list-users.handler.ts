import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from './list-users.query';
import { GetUserDto } from 'src/user/dto/get.dto';
import { UserRepo } from 'src/user/repository/user.repository';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  public constructor(private readonly userRepository: UserRepo) {}

  public async execute(): Promise<GetUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => user.dataFormatted);
  }
}
