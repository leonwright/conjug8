import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { TenseMood } from './interfaces/tense_mood.interface';
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

  async getRandomTenseMoodCombination(): Promise<TenseMood> {
    this.logger.log('Getting combinations...');
    const result: any[] = await this.dictionaryModel.aggregate([
      {
        $group: {
          _id: {
            mood_english: '$mood_english',
            tense_english: '$tense_english',
          },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    return {
      tense: result[0]._id.tense_english,
      mood: result[0]._id.mood_english,
    };
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

  async findAllTenseMoodCombinations(): Promise<TenseMood[]> {
    this.logger.log('Getting combinations...');
    const result: any[] = await this.dictionaryModel.aggregate([
      {
        $group: {
          _id: {
            mood_english: '$mood_english',
            tense_english: '$tense_english',
          },
        },
      },
    ]);

    return result.map((r) => ({
      tense: r._id.tense_english,
      mood: r._id.mood_english,
    }));
  }
}
