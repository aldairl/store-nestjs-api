import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database, uri } = configService.mongo;
        return { uri, dbName: database };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
