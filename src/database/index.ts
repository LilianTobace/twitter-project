import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Connects to the MongoDB database using Mongoose.
 *
 * @returns {Promise<Connection>} - A Promise resolving to a Mongoose Connection object representing the established database connection.
 * @async
 * @default
 * @exports
 */
export default async function connectDatabase(): Promise<Connection> {
  const host = process.env.HOST;
  const dbName = process.env.DBNAME;
  const uri = process.env.URI as unknown as string;

  try {
    console.info(`Connecting to MongoDB (mongodb://${host}/${dbName}) using Mongoose...`);
    await mongoose.connect(uri);
    console.info('Connection established succesfully.');
    return mongoose.connection;
  } catch (error: any | string) {
    console.error('Could not connect to DB', error);
    throw new Error(error.message);
  }
}
