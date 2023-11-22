import Dish from '../rs-css/components/game/dish';
import Food from '../rs-css/components/game/food';
import Table from '../rs-css/components/game/table';
import { DISH_TYPE, FOOD_TYPE } from '../rs-css/components/types/enums';

describe(`Food's getter HTML`, () => {
  it('should return HTMLElement of this Food', () => {
    const apple = new Food(FOOD_TYPE.APPLE);
    expect(apple.HTML).toBeDefined();
    expect(apple.HTML).toBeInstanceOf(HTMLElement);
    expect(apple.HTML.tagName).toEqual(FOOD_TYPE.APPLE.toUpperCase());
  });
});

describe(`Food's appendFood method`, () => {

  let orange: Food;
  let plate: Dish;
  beforeEach(() => {
    orange = new Food(FOOD_TYPE.ORANGE);
    plate = new Dish(DISH_TYPE.PLATE);
    plate.appendFood(orange);
  });

  it(`shouldn't return anything`, () => {
    expect(orange.appendFood(new Food(FOOD_TYPE.APPLE), plate)).toBeUndefined();
  });

  it('should append Food inside given Dish', () => {
    const apple = new Food(FOOD_TYPE.APPLE);
    orange.appendFood(apple, plate);
    expect(plate.HTML).toContainElement(apple.HTML);
    expect(plate.HTML).toContainElement(orange.HTML);
  });
});

describe(`Food's placeOnTable method`, () => {

  let table: Table;
  let pickle: Food;

  beforeEach(() => {
    pickle = new Food(FOOD_TYPE.PICKLE);
    table = new Table(document.body);
  });

  it(`shouldn't return anything`, () => {
    expect(pickle.placeOnTable(table)).toBeUndefined();
  });

  it(`should append Food on table`, () => {
    pickle.placeOnTable(table);
    expect(pickle.HTML).toBeInTheDocument();
    expect(table.field.element).toContainElement(pickle.HTML);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});