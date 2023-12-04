import DataStreamController from './controllers/dataStream.controller';
import AnomaliesController from './controllers/anomalies.controller';
import connectDatabase from './database/index';

async function server() {
  let dbConnection;

  try {
    dbConnection = await connectDatabase();

    await DataStreamController.processDataStream()
      .then(async () => {
        await AnomaliesController.highVolumDataDetector();
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      })
      .finally(() => {
        console.info('Process finished successfully.');
      });
  } catch (error: any) {
    console.error('Server Error: ', error);
    throw new Error(error.message);
  } finally {
    await dbConnection?.close(); // Close database connection
  }
}

server();
