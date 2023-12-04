import TweetCountRepo from '../database/repositories/tweetcount/TweetCountRepo';

const increaseCount = async (): Promise<void> => {
  try {
    await TweetCountRepo.updateCount();
  } catch (error: any | string) {
    console.error('increaseCount: ', error);
    throw new Error(error.message);
  }
};

const getCount = async (): Promise<TweetCountRepo> => {
  try {
    return await TweetCountRepo.getCount();
  } catch (error: any | string) {
    console.error('getCount: ', error);
    throw new Error(error.message);
  }
};

const TweetCountController = {
  increaseCount,
  getCount,
};

export default TweetCountController;
