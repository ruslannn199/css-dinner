import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level10 = new Level({
  title: `Level 10`,
  description: `My eyes...<br>My hands...<br>My brains...<br>Can you REALLY pass this level?`,
  help: `bento:not(:nth-child(3)) orange, bento:nth-child(3) apple, plate:first-of-type apple, plate:last-of-type orange`,
});

level10.buildLevel(
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE), new Food(FOOD_TYPE.ORANGE, { isTarget: true })],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.ORANGE), new Food(FOOD_TYPE.APPLE, { isTarget: true })],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE, { isTarget: true }), new Food(FOOD_TYPE.ORANGE)],
  [new Dish(DISH_TYPE.PLATE), new Food(FOOD_TYPE.ORANGE, { isTarget: true }), new Food(FOOD_TYPE.APPLE)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.APPLE), new Food(FOOD_TYPE.ORANGE, { isTarget: true })]
);

export default level10;
