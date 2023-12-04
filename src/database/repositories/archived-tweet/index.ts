import dotenv from 'dotenv';
import Tweet from '../../../interface/tweet';
import { ArchivedTweetModel } from '../../models/ArchivedTweet';
import TweetRepo from '../tweet/TweetRepo';
import TweetCountRepo from '../tweetcount/TweetCountRepo';

dotenv.config();

export default class ArchivedTweetRepo {
  /**
 * Checks if the maximum number of unarchived tweets has been reached, and if so, archives the oldest tweet.
 *
 * @returns A Promise that resolves when the archiving process is complete.
 */
  public static async archiveIfNeeded(): Promise<void> {
    const MAX_TWEETS_BEFORE_ARCHIVE = process.env.MAX_TWEETS_BEFORE_ARCHIVE as unknown as number;

    try {
      const unarchivedTweetCount = await TweetCountRepo.getCount();
      if (unarchivedTweetCount >= MAX_TWEETS_BEFORE_ARCHIVE) {
        // Archive oldest tweet
        console.log('Maximum number of live tweets reached, moving oldest tweet to Archive.');
        const oldestTweet = await TweetRepo.getOldestTweet();
        await this.archiveTweet(oldestTweet, new Date());

        // Remove tweet from live collection and update counter
        await TweetRepo.deleteOldestTweet();
        await TweetCountRepo.updateCount(-1);
      }
    } catch (error: any) {
      console.error('Error adding Archived Tweet', error);
      throw new Error(error.message);
    }
  }

  /**
 * Archives a single tweet to the `ArchivedTweet` collection.
 *
 * @param tweetToArchive The tweet to archive.
 * @param now The current date and time.
 * @returns A Promise that resolves when the tweet has been archived.
 */
  public static async archiveTweet(tweetToArchive: Tweet, now: Date): Promise<void> {
    try {
      await ArchivedTweetModel.create({
        userId: tweetToArchive.userId,
        username: tweetToArchive.username,
        content: tweetToArchive.content,
        epoch: tweetToArchive.epoch,
        timestamp: tweetToArchive.timestamp,
        archivedAt: now.getTime(), // The date and time the tweet was archived
      });
    } catch (error: any | string) {
      console.error('Error bulk adding Archived Tweet', error);
      throw new Error(error.message);
    }
  }
}
