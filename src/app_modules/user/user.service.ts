import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(findData: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(findData);
  }
}
