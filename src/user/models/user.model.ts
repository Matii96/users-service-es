import { AggregateRoot } from '@nestjs/cqrs';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { GetUserDto } from '../dto/get.dto';
import { ModifyUserDto } from '../dto/modify.dto';
import { UserCreatedEvent } from '../events/user-created/user-created.event';
import { UserLoggedInEvent } from '../events/user-logged-in/user-logged-in.event';
import { UserRemovedEvent } from '../events/user-removed/user-removed.event';
import { UserUpdatedEvent } from '../events/user-updated/user-data-updated.event';

export class UserAggregate extends AggregateRoot {
  public constructor(public readonly data: User | undefined) {
    super();
  }

  public get dataFormatted(): GetUserDto {
    return {
      id: this.data.id,
      name: this.data.name,
      fullName: this.data.fullName,
      description: this.data.description,
      email: this.data.email,
      lang: this.data.lang,
      active: this.data.active,
      emailNotification: this.data.emailNotification,
      createdAt: this.data.createdAt,
      updatedAt: this.data.updatedAt
    };
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.data.password);
  }

  create(data: ModifyUserDto) {
    this.apply(new UserCreatedEvent(data));
  }

  update(data: ModifyUserDto) {
    this.apply(new UserUpdatedEvent(this.data.id, data));
  }

  addLoginHistory(address: string, browser: string) {
    this.apply(new UserLoggedInEvent(this.data.id, address, browser));
  }

  delete() {
    this.apply(new UserRemovedEvent(this.data.id));
  }
}
