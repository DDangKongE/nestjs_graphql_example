import { Module, Global } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import * as path from 'path';

@Global()
@Module({
  imports: [],
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
  exports: [ConfigService],
})
export class SharedModule {}
