import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://127.0.0.1:6050/conjug8?readPreference=primary&ssl=false'
      ),
  },
];
