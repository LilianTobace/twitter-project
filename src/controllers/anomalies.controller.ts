import AnomaliesRepo from '../database/repositories/anomalies';
import NotificationRepo from '../database/repositories/notification';
import TweetController from './tweet.controller';

const highVolumDataDetector = async (): Promise<void> => {
  try {
    const allData = await TweetController.getTweetsInBatchesCount();
    if (Object.entries(allData).length) {
      const result = await AnomaliesRepo.highVolumeCalculation(allData);
      if (Object.keys(result).length) await NotificationRepo.sendAlert(result);
    }
    console.info('No anomalies were found')
  } catch (error: any | string) {
    console.error('highVolumDataDetector: ', error);
    throw new Error(error.message);
  }
};

const AnomaliesController = { highVolumDataDetector };
export default AnomaliesController;
