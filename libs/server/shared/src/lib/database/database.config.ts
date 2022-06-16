export const databaseConfig = () => ({
  database: {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
  },
});
