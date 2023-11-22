import Dish from '../game/dish';
import Food from '../game/food';
import Table from '../game/table';
import { COMPLETION_STATUS } from './enums';
import { inputEventType } from './types';

export interface ILevelOptions {
  title: string;
  description: string;
  help: string;
  completion: COMPLETION_STATUS;
}

export interface IRestaurant {
  readonly openingTag: string;
  readonly closingTag: string;

  appendFood(food: Food, head?: Dish): void;

  placeOnTable(table: Table): void;
}

export interface IApp {
  checkAnswer(e: inputEventType): void;
  chooseLevel(e: MouseEvent | PointerEvent): void;
  start(): void;
  nextLevel(e: inputEventType): void;
  prevLevel(e: inputEventType): void;
}

export interface IComponent<T extends HTMLElement> {
  element: T;
  addClass(classStyle: string): void;
  removeClass(classStyle: string): void;
  append(child: Element, position: InsertPosition): void;
}
