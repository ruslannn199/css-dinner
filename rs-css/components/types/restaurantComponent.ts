import { DISH_TYPE, FOOD_TYPE } from './enums';
import { IComponent } from './interfaces';

class HTMLRestaurantElement implements IComponent<HTMLElement> {
  public element: HTMLElement;
  constructor(tag: FOOD_TYPE | DISH_TYPE, parentNode: HTMLElement | null = null, classes: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classes);
    if (parentNode) parentNode.insertAdjacentElement('beforeend', this.element);
  }

  public addClass(classStyle: string): void {
    this.element.classList.add(classStyle);
  }

  public removeClass(classStyle: string): void {
    this.element.classList.remove(classStyle);
  }

  public append(child: Element, position: InsertPosition = 'beforeend'): void {
    this.element.insertAdjacentElement(position, child);
  }
}

export default HTMLRestaurantElement;
