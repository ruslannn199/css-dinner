import { IComponent } from './interfaces';

class BaseComponent<T extends HTMLElement> implements IComponent<T> {
  public element: T;

  constructor(
    parentNode: HTMLElement | null = null,
    tag: keyof HTMLElementTagNameMap = 'div',
    classes: string[] = [],
    content?: string
  ) {
    this.element = <T>document.createElement(tag);
    this.element.classList.add(...classes);
    if (content) this.element.insertAdjacentText('beforeend', content);
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

export default BaseComponent;
