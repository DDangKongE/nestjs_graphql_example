import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user_login.input';
import { LoginPayload } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => LoginPayload)
  async login(@Args('userLoginInput') userLoginInput: UserLoginInput) {
    const user = await this.userService.findOne({
      usr_nickname: userLoginInput.usr_nickname,
      usr_password: userLoginInput.usr_password,
    });
    return {
      user,
      token: {
        expiresIn: 100,
        accessToken: 'asdsadsadasda',
      },
    };
  }
}
