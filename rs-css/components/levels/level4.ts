import Level from './level';
import Dish from '../game/dish';
import { DISH_TYPE, FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level4 = new Level({
  title: `Level 4`,
  description: `Such many targets<br>Can I write them all? ✍️`,
  help: `plate:not(#fancy), plate:not(#fancy) > *, bento, bento > *`,
});

level4.buildLevel(
  [new Dish(DISH_TYPE.PLATE, { isTarget: true }), new Food(FOOD_TYPE.PICKLE, { isTarget: true })],
  [new Dish(DISH_TYPE.PLATE, { id: 'fancy' })],
  [new Dish(DISH_TYPE.BENTO, { isTarget: true }), new Food(FOOD_TYPE.ORANGE, { isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE)],
  [
    new Dish(DISH_TYPE.PLATE, { isTarget: true }),
    new Food(FOOD_TYPE.APPLE, { isTarget: true }),
    new Food(FOOD_TYPE.ORANGE, { isTarget: true }),
  ]
);

export default level4;
