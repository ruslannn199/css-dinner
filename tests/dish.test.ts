import Dish from '../rs-css/components/game/dish';
import Food from '../rs-css/components/game/food';
import Table from '../rs-css/components/game/table';
import { DISH_TYPE, FOOD_TYPE } from '../rs-css/components/types/enums';

describe(`Dish's getter HTML`, () => {
  it('should return HTMLElement of this Dish', () => {
    const plate = new Dish(DISH_TYPE.PLATE);
    expect(plate.HTML).toBeDefined();
    expect(plate.HTML).toBeInstanceOf(HTMLElement);
    expect(plate.HTML.tagName).toEqual(DISH_TYPE.PLATE.toUpperCase());
  });
});

describe(`Dish's appendFood method`, () => {

  let bento: Dish;
  beforeEach(() => {
    bento = new Dish(DISH_TYPE.BENTO);
  });

  it(`shouldn't return anything`, () => {
    expect(bento.appendFood(new Food(FOOD_TYPE.APPLE))).toBeUndefined();
  });

  it('should append Food inside this element', () => {
    const pickle = new Food(FOOD_TYPE.PICKLE);
    bento.appendFood(pickle);
    expect(bento.HTML).toContainElement(pickle.HTML);
  });
});

describe(`Dish's placeOnTable method`, () => {

  let table: Table;
  let plate: Dish;

  beforeEach(() => {
    plate = new Dish(DISH_TYPE.PLATE);
    table = new Table(document.body);
  });

  it(`shouldn't return anything`, () => {
    expect(plate.placeOnTable(table)).toBeUndefined();
  });

  it(`should append Dish on table`, () => {
    plate.placeOnTable(table);
    expect(plate.HTML).toBeInTheDocument();
    expect(table.field.element).toContainElement(plate.HTML);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});