import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { UserCommandController } from './user-command.controller';
import { UserQueryController } from './user-query.controller';
import { UserRepo } from './repository/user.repository';
import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
import { UserEventHandlers } from './events';
import { UserEntities } from './entities';
import { UserSagas } from './sagas/user.sagas';

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature(UserEntities), DatabaseModule],
  controllers: [UserQueryController, UserCommandController],
  providers: [UserRepo, ...UserCommandHandlers, ...UserQueryHandlers, ...UserEventHandlers, UserSagas]
})
export class UserModule {}
