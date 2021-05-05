import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { UserCommandController } from './user-command.controller';
import { UserQueryController } from './user-query.controller';
import { UserRepository } from './repository/user.repository';
import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
import { UserEventHandlers } from './events';
import { UserEntities } from './entities';

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature(UserEntities), DatabaseModule],
  controllers: [UserQueryController, UserCommandController],
  providers: [UserRepository, ...UserCommandHandlers, ...UserQueryHandlers, ...UserEventHandlers]
})
export class UserModule {}
