import { User } from 'src/app_modules/user/entities/user.entity';

export interface LoginResult {
  user: User;
  payload: {
    expire: Date;
    accress_token: string;
  };
}
