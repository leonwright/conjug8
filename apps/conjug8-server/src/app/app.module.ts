import { ServerDictionaryModule } from '@conjug8/server/dictionary';
import { ServerSharedModule } from '@conjug8/server/shared';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ServerSharedModule, ServerDictionaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
