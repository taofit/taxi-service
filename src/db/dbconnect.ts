import {MongoClient} from 'mongodb';

export const dbconnect = async () => {
  const client = new MongoClient('mongodb://mongodb:27017');
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }

  return client.db('taxiService');
}
