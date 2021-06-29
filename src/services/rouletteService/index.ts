export interface IRouletteService {
  list();
  newRoulette(roulette: any): Promise<any>;
  opening(id: string);
  bet(roullete_id: string, userId: string, body: any);
  closing(roullete_id);
}
