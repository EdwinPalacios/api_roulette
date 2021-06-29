export interface IMongoClientService {
  find(collection: string, filter: any, result: (error: any, data: any) => any);
  findOneById(collection: string, objectId: string): Promise<any>;
  insert(
    collection: string,
    model: any,
    result: (error: any, data: any) => any
  );
  update(collection: string, objectId: string, model: any);
  remove(
    collection: string,
    objectId: string,
    result: (error: any, data: any) => any
  );
}
