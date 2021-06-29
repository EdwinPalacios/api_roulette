import { Db, MongoClient } from 'mongodb';

const env = process.env;
// const connStr = `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_HOSTNAME}:${env.MONGO_PORT}`;

const connStr = `mongodb://${env.MONGO_HOSTNAME}:${env.MONGO_PORT}`;
const dbName = `${process.env.MONGO_DB}`;

export class MongoDBConnection {
  private static isConnected = false;
  private static db: Db;

  public static getConnection(result: (connection) => void): void {
    if (!this.isConnected) {
      this.connect(() => {
        return result(this.db);
      });
    }
    return result(this.db);
  }

  private static connect(result: (error, db: Db) => void) {
    MongoClient.connect(connStr, (err, client) => {
      this.db = client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}
