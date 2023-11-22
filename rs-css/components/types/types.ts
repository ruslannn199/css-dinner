import Dish from '../game/dish';
import Food from '../game/food';

export type restaurantElement = Food | Dish;

export type tableCurrentStructure = {
  heads: restaurantElement[] | undefined;
  foods: (Food[] | null)[] | undefined;
};

export type foodOptions = {
  isSmall: boolean;
  isTarget: boolean;
};

export type dishOptions<T extends string> = {
  isTarget: boolean;
  id: T;
  for: T;
};

export type groupOptions = {
  group: string;
  index?: number;
};

export type inputEventType = KeyboardEvent | MouseEvent | PointerEvent;
