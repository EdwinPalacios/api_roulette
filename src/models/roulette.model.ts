import { injectable } from 'inversify';

interface IRoulette {
  _id?: string;
  name: string;
  status: boolean;
  bet: any[];
}

@injectable()
export class Roulette implements IRoulette {
  constructor(
    public name: string,
    public status: boolean,
    public bet: any[],
    public _id?: string
  ) {}
}
