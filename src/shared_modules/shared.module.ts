import { Module, Global } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.getNumber('JWT_ACCESS_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        path.resolve(
          process.env.NODE_ENV === undefined
            ? '.env'
            : `${process.env.NODE_ENV}.env`,
        ),
      ),
    },
  ],
  exports: [JwtModule, ConfigService],
})
export class SharedModule {}
