import { Db, ObjectID } from 'mongodb';
import { provide } from 'inversify-binding-decorators';
import { MongoDBConnection } from '@utils/mongodb/connection';

import TYPES from '@ioc/types';
import { IMongoClientService } from '.';

@provide(TYPES.IMongoClientService)
export class MongoClientService implements IMongoClientService {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find(collection: string, filter: any, result: (error, data) => any) {
    this.db
      .collection(collection)
      .find(filter)
      .toArray((error, find) => {
        return result(error, find);
      });
  }

  public findOneById(collection: string, objectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .find({ _id: new ObjectID(objectId) })
        .limit(1)
        .toArray((error, find) => {
          if (error) {
            reject(error);
          }
          resolve(find[0]);
        });
    });
  }

  public insert(collection: string, model: any, result: (error, data) => any) {
    this.db.collection(collection).insertOne(model, (error, insert) => {
      return result(error, insert.ops[0]);
    });
  }

  public update(collection: string, objectId: string, model: any) {
    return this.db
      .collection(collection)
      .updateOne({ _id: new ObjectID(objectId) }, { $set: model });
  }

  public remove(
    collection: string,
    objectId: string,
    result: (error, data) => any
  ) {
    this.db
      .collection(collection)
      .deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
        return result(error, remove);
      });
  }
}
