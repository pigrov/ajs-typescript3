import Cart from '../service/Cart';
import Book from '../domain/Book';
import Movie from '../domain/Movie';

let cart: Cart;
beforeEach(() => { cart = new Cart(); });
test('new card should be empty', () => expect(cart.items.size).toBe(0));

test('adding 2 non single but different Books to cart', () => {
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  const count: number = cart.items.values().next().value;

  expect(count).toBe(2);
});

test('removing one of 2 non single but different Books to cart', () => {
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  cart.removeItem(4);
  const count: number = cart.items.values().next().value;

  expect(count).toBe(1);
});

test('adding 2 single different Movies to cart', () => {
  cart.add(new Movie(546, 'Наруто', 1200, false, 'Naruto', 1999, 'Japan', 'Я стану Хокаге', ['аниме', 'приключения'], 99999999999));
  cart.add(new Movie(546, 'Наруто', 1200, false, 'Naruto', 1999, 'Japan', 'Я стану Хокаге', ['аниме', 'приключения'], 99999999999));
  const count: number = cart.items.values().next().value;

  expect(count).toBe(1);
});

test('removing single Movie from Cart', () => {
  cart.add(new Movie(546, 'Наруто', 1200, false, 'Naruto', 1999, 'Japan', 'Я стану Хокаге', ['аниме', 'приключения'], 99999999999));
  cart.add(new Movie(546, 'Наруто', 1200, false, 'Naruto', 1999, 'Japan', 'Я стану Хокаге', ['аниме', 'приключения'], 99999999999));
  cart.removeItem(546);

  expect(cart.items.size).toBe(0);
});

test('removing not existing item from cart', () => {
  cart.removeItem(1112);
  expect(cart.items.size).toBe(0);
});

test('total price', () => {
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  expect(cart.totalPrice()).toBe(690);
});

test('total price with discount', () => {
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  cart.add(new Book(4, 'Автостопом по галактике', 'Дуглас Адамс', 345, 314));
  expect(cart.totalPriceWithDiscount(1.5)).toBeCloseTo(679.65);
});