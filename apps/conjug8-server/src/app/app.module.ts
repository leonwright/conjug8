import { ServerDictionaryModule } from '@conjug8/server/dictionary';
import { databaseConfig, ServerSharedModule } from '@conjug8/server/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    ServerSharedModule,
    ServerDictionaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
