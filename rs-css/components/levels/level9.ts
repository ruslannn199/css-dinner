import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level9 = new Level({
  title: `Level 9`,
  description: `I used randomizer to build this level 🎲`,
  help: `pickle:not(:nth-child(2)), apple:last-child`,
});

level9.buildLevel(
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.PICKLE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.PICKLE)],
  [new Food(FOOD_TYPE.PICKLE, { isSmall: true, isTarget: true })],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Food(FOOD_TYPE.APPLE)],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.APPLE)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true, isTarget: true })]
);

export default level9;
