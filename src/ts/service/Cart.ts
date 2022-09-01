import Buyable from '../domain/Buyable';

const round = function f(num: number = 0, precision: number = 2): number {
  return +num.toFixed(precision);
};

type Item = {
  item: Buyable,
  count: number,
}

export default class Cart {
  private map: Map<number, Item>;

  constructor() {
    this.map = new Map<number, Item>();
  }

  add(item: Buyable): void {
    const product = this.map.get(item.id);
    if (product !== undefined) {
      if (!product.item.single) {
        product.count += 1;
      }
    } else {
      this.map.set(item.id, {
        item,
        count: 1,
      });
    }
  }

  get items(): Map<Buyable, number> {
    const result = new Map<Buyable, number>();
    this.map.forEach((item: Item) => result.set(item.item, item.count));
    return result;
  }

  totalPrice(): number {
    let total: number = 0;
    this.map.forEach((item: Item) => { total += item.count * item.item.price; });
    return round(total);
  }

  totalPriceWithDiscount(discount: number = 0): number {
    const total: number = this.totalPrice() * (1 - discount / 1e2);
    return round(total);
  }

  removeItem(id: number): void {
    const item = this.map.get(id);
    if (item === undefined) {
      return;
    }
    item.count -= 1;
    if (item.count) {
      return;
    }
    this.map.delete(id);
  }
}