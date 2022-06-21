import { Mood, Tense } from '../enums';

export interface TenseMood {
  tense: Tense | null;
  mood: Mood | null;
}
