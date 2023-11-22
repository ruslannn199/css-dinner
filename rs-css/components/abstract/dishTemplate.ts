import Food from '../game/food';
import Table from '../game/table';
import { IRestaurant } from '../types/interfaces';

abstract class DishTemp implements IRestaurant {
  abstract readonly openingTag: string;
  abstract readonly closingTag: string;

  abstract appendFood(food: Food): void;
  abstract placeOnTable(table: Table): void;
  abstract get HTML(): HTMLElement;
}

export default DishTemp;
