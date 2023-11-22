import Level from '../levels/level';
import BaseComponent from '../types/baseComponent';
import { restaurantElement, tableCurrentStructure } from '../types/types';

class Table {
  private readonly wrapper: BaseComponent<HTMLDivElement>;
  public tag: BaseComponent<HTMLDivElement>;
  public field: BaseComponent<HTMLDivElement>;
  public children: restaurantElement[] = [];
  public currentStructure: tableCurrentStructure = { heads: undefined, foods: undefined };
  private readonly edge: BaseComponent<HTMLDivElement>;
  constructor(main: HTMLElement) {
    this.wrapper = new BaseComponent(main, 'div', ['table__wrapper']);
    new BaseComponent(this.wrapper.element, 'div', ['table__surface']);
    this.tag = new BaseComponent(this.wrapper.element, 'div', ['tag']);
    this.field = new BaseComponent(this.wrapper.element, 'div', ['table']);
    this.edge = new BaseComponent(main, 'div', ['table__edge']);
    new BaseComponent(this.edge.element, 'div', ['table__leg']);
    new BaseComponent(this.edge.element, 'div', ['table__leg']);
  }

  public search = (selector: string): NodeListOf<Element> | undefined => {
    return this.field.element.querySelectorAll(selector);
  };

  public updateStructure = (level: Level): tableCurrentStructure => {
    return (this.currentStructure = {
      heads: level.heads,
      foods: level.foods,
    });
  };
}

export default Table;
