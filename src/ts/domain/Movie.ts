import Buyable from './Buyable';

export default class Movie implements Buyable {
  readonly single: boolean;

  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly date: Date,
    readonly country: string,
    readonly tagline: string,
    readonly genre: string[],
    readonly duration: number,
  ) {
    this.genre = [...genre];
    this.single = true;
  }
}