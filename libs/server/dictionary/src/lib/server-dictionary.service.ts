import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Dictionary } from './schemas/dictionary.schema';

@Injectable()
export class ServerDictionaryService {
  private readonly logger = new Logger(ServerDictionaryService.name);
  constructor(
    @Inject('DICTIONARY_MODEL')
    private dictionaryModel: Model<Dictionary>
  ) {}

  async getRandomVerb(): Promise<Dictionary> {
    this.logger.log(`Looking for random verb...`);
    const result: Dictionary = (
      await this.dictionaryModel.aggregate([{ $sample: { size: 1 } }]).exec()
    )[0];
    this.logger.log(`Found verb "${result.infinitive}"`);
    return result;
  }

  async getRandomVerbByTenseAndMood(
    tense: string,
    mood: string
  ): Promise<Dictionary> {
    this.logger.log(
      `Looking for random verb with Tense: ${tense} and Mood: ${mood}...`
    );
    const result: Dictionary = (
      await this.dictionaryModel
        .aggregate([
          { $match: { tense_english: tense, mood_english: mood } },
          { $sample: { size: 1 } },
        ])
        .exec()
    )[0];

    this.logger.log(`Found verb "${result.infinitive}"`);

    return result;
  }

  async findByVerb(verb: string): Promise<Dictionary[]> {
    this.logger.log(`Looking for verb "${verb}"`);
    const res = await this.dictionaryModel.find({ infinitive: verb }).exec();
    return res;
  }

  async findVerbByTenseAndMood(
    verb: string,
    tense: string,
    mood: string
  ): Promise<Dictionary> {
    this.logger.log(verb, tense, mood);
    this.logger.log(
      `Looking for verb "${verb}" with Tense: ${tense} and Mood: ${mood}`
    );
    const res = await this.dictionaryModel
      .findOne({
        infinitive: verb,
        mood_english: mood,
        tense_english: tense,
      })
      .exec();
    this.logger.log(res);
    return res;
  }
}
