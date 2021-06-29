import { injectable } from 'inversify';

interface IUser {
  name: string;
  _id?: string;
}

@injectable()
export class User implements IUser {
  constructor(public name: string, public _id?: string) {}
}
