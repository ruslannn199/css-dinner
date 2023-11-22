import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level5 = new Level({
  title: `Level 5`,
  description: `I hope you are not a colorblind person`,
  help: `apple:nth-child(4n+3), bento:nth-child(4n) apple`,
});

level5.buildLevel(
  [new Food(FOOD_TYPE.APPLE)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE)],
  [new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [new Food(FOOD_TYPE.APPLE)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE)],
  [new Food(FOOD_TYPE.APPLE, { isTarget: true })]
);

export default level5;
