import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeConfigFactory } from './database/sequelize-config.factory';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EventStoreModule } from './event-store/event-store.module';
import config from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: SequelizeConfigFactory
    }),
    UserModule,
    DatabaseModule,
    EventStoreModule
  ]
})
export class AppModule {}
