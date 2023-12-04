import DataStreamRepo from '../database/repositories/stream';

const processDataStream = async (): Promise<any> => {
  try {
    await DataStreamRepo.processDataStream();
  } catch (error: any) {
    console.error('processDataStream: ', error);
    throw new Error(error.message);
  }
};

const DataStreamController = { processDataStream };
export default DataStreamController;
