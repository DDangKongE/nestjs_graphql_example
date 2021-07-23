import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { GlobalException } from 'src/common/exceptions/global_exception';
import { UserLoginInput } from '../auth/dto/user_login.input';
import * as bcrypt from 'bcrypt';
import { TokenPayload, User } from '../user/entities/user.entity';
import { ConfigService } from 'src/shared_modules/services/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(body: UserLoginInput): Promise<any> {
    const user = await this.userService.findOne({
      usr_nickname: body.usr_nickname,
    });

    if (!user) {
      throw new GlobalException({
        statusCode: HttpStatus.NOT_FOUND,
        responseCode: Number(`${HttpStatus.NOT_FOUND}99`),
        msg: '존재하지 않는 유저 입니다.',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      body.usr_password,
      user.usr_password,
    );

    console.log(body.usr_password);
    console.log(user.usr_password);

    if (isPasswordValid) {
      return await this.createToken(user);
    } else {
      throw new GlobalException({
        statusCode: HttpStatus.BAD_REQUEST,
        responseCode: Number(`${HttpStatus.BAD_REQUEST}99`),
        msg: '사용자 정보가 올바르지 않습니다.',
      });
    }
  }

  async createToken(user: User): Promise<TokenPayload> {
    const access_token = await this.getJwtAccessToken(user.usr_id);

    return {
      user,
      token: {
        expires_in: this.configService.getNumber('JWT_ACCESS_EXPIRATION_TIME'),
        access_token: access_token,
      },
    };
  }

  async getJwtAccessToken(usr_id: number) {
    const user = await this.userService.findOne({ usr_id });

    return this.jwtService.signAsync({
      usr_id: user.usr_id,
      usr_nickname: user.usr_nickname,
      register_date: user.register_date,
    });
  }

  async checkUseNickname(usr_nickname: string) {
    const isNickname = await this.userService.count({
      usr_nickname: usr_nickname,
    });

    if (isNickname > 0) {
      throw new GlobalException({
        statusCode: HttpStatus.BAD_REQUEST,
        responseCode: Number(`${HttpStatus.BAD_REQUEST}99`),
        msg: '이미 사용중인 닉네임 입니다..',
      });
    }
  }

  async createUser(user: UserLoginInput) {
    const hash = await bcrypt.hash(user.usr_password, 10);
    const register = await this.userService.createUser({
      usr_nickname: user.usr_nickname,
      usr_password: hash,
    });
    return this.userService.findOne({
      usr_id: register.identifiers[0].usr_id,
    });
  }
}
