import csv from 'csvtojson';
import * as fs from 'fs';
import * as path from 'path';
import Tweet from '../../../interface/tweet';
import TweetController from '../../../controllers/tweet.controller';

export default class DataStreamRepo {
  /**
   * Read File as Stream Simulator
   * Processes a CSV file containing tweet data and saves each tweet to the database.
   *
   * @returns A Promise that resolves to void if the processing is successful, or to a
   * string containing an error message if an error occurs.
   */
  public static async processDataStream(): Promise<void | string> {
    try {
      const csvFilePath = path.resolve(__dirname, './114k_records_dataset_2020_04_15_Covid_Tweets.csv');
      // const csvFilePath = path.resolve(__dirname, './original_dataset_2020_04_15_Covid_Tweets.csv');
      const stream = fs.createReadStream(csvFilePath);
      const jsonArray = await csv().fromStream(stream);
      for (let i = 0; i < jsonArray.length; i += 1) {
        await TweetController.createTweet(jsonArray[i] as Tweet);
      }
    } catch (error: any | string) {
      console.error('processDataStream: ', error);
      throw new Error(error.message);
    }
  }
}
