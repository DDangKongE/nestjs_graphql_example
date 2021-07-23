import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user_login.input';
import { TokenPayload, User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserInput } from './dto/create_user.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => TokenPayload)
  async login(@Args('userLoginInput') userLoginInput: UserLoginInput) {
    const result = await this.authService.validateUser(userLoginInput);

    return result;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.authService.checkUseNickname(createUserInput.usr_nickname);

    return await this.authService.createUser(createUserInput);
  }
}
