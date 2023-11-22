import { highlight } from '../highlight/highlight';
import BaseComponent from '../types/baseComponent';
import { restaurantElement } from '../types/types';
import { getChar, setIndexDependency, shakeElement } from '../utils/utils';
import Food from './food';
import Table from './table';

class Editor {
  private readonly mainEditor: BaseComponent<HTMLDivElement>;
  private readonly CSSEditor: BaseComponent<HTMLDivElement>;
  private readonly HTMLEditor: BaseComponent<HTMLDivElement>;
  private readonly editorArea: BaseComponent<HTMLDivElement>;
  public readonly lists: BaseComponent<HTMLOListElement>[] = [];
  public readonly input: BaseComponent<HTMLInputElement>;
  public readonly enterBtn: BaseComponent<HTMLButtonElement>;
  private readonly CSSPre: BaseComponent<HTMLPreElement>;
  public readonly markup: BaseComponent<HTMLDivElement>;

  constructor(parent: HTMLElement) {
    this.mainEditor = new BaseComponent(parent, 'div', ['editor']);
    this.CSSEditor = new BaseComponent(this.mainEditor.element, 'div', ['editor__css']);
    this.HTMLEditor = new BaseComponent(this.mainEditor.element, 'div', ['editor__html']);
    this.lists.push(new BaseComponent(this.CSSEditor.element, 'ol', ['editor__list', 'editor__list_css']));
    this.lists.push(new BaseComponent(this.HTMLEditor.element, 'ol', ['editor__list', 'editor__list_html']));
    this.editorArea = new BaseComponent(this.CSSEditor.element, 'div', ['editor__area']);
    this.input = new BaseComponent(this.editorArea.element, 'input', ['editor__input']);
    this.input.element.type = 'text';
    this.input.element.placeholder = 'Type in a CSS selector';
    this.CSSPre = new BaseComponent(this.editorArea.element, 'pre', ['editor__area-desc']);
    new BaseComponent(this.CSSPre.element, 'code', ['language-css'], '{\n  /*Put your code here*/\n}');
    this.enterBtn = new BaseComponent(this.editorArea.element, 'button', ['enter'], 'Enter');
    this.markup = new BaseComponent(this.HTMLEditor.element, 'div', ['editor__markup']);
  }

  public shake = (): void => {
    shakeElement(this.mainEditor.element);
  };

  private createHTMLViewerSection = (head: restaurantElement, children: Food[] | null, groupIndex: string): void => {
    const div = new BaseComponent<HTMLDivElement>(this.markup.element);
    setIndexDependency(head.HTML, div.element, { group: groupIndex });

    const openingPre = new BaseComponent<HTMLPreElement>(div.element, 'pre', ['editor__markup-pre']);
    new BaseComponent<HTMLElement>(openingPre.element, 'code', ['language-html'], `\xa0${head.openingTag}`);
    const closingPre = new BaseComponent<HTMLPreElement>(null, 'pre', ['editor__markup-pre']);
    const closingCode = new BaseComponent<HTMLElement>(closingPre.element, 'code', ['language-html']);

    if (children?.length) {
      children.forEach((child: Food, order: number): void => {
        const childDiv = new BaseComponent<HTMLDivElement>(div.element);
        if (child.HTML instanceof HTMLElement)
          setIndexDependency(child.HTML, childDiv.element, { group: groupIndex, index: order });
        const childPre = new BaseComponent<HTMLPreElement>(childDiv.element, 'pre', ['editor__markup-pre']);
        new BaseComponent<HTMLElement>(
          childPre.element,
          'code',
          ['language-html'],
          `\xa0\xa0${child.openingTag}${child.closingTag}`
        );
      });
      closingCode.element.insertAdjacentText('afterbegin', '\xa0');
    } else {
      div.addClass('editor__markup-line');
    }
    closingCode.element.insertAdjacentText('beforeend', `${head.closingTag}`);
    div.append(closingPre.element);
  };

  public generateHTMLViewer = (table: Table): void => {
    try {
      const heads: restaurantElement[] | undefined = table.currentStructure.heads;
      const foods: (Food[] | null)[] | undefined = table.currentStructure.foods;
      const tableView: BaseComponent<HTMLDivElement>[] = [new BaseComponent(), new BaseComponent()];
      tableView.forEach((tag: BaseComponent<HTMLDivElement>, i: number) => {
        const pre = new BaseComponent<HTMLPreElement>(tag.element, 'pre', ['editor__markup-pre']);
        new BaseComponent<HTMLElement>(pre.element, 'code', ['language-html'], i ? '</div>' : '<div class="table">');
      });

      if (heads && foods) {
        const length =
          heads.reduce((acc: number, el: restaurantElement, i: number): number => {
            this.createHTMLViewerSection(el, foods[i], getChar(i));
            const foodsLength: number | undefined = foods[i]?.length;
            return foodsLength ? acc + foodsLength + 2 : acc + 1;
          }, 0) + 2;

        for (let i = 0; i < length; i += 1) {
          this.lists.forEach((list: BaseComponent<HTMLOListElement>): void => {
            list.element.insertAdjacentHTML('beforeend', '<li class="editor__list-item"></li>');
          });
        }
      } else {
        throw new RangeError("Can't generate view for undefined elements");
      }

      tableView.forEach((tag, i) => this.markup.append(tag.element, `${i ? 'beforeend' : 'afterbegin'}`));
      highlight();
    } catch (e) {
      console.error(e);
    }
  };
}

export default Editor;
