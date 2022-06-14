import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DictionaryDocument = Dictionary & Document;

@Schema({ collection: 'verbs' })
export class Dictionary {
  @Prop()
  infinitive: string;

  @Prop()
  infinitive_english: string;

  @Prop()
  mood: string;

  @Prop()
  mood_english: string;

  @Prop()
  tense: string;

  @Prop()
  tense_english: string;

  @Prop()
  verb_english: string;

  @Prop()
  form_1s: string;

  @Prop()
  form_2s: string;

  @Prop()
  form_3s: string;

  @Prop()
  form_1p: string;

  @Prop()
  form_2p: string;

  @Prop()
  form_3p: string;

  @Prop()
  gerund: string;

  @Prop()
  gerund_english: string;

  @Prop()
  pastparticiple: string;

  @Prop()
  pastparticiple_english: string;
}

export const DictionarySchema = SchemaFactory.createForClass(Dictionary);
