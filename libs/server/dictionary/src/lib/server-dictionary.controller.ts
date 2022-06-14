import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { Tense } from './enums/tense.enum';
import { Dictionary } from './schemas/dictionary.schema';
import { ServerDictionaryService } from './server-dictionary.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Mood } from './enums/mood.enum';

@ApiTags('dictionary')
@Controller('dictionary')
export class ServerDictionaryController {
  private readonly logger = new Logger(ServerDictionaryController.name);

  constructor(private serverDictionaryService: ServerDictionaryService) {}

  @Get('random')
  @ApiQuery({ name: 'tense', enum: Tense })
  @ApiQuery({ name: 'mood', enum: Mood })
  async getRandomVerb(
    @Query('mood') mood: Mood,
    @Query('tense') tense: Tense
  ): Promise<Dictionary> {
    if (!mood && !tense)
      return await this.serverDictionaryService.getRandomVerb();
    else
      return await this.serverDictionaryService.getRandomVerbByTenseAndMood(
        tense,
        mood
      );
  }

  @Get(':word')
  async search(
    @Param() dto,
    @Query('mood') mood: string,
    @Query('tense') tense: string
  ): Promise<Dictionary> {
    return this.serverDictionaryService.findVerbByTenseAndMood(
      dto.word,
      tense,
      mood
    );
  }
}
