import { Anomaly } from '../../../interface/anomaly';

export default class NotificationRepo {
  /**
 * Sends an alert notification indicating the detected anomalies and their respective times and quantities.
 *
 * @param anomalies An object containing the detected anomalies, with each key representing an
 * anomaly's timestamp and the corresponding value representing the anomaly's quantity.
 * @returns A Promise that resolves when the alert has been sent.
 */
  public static async sendAlert(anomalies: Anomaly): Promise<void> {
    // eslint-disable-next-line no-new
    new Promise<void>((resolve, reject) => {
      try {
        console.info(
          `Detected ${Object.keys(anomalies).length} anomalies at times and quantity: ${JSON.stringify(anomalies, null, 2)}`,
        );
        resolve();
      } catch (error: any | string) {
        console.error('sendAlert Error: ', error);
        reject(error.message);
      }
    });
  }
}
