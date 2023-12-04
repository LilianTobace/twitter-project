import { TweetCountModel } from '../../models/TweetCount';

export default class TweetCountRepo {
  /**
  * Updates the tweet count by the specified amount.
  *
  * @param tweetCount The amount to increment the tweet count by. Default is 1.
  * @returns A Promise that resolves when the count has been updated.
  */
  public static async updateCount(tweetCount = 1): Promise<void> {
    try {
      await TweetCountModel.updateOne(
        {},
        { $inc: { tweetCount } },
        { upsert: true },
      );
    } catch (error: any | string) {
      console.error('TweetCountRepo: ', error);
      throw new Error(error.message);
    }
  }

  /**
   * Retrieves the current tweet count.
   *
   * @returns A Promise that resolves to the current tweet count.
   */
  public static async getCount(): Promise<number> {
    try {
      const countDoc = await TweetCountModel.findOne();
      if (!countDoc) return 0;
      return countDoc.tweetCount;
    } catch (error: any | string) {
      console.error('getCount: ', error);
      throw new Error(error.message);
    }
  }
}
