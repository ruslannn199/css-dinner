import { FOOD_TYPE } from '../types/enums';
import Dish from './dish';
import { foodOptions } from '../types/types';
import FoodTemp from '../abstract/foodTemplate';
import HTMLRestaurantElement from '../types/restaurantComponent';
import Table from './table';

class Food extends FoodTemp {
  public readonly openingTag: string;
  public readonly closingTag: string;
  private readonly foodType: FOOD_TYPE;
  private readonly HTMLElement: HTMLRestaurantElement;

  constructor(foodType: FOOD_TYPE, options?: Partial<foodOptions>) {
    super();
    this.foodType = foodType;
    this.openingTag = `<${foodType}`;
    this.closingTag = `</${foodType}>`;
    this.HTMLElement = new HTMLRestaurantElement(foodType, null, ['pop']);
    if (options?.isSmall) {
      this.openingTag += ` class="small"`;
      this.HTMLElement.addClass('small');
    }
    if (options?.isTarget) {
      this.HTMLElement.addClass('strobe');
    }
    this.openingTag += '>';
  }

  public appendFood = (food: Food, head: Dish): void => {
    head.HTML.insertAdjacentElement('beforeend', food.HTMLElement.element);
  };

  public placeOnTable = (table: Table): void => {
    table.field.append(this.HTML);
  };

  public isPickle = (): boolean => {
    return this.foodType === FOOD_TYPE.PICKLE;
  };

  public get HTML(): HTMLElement {
    return this.HTMLElement.element;
  }
}

export default Food;
