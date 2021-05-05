import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { IRequestUser } from '../interfaces/request.interface';
import { UserAggregate } from '../models/user.model';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AccessUser implements CanActivate {
  public constructor(private readonly userRepository: UserRepository) {}

  private CheckAccess(id: string): Promise<UserAggregate> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findById(parseInt(id));
        if (!user) {
          throw new NotFoundException();
        }
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IRequestUser = context.switchToHttp().getRequest();
    if (!req.params.id) {
      return true;
    }
    const user = await this.CheckAccess(req.params.id);
    req.user = user;
    return true;
  }
}
