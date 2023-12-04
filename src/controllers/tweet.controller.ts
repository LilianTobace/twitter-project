import TweetRepo from '../database/repositories/tweet/TweetRepo';
import Tweet, { TweetBatches, TweetCounts } from '../interface/tweet';

const createTweet = async (tweetData: Tweet): Promise<Tweet|null> => {
  try {
    // the dataset is not normalized, validations had to be added to avoid errors
    if (!tweetData.userId || !tweetData.username || !tweetData.content || !tweetData.epoch || !tweetData.timestamp) {
      console.warn(`Required fields is missing: ${tweetData}`);
    } else if (tweetData.content.length <= 280) {
      return await TweetRepo.createTweet(tweetData as Tweet);
    }
    return null;
  } catch (error: any | string) {
    console.error('createTweet: ', error);
    throw new Error(error.message);
  }
};

const getTweetsInBatches = async (): Promise<TweetBatches> => {
  try {
    return await TweetRepo.getTweetsInBatches();
  } catch (error: any | string) {
    console.error('getTweetsInBatches: ', error);
    throw new Error(error.message);
  }
};

const getTweetsInBatchesCount = async (): Promise<TweetCounts> => {
  try {
    return await TweetRepo.getTweetsInBatchesCount();
  } catch (error: any | string) {
    console.error('getTweetsInBatchesCount: ', error);
    throw new Error(error.message);
  }
};

const TweetController = {
  createTweet,
  getTweetsInBatches,
  getTweetsInBatchesCount,
};

export default TweetController;
