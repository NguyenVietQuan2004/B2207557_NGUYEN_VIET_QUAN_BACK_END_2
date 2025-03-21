import { MongoClient } from 'mongodb';

class mongodb {
  static connect = async (uri) => {
    if (this.client) return this.client;
    this.client = await MongoClient.connect(uri);
    return this.client;
  };
}

export default mongodb;
