import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level6 = new Level({
  title: `Level 6`,
  description: `Give me this one, ...no this one.`,
  help: `#fancy:nth-child(n):not(:nth-child(2)), #fancy apple`,
});

level6.buildLevel(
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.APPLE)],
  [new Dish(DISH_TYPE.PLATE, { id: 'fancy' })],
  [new Dish(DISH_TYPE.PLATE)],
  [new Dish(DISH_TYPE.PLATE, { id: 'fancy', isTarget: true })],
  [new Dish(DISH_TYPE.PLATE)],
  [new Dish(DISH_TYPE.PLATE, { id: 'fancy', isTarget: true }), new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [new Dish(DISH_TYPE.PLATE)]
);

export default level6;
