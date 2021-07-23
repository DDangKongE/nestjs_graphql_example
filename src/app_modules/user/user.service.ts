import { HttpStatus, Injectable } from '@nestjs/common';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { FindConditions } from 'typeorm';
import { UserLoginInput } from '../auth/dto/user_login.input';
import { TokenPayload, User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../auth/dto/create_user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(findData: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(findData);
  }

  count(findData: FindConditions<User>): Promise<number> {
    return this.userRepository.count(findData);
  }

  async createUser(user: CreateUserInput) {
    return this.userRepository.insert(user);
  }
}
