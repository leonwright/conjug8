import { DictionarySchema } from './schemas/dictionary.schema';

export const dictionaryProviders = [
  {
    provide: 'DICTIONARY_MODEL',
    useFactory: (connection) =>
      connection.model('Dictionary', DictionarySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
