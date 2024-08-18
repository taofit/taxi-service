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
