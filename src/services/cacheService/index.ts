export interface ICacheService {
  get(entity: any): Promise<any>;
  set(entity: any): Promise<any>;
}
