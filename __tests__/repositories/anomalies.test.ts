import AnomaliesRepo from '../../src/database/repositories/anomalies';
import { TweetCounts } from '../../src/interface/tweet';
import { Anomaly } from '../../src/interface/anomaly';
import mock from './__stubs__/anomalies.json';

describe('Anomalies Repositories', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.THRESHOLD;
  });

  describe('meanCalculation', () => {
    it('Calculates the mean of tweet counts correctly.', () => {
      const data: TweetCounts = mock.input;
      const total: number = Object.keys(data).length;
      const mean: number = AnomaliesRepo.meanCalculation(data, total);

      expect(mean).toBe(96.16666666666667);
    });
  });

  describe('standardDeviation', () => {
    it('Calculates the standard deviation of tweet counts correctly.', () => {
      const data: TweetCounts = mock.input;
      const total: number = Object.keys(data).length;
      const mean: number = AnomaliesRepo.meanCalculation(data, total);
      const deviation: number = AnomaliesRepo.standardDeviation(data, mean, total);

      expect(deviation).toBeCloseTo(222.45216714311115);
    });
  });

  describe('highVolumeCalculation', () => {
    it('Returns anomalies in tweet counts based on high volume thresholds', async () => {
      process.env.THRESHOLD = '0.5';
      const data: TweetCounts = mock.input;
      const anomalies: Anomaly = await AnomaliesRepo.highVolumeCalculation(data);
      expect(anomalies).toEqual({ '07:00-08:00': 1 });
    });

    it('throws an error when encountering an exception', async () => {
      AnomaliesRepo.meanCalculation = jest.fn(() => { throw new Error('Test Error'); });
      await expect(AnomaliesRepo.highVolumeCalculation({} as TweetCounts)).rejects.toThrowError('Test Error');
    });
  });
});
