import Level from './level';
import { FOOD_TYPE } from '../types/enums';
import Food from '../game/food';

const level7 = new Level({
  title: `Level 7`,
  description: `They are such babies,<br>so I would eat them 😊😯`,
  help: `:nth-child(-2n+3), :nth-child(6), :nth-child(10), :nth-child(15)`,
});

level7.buildLevel(
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true, isTarget: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })],
  [new Food(FOOD_TYPE.ORANGE, { isSmall: true })]
);

export default level7;
