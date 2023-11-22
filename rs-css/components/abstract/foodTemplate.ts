import Dish from '../game/dish';
import Food from '../game/food';
import Table from '../game/table';
import { IRestaurant } from '../types/interfaces';

abstract class FoodTemp implements IRestaurant {
  abstract readonly openingTag: string;
  abstract readonly closingTag: string;

  abstract appendFood(food: Food, head: Dish): void;
  abstract placeOnTable(table: Table): void;
  abstract isPickle(): boolean;
  abstract get HTML(): HTMLElement;
}

export default FoodTemp;
