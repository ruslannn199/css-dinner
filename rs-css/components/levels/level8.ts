import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level8 = new Level({
  title: `Level 8`,
  description: `Why they are all on top? 😠`,
  help: `:first-of-type:not(bento, plate), bento:last-child`,
});

level8.buildLevel(
  [
    new Dish(DISH_TYPE.BENTO),
    new Food(FOOD_TYPE.APPLE, { isSmall: true, isTarget: true }),
    new Food(FOOD_TYPE.APPLE),
    new Food(FOOD_TYPE.APPLE),
  ],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [
    new Dish(DISH_TYPE.PLATE),
    new Food(FOOD_TYPE.APPLE, { isSmall: true, isTarget: true }),
    new Food(FOOD_TYPE.APPLE),
    new Food(FOOD_TYPE.APPLE),
    new Food(FOOD_TYPE.APPLE),
  ],
  [new Food(FOOD_TYPE.ORANGE, { isTarget: true })],
  [new Dish(DISH_TYPE.BENTO, { isTarget: true })]
);

export default level8;
