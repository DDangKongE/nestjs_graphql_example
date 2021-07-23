import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
