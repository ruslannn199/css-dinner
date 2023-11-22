import Dish from '../rs-css/components/game/dish';
import Food from '../rs-css/components/game/food';
import Level from '../rs-css/components/levels/level';
import { DISH_TYPE, FOOD_TYPE } from '../rs-css/components/types/enums';

describe(`Level's method buildLevel`, () => {
  let level: Level;
  let plate = new Dish(DISH_TYPE.PLATE);
  let bento = new Dish(DISH_TYPE.BENTO);
  let apple = new Food(FOOD_TYPE.APPLE);
  let orange = new Food(FOOD_TYPE.ORANGE);
  let pickle = new Food(FOOD_TYPE.PICKLE);

  beforeEach(() => {
    level = new Level({});
  })

  it('shouldn\'t return anything', () => {
    expect(level.buildLevel([new Food(FOOD_TYPE.APPLE)])).toBeUndefined();
  });

  it('should add all first values to the level\'s "heads" property', () => {
    level.buildLevel(
      [bento],
      [apple],
      [plate,orange],
    );

    expect(level.heads).toBeDefined();
    expect(level.heads).toBeInstanceOf(Array);
    expect(level.heads).toEqual([bento, apple, plate]);
  });

  it(`should add every other value to the level's "foods" property as an array
  or make it null if there's no element in slot`, () => {
    level.buildLevel(
      [bento, pickle],
      [apple],
      [plate, orange],
    );

    expect(level.foods).toBeDefined();
    expect(level.foods).toBeInstanceOf(Array);
    expect(level.foods).toEqual([[pickle], null, [orange]]);
  });

  it('should throw a RangeError if levelObj\'s slot is empty', () => {
    try {
      level.buildLevel([]);
    } catch (e) {
      expect(e).toBeInstanceOf(RangeError);
      expect(e).toHaveProperty('message', `It's impossible to assign zero elements`);
    }
  });

  it('should throw a TypeError if Dish is assigned on Food', () => {
    try {
      level.buildLevel([bento, plate]);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e).toHaveProperty('message', `Dishes can't be assign to Food values`);
    }
  });

  it('should throw a TypeError if Pickle is assigned on another Food', () => {
    try {
      level.buildLevel([apple, pickle]);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
      expect(e).toHaveProperty('message', `Pickles can't be assign on another Food`);
    }
  });
});

describe(`Level's method assistance`, () => {
  let level: Level;

  it('should return level.tip if it exists which is string', () => {
    const options = { help: 'Random tip' };
    level = new Level(options);
    expect(level.assistance).toBeDefined();
    expect(typeof level.assistance).toBe('string');
    expect(level.assistance).toEqual(options.help);
  });

  it('should return undefined if level.tip doesn\'t exist', () => {
    level = new Level({});
    expect(level.assistance).toBeUndefined();
    expect(typeof level.assistance).toBe('undefined');
  });
})