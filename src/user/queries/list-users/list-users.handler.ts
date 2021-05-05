import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from './list-users.query';
import { GetUserDto } from 'src/user/dto/get.dto';
import { UserRepository } from 'src/user/repository/user.repository';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(): Promise<GetUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => user.dataFormatted);
  }
}
