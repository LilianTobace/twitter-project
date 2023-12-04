import Tweet, { TweetBatches, TweetCounts } from '../../../interface/tweet';
import { TweetModel } from '../../models/Tweet';
import ArchivedTweetRepo from '../archived-tweet';
import TweetCountRepo from '../tweetcount/TweetCountRepo';

export default class TweetRepo {
  /**
   * Creates a new tweet.
   *
   * @param tweetData The tweet data.
   * @returns A Promise that resolves when the tweet has been created.
   */
  public static async createTweet(tweetData: Tweet): Promise<Tweet> {
    try {
      const newTweet = await TweetModel.create(tweetData);
      await newTweet.save();
      await TweetCountRepo.updateCount();
      await ArchivedTweetRepo.archiveIfNeeded();
      return newTweet;
    } catch (error: any | string) {
      console.error('createTweet: ', error);
      throw new Error(error.message);
    }
  }

  /**
 * Retrieves the oldest tweet.
 *
 * @returns A Promise that resolves to the oldest tweet.
 */
  public static async getOldestTweet(): Promise<Tweet> {
    try {
      const tweet = await TweetModel.findOne().sort({ timestamp: 1 });
      if (!tweet) throw new Error('No tweet found');
      return tweet;
    } catch (error: any | string) {
      console.error('getOldestTweet: ', error);
      throw new Error(error.message);
    }
  }

  /**
 * Deletes the oldest tweet.
 *
 * @returns A Promise that resolves when the oldest tweet has been deleted.
 */
  public static async deleteOldestTweet(): Promise<any> {
    try {
      return await TweetModel.deleteOne().sort({ timestamp: 1 });
    } catch (error: any | string) {
      console.error('deleteOneTweet: ', error);
      throw new Error(error.message);
    }
  }

  /**
 * Retrieves tweets grouped by time windows.
 *
 * @returns A Promise that resolves to an object containing tweets grouped by their corresponding time windows.
 */
  public static async getTweetsInBatches(): Promise<TweetBatches> {
    try {
      const tweets = await TweetModel.find().sort({ epoch: 1 });
      const batches: TweetBatches = {};

      tweets.forEach((tweet) => {
        const window = this.getTimestampWindow(tweet.epoch);
        if (!batches[window]) batches[window] = [];
        batches[window].push(tweet);
      });

      return batches;
    } catch (error: any | string) {
      console.error('getTweetsInBatches: ', error);
      throw new Error(error.message);
    }
  }

  /**
   * Returns a string in the format HH:mm-HH:mm
   * @param epoch The epoch of the tweet
  */
  private static getTimestampWindow(epoch: string): string {
    const TIME_WINDOW_MINUTES = process.env.TIME_WINDOW_MINUTES as unknown as number;

    // Formats the date to a string in the format HH:mm
    function format(date: Date) {
      return date.toISOString().slice(11, 16); // Formatted date string without seconds
    }

    try {
      const date = new Date(Number(epoch));

      // Get date parts
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Start of window
      const roundedMinutes = Math.floor(minutes / TIME_WINDOW_MINUTES) * TIME_WINDOW_MINUTES;
      const start = new Date(year, month, day, hours, roundedMinutes);

      // End of window
      const end = new Date(start.getTime());
      end.setMinutes(end.getMinutes() + TIME_WINDOW_MINUTES);

      return `${format(start)}-${format(end)}`;
    } catch (error: any | string) {
      console.error('getTimestampWindow: ', error);
      throw new Error(error.message);
    }
  }

  /**
   * Gets the count of tweets grouped by time window
   * from the batches returned by getTweetsInBatches
  */
  public static async getTweetsInBatchesCount(): Promise<TweetCounts> {
    try {
      const counts: TweetCounts = {};
      const batches = await TweetRepo.getTweetsInBatches();
      Object.keys(batches).forEach((timeWindow) => {
        counts[timeWindow] = batches[timeWindow].length;
      });
      return counts;
    } catch (error: any) {
      console.error('getTweetsInBatchesCount: ', error);
      throw new Error(error.message);
    }
  }
}
