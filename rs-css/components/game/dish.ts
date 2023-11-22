import DistTemp from '../abstract/dishTemplate';
import { DISH_TYPE } from '../types/enums';
import HTMLRestaurantElement from '../types/restaurantComponent';
import { dishOptions } from '../types/types';
import Food from './food';
import Table from './table';

class Dish extends DistTemp {
  public readonly openingTag: string;
  public readonly closingTag: string;
  private readonly HTMLElement: HTMLRestaurantElement;

  constructor(dishType: DISH_TYPE, options?: Partial<dishOptions<string>>) {
    super();
    this.openingTag = `<${dishType}`;
    this.closingTag = `</${dishType}>`;
    this.HTMLElement = new HTMLRestaurantElement(dishType, null, ['pop']);
    if (options?.isTarget) {
      this.HTMLElement.addClass('strobe');
    }
    if (options?.for) {
      this.openingTag += ` for="${options.for}"`;
    }
    if (options?.id) {
      this.HTMLElement.element.id = options.id;
      this.openingTag += ` id="${options.id}"`;
    }
    this.openingTag += '>';
  }

  public appendFood = (food: Food): void => {
    this.HTMLElement.append(food.HTML);
  };

  public placeOnTable = (table: Table): void => {
    table.field.append(this.HTML);
  };

  public get HTML(): HTMLElement {
    return this.HTMLElement.element;
  }
}

export default Dish;
