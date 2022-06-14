import { DatabaseModule } from '@conjug8/server/shared';
import { Module } from '@nestjs/common';
import { dictionaryProviders } from './dictionary.providers';
import { ServerDictionaryController } from './server-dictionary.controller';
import { ServerDictionaryService } from './server-dictionary.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServerDictionaryController],
  providers: [ServerDictionaryService, ...dictionaryProviders],
  exports: [ServerDictionaryService, ...dictionaryProviders],
})
export class ServerDictionaryModule {}
