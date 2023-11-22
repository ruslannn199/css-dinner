import LevelTemp from '../abstract/levelTemplate';
import App from '../app/app';
import Dish from '../game/dish';
import Food from '../game/food';
import { COMPLETION_STATUS } from '../types/enums';
import { ILevelOptions } from '../types/interfaces';
import { restaurantElement } from '../types/types';

class Level extends LevelTemp {
  public heads: restaurantElement[] = [];
  public foods: (Food[] | null)[] = [];
  public completionStatus?: COMPLETION_STATUS;
  private readonly title?: string;
  private readonly desc?: string;
  private readonly tip?: string;
  constructor(options: Partial<ILevelOptions>) {
    super();
    if (options.title) this.title = options.title;
    if (options.description) this.desc = options.description;
    if (options.help) this.tip = options.help;
  }

  public static load = (level: Level, app: App): void => {
    if (!level.heads) level.heads = [];
    level.heads.forEach((elem) => elem.placeOnTable(app.table));
    app.table.updateStructure(level);
    const heading: HTMLElement | null = document.querySelector('.aside__heading');
    const desc: HTMLElement | null = document.querySelector('.aside__desc');
    if (heading && level.title) heading.textContent = level.title;
    if (desc && level.desc) desc.innerHTML = level.desc;
  };

  public static unload = (app: App): void => {
    app.editor.lists.forEach((list) => list.element.replaceChildren());
    app.table.field.element.replaceChildren();
    app.editor.markup.element.replaceChildren();
  };

  public buildLevel = (...levelObj: restaurantElement[][]): void => {
    try {
      if (levelObj.length) {
        levelObj.forEach((slot) => {
          if (slot.length) {
            const head = slot[0];
            this.heads.push(head);
            if (slot.length > 1) {
              const foodElemsThatPassed = slot.slice(1).map((elem: restaurantElement, i: number) => {
                if (elem instanceof Food && head instanceof Dish) {
                  if (!elem.isPickle() || i === 0) {
                    head.appendFood(elem);
                    return elem;
                  } else {
                    throw new TypeError(`Pickles can't be assign on another Food`);
                  }
                } else {
                  throw new TypeError(`Dishes can't be assign to Food values`);
                }
              });
              this.foods.push(foodElemsThatPassed);
            } else {
              this.foods.push(null);
            }
          } else {
            throw new RangeError(`It's impossible to assign zero elements`);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  public get assistance(): string | undefined {
    return this.tip;
  }
}

export default Level;
