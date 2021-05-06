import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op } from 'sequelize';
import { DatabaseService } from 'src/database/database.service';
import { ModifyUserDto } from '../dto/modify.dto';
import { UserAggregate } from '../models/user.model';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepo {
  public constructor(
    private readonly sequelize: Sequelize,
    private readonly databaseService: DatabaseService,
    @InjectModel(User) private readonly userEntity: typeof User
  ) {}

  async findById(id: number) {
    const userEntity = await this.userEntity.findByPk(id, { raw: true });
    if (!userEntity) {
      throw new NotFoundException();
    }
    return new UserAggregate(userEntity);
  }

  async findByLogin(nameOrEmail: string) {
    const userEntity = await this.userEntity.findOne({
      where: {
        [Op.or]: [{ name: nameOrEmail }, { email: nameOrEmail }],
        password: { [Op.ne]: null },
        active: true
      },
      raw: true
    });
    if (!userEntity) {
      throw new UnauthorizedException();
    }
    return new UserAggregate(userEntity);
  }

  async findAll() {
    const users = await this.userEntity.findAll({ raw: true });
    return users.map(userEntity => new UserAggregate(userEntity));
  }

  async createUser(data: ModifyUserDto) {
    let userEntity: User;
    try {
      userEntity = await this.userEntity.create(data, { raw: true });
    } catch (err) {
      this.databaseService.HandleDatabaseError(err);
    }
    return new UserAggregate(userEntity);
  }

  async updateUser(id: number, data: ModifyUserDto) {
    return this.sequelize.transaction(async t => {
      try {
        await this.userEntity.update(data, { where: { id }, transaction: t });
      } catch (err) {
        this.databaseService.HandleDatabaseError(err);
      }
      return new UserAggregate(await this.userEntity.findByPk(id, { transaction: t, raw: true }));
    });
  }

  async deleteUser(id: number) {
    const user = await this.findById(id);
    await this.userEntity.destroy({ where: { id } });
    return user;
  }
}
