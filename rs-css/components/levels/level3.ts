import Level from './level';
import { FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level3 = new Level({
  title: `Level 3`,
  description: `I do like fruit salads.<br>But this pickle looks like unnecessary 🥒`,
  help: `:nth-child(3n), pickle`,
});

level3.buildLevel(
  [new Food(FOOD_TYPE.APPLE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.PICKLE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.APPLE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })]
);
export default level3;
