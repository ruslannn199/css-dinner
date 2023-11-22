import Level from '../levels/level';
import { COMPLETION_STATUS } from '../types/enums';
import { groupOptions } from '../types/types';

export const getChar = (index: number): string => {
  const letterACodeChar = 65;
  if (index < 0) return 'A';
  if (index > 25) return 'Z';
  return String.fromCharCode(letterACodeChar + index);
};

export const setIndexDependency = (elem: HTMLElement, div: HTMLDivElement, options: groupOptions): void => {
  try {
    if (elem instanceof HTMLElement) {
      let attributeValue: string = options.group;
      if (typeof options.index === 'number') attributeValue += options.index.toString();
      elem.setAttribute('data-hovered-index', attributeValue);
      div.setAttribute('data-hovered-index', attributeValue);
      elem.addEventListener('mouseover', highlightPare);
      div.addEventListener('mouseenter', highlightPare);
      elem.addEventListener('mouseout', hideLinkedFragments);
      div.addEventListener('mouseleave', hideLinkedFragments);
    }
  } catch (e) {
    throw new TypeError('Incorrect type of Node Element');
  }
};

export const toggleAsideMenu = (): void => {
  document.querySelector('.aside__list')?.classList.toggle('aside__list_open');
};

export const shakeElement = (elem: Element): void => {
  elem.classList.add('shake');
  setTimeout(() => elem.classList.remove('shake'), 500);
};

export const getPare = (elem: HTMLElement, dataIndex: string | null): HTMLElement | HTMLDivElement | null => {
  if (dataIndex) {
    if (elem instanceof HTMLDivElement) {
      const table: Element | null = document.querySelector('.table');
      if (table instanceof Element) return <HTMLElement>table.querySelector(`[data-hovered-index="${dataIndex}"]`);
    } else {
      const markup: Element | null = document.querySelector('.editor__markup');
      if (markup instanceof Element) return <HTMLDivElement>markup.querySelector(`[data-hovered-index="${dataIndex}"]`);
    }
  }
  return null;
};

const highlightCodeFragments = (target: HTMLElement): string => {
  let textContent = '';
  const dataIndex: string | null = target.getAttribute('data-hovered-index');
  const pare = getPare(target, dataIndex);
  if (pare) {
    const code = target instanceof HTMLDivElement ? target : pare;
    code.classList.add('hovered__code');
    if (target instanceof HTMLDivElement) {
      pare.classList.add('hovered__restaurant');
    } else {
      target.classList.add('hovered__restaurant');
    }
    if (
      code.getAttribute('data-hovered-index')?.length === 1 &&
      code.firstElementChild?.textContent &&
      code.lastElementChild?.textContent
    ) {
      textContent = code.firstElementChild?.textContent + code.lastElementChild?.textContent;
    } else {
      textContent = `${code.textContent?.trim()}`;
    }
  }
  return textContent;
};

const highlightPare = (e: MouseEvent): void => {
  try {
    if (e instanceof MouseEvent) {
      if (e.currentTarget instanceof HTMLElement && e.target instanceof HTMLElement) {
        const desc: HTMLDivElement | null = document.querySelector('.description');
        if (desc && desc instanceof HTMLDivElement) {
          desc.style.display = 'block';
          desc.textContent = highlightCodeFragments(
            e.currentTarget instanceof HTMLDivElement ? e.currentTarget : e.target
          );
        }
      } else {
        throw new TypeError('Incorrect type of Event Target');
      }
    } else {
      throw new TypeError('Incorrect type of Event');
    }
  } catch (e) {
    console.error(e);
  }
};

const hideLinkedFragments = (): void => {
  try {
    const desc: HTMLDivElement | null = document.querySelector('.description');
    if (desc instanceof HTMLDivElement) desc.style.display = '';
    document.querySelectorAll('.hovered__restaurant').forEach((el) => el.classList.remove('hovered__restaurant'));
    document.querySelectorAll('.hovered__code').forEach((el) => el.classList.remove('hovered__code'));
  } catch (e) {
    console.error(e);
  }
};

export const winGame = (): void => {
  document.querySelector('.reset')?.classList.add('reset_won');
  document.querySelector('.popup')?.classList.add('popup_active');
};

export const isCheatAnswer = (value: string): boolean => {
  return value.includes('pop') || value.includes('strobe');
};

export const getCompletionStatusClass = (level: Level): string => {
  switch (level.completionStatus) {
    case COMPLETION_STATUS.COMPLETE:
      return 'complete';
    case COMPLETION_STATUS.COMPLETE_WITH_HELP:
      return 'complete-with-hint';
    default:
      return 'incomplete';
  }
};

export const removeCompleteClass = (elem: Element | null, className: string): void => {
  if (elem) {
    elem.classList.remove(`${className}_complete`);
    elem.classList.remove(`${className}_complete-with-hint`);
    elem.classList.add(`${className}_incomplete`);
  }
};

export const addCompleteWithHintClass = (elem: Element | null, className: string): void => {
  if (elem && !elem.classList.contains(`${className}_complete`)) {
    elem.classList.remove(`${className}_incomplete`);
    elem.classList.add(`${className}_complete-with-hint`);
  }
};

export const addCompleteClass = (elem: Element | null, className: string): void => {
  if (elem) {
    elem.classList.remove(`${className}_incomplete`);
    elem.classList.remove(`${className}_complete-with-hint`);
    elem.classList.add(`${className}_complete`);
  }
};
