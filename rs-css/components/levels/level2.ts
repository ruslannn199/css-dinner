import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level2 = new Level({
  title: `Level 2`,
  description: `They look so similar.<br>How should I choose?🧐`,
  help: `:nth-child(5n+2) > *`,
});

level2.buildLevel(
  [new Dish(DISH_TYPE.BENTO)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.PICKLE)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.PICKLE)],
  [new Dish(DISH_TYPE.BENTO), new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Dish(DISH_TYPE.BENTO)]
);

export default level2;
