import dotenv from 'dotenv';
import { Anomaly } from '../../../interface/anomaly';
import { TweetCounts } from '../../../interface/tweet';

dotenv.config();
export default class AnomaliesRepo {
  /**
   * Calculates the mean of tweet counts based on the provided data.
   *
   * @param {TweetCounts} data - An object containing tweet counts for different intervals.
   * @param {number} total - The total number of intervals considered.
   * @returns {number} - The calculated mean of tweet counts.
   * @public
   * @static
   */
  public static meanCalculation(data: TweetCounts, total: number): number {
    const sum = Object.values(data).reduce((acc: any, curr: any) => acc + curr, 0);
    return sum / total;
  }

  /**
   * Calculates the standard deviation based on the provided tweet counts data, mean, and total intervals.
   *
   * @param {TweetCounts} data - An object containing tweet counts for different intervals.
   * @param {number} mean - The mean value calculated from the tweet counts data.
   * @param {number} total - The total number of intervals considered.
   * @returns {number} - The calculated standard deviation of the tweet counts.
   * @public
   * @static
   */
  public static standardDeviation(data: TweetCounts, mean: number, total: number): number {
    const squaredDifferences = Object.values(data).map((value: number) => (value - mean) ** 2);
    const sumSquaredDifferences = squaredDifferences.reduce((acc: any, curr: any) => acc + curr, 0);
    const variation = sumSquaredDifferences / (total - 1);
    return Math.sqrt(variation);
  }

  /**
   * Calculates anomalies in tweet counts data based on high volume thresholds.
   *
   * @param {TweetCounts} data - An object containing tweet counts for different intervals.
   * @returns {Promise<Anomaly>} - A Promise resolving to an object containing anomalies found in the tweet counts data.
   * @public
   * @static
   */
  public static async highVolumeCalculation(data: TweetCounts): Promise<Anomaly> {
    const THRESHOLD = process.env.THRESHOLD as unknown as number;
    try {
      const total = Object.keys(data).length;
      const mean = this.meanCalculation(data, total);
      console.debug({ mean })
      const deviation = this.standardDeviation(data, mean, total);
      console.debug({ deviation })
      const lowerThreshold = mean - (THRESHOLD * deviation);
      const upperThreshold = mean + (THRESHOLD * deviation);
      console.debug({ lowerThreshold, upperThreshold })
      const anomalies: { [key: string]: number } = {};
      Object.entries(data).forEach(([key, value]) => {
        const num = value as number;
        if (num <= lowerThreshold || num >= upperThreshold) {
          if (!anomalies[key]) anomalies[key] = 0;
          anomalies[key] += 1;
        }
      });
      return anomalies;
    } catch (error: any | string) {
      console.error('highVolumeCalculation Error: ', error);
      throw new Error(error.message);
    }
  }
}
