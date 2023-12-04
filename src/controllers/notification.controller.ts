import NotificationRepo from '../database/repositories/notification';
import { Anomaly } from '../interface/anomaly';

const sendNotification = async (anomalies: Anomaly): Promise<void> => {
  try {
    await NotificationRepo.sendAlert(anomalies);
  } catch (error: any | string) {
    console.error('sendNotification: ', error);
    throw new Error(error.message);
  }
};

const NotificationController = { sendNotification };
export default NotificationController;
