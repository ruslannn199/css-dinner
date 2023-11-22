import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level1 = new Level({
  title: `Level 1`,
  description: `How to find every element<br>if it's the only one 🤔`,
  help: `:only-child`,
});

level1.buildLevel(
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE, { isSmall: true, isTarget: true })],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Food(FOOD_TYPE.APPLE)],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.APPLE, { isSmall: true }), new Food(FOOD_TYPE.APPLE)],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.ORANGE, { isTarget: true })],
  [new Dish(DISH_TYPE.PLATE)]
);

export default level1;
