import {Db, MongoClient} from 'mongodb';

export const dbConnect = async (): Promise<Db> => {
  const client = new MongoClient('mongodb://mongodb:27017');
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }

  return client.db('taxiService');
}

export const dbClose = async (client: MongoClient) => {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error Disconnected from MongoDB', error);
  }
}
