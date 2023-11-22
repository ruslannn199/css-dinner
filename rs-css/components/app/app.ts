import Editor from '../game/editor';
import Table from '../game/table';
import Level from '../levels/level';
import level1 from '../levels/level1';
import level2 from '../levels/level2';
import level3 from '../levels/level3';
import level4 from '../levels/level4';
import level5 from '../levels/level5';
import level6 from '../levels/level6';
import level7 from '../levels/level7';
import level8 from '../levels/level8';
import level9 from '../levels/level9';
import level10 from '../levels/level10';
import BaseComponent from '../types/baseComponent';
import { COMPLETION_STATUS } from '../types/enums';
import { IApp } from '../types/interfaces';
import { inputEventType } from '../types/types';
import {
  addCompleteClass,
  addCompleteWithHintClass,
  getCompletionStatusClass,
  isCheatAnswer,
  removeCompleteClass,
  shakeElement,
  toggleAsideMenu,
  winGame,
} from '../utils/utils';

class App implements IApp {
  private levels: Level[] = [];
  private gameProgress: COMPLETION_STATUS[] = [];
  private static instance: App | undefined;
  private curLevel = 1;
  public table = new Table(<HTMLElement>document.querySelector('.main'));
  public editor = new Editor(<HTMLElement>document.querySelector('.main'));
  public helpBtn = new BaseComponent<HTMLButtonElement>(
    <HTMLElement>document.querySelector('.main'),
    'button',
    ['help'],
    '?'
  );
  constructor(stringedLevel: string | null) {
    if (App.instance) return App.instance;
    this.levels.push(level1);
    this.levels.push(level2);
    this.levels.push(level3);
    this.levels.push(level4);
    this.levels.push(level5);
    this.levels.push(level6);
    this.levels.push(level7);
    this.levels.push(level8);
    this.levels.push(level9);
    this.levels.push(level10);
    this.curLevel = stringedLevel ? parseInt(stringedLevel, 10) : 1;
    const progress = localStorage.getItem('progress');
    const levelCompletion =
      progress && JSON.parse(progress)
        ? JSON.parse(progress)
        : [...Array(this.levels.length)].fill(COMPLETION_STATUS.INCOMPLETE);

    this.gameProgress = [...levelCompletion];
    this.levels.forEach((level, i) => (level.completionStatus = this.gameProgress[i]));
    App.instance = this;
  }

  public resetLevels = (): void => {
    this.gameProgress = [...Array(this.levels.length)].fill(COMPLETION_STATUS.INCOMPLETE);
    document.querySelectorAll('.aside__list-item').forEach((item: Element) => {
      removeCompleteClass(item, 'aside__list-item');
    });
    this.levels.forEach((level) => (level.completionStatus = COMPLETION_STATUS.INCOMPLETE));
    removeCompleteClass(document.querySelector('.aside__title'), 'aside__title');
    document.querySelectorAll('.flyUp').forEach((el: Element): void => {
      el.classList.remove('flyUp');
      el.classList.add('strobe');
    });
    document.querySelector('.reset_won')?.classList.remove('reset_won');
    const popup: HTMLDivElement | null = document.querySelector('.popup_active');
    if (popup) {
      popup.style.display = 'none';
      popup.classList.remove('popup_active');
      setTimeout(() => (popup.style.display = ''), 250);
    }
  };

  private addBtnListeners = async (target: HTMLButtonElement): Promise<void> => {
    target.addEventListener('click', this.insertAnswer);
    this.editor.input.element.disabled = false;

    document.querySelector('.reset')?.addEventListener('click', this.resetLevels);

    window.addEventListener('keyup', this.nextLevel);
    window.addEventListener('keyup', this.prevLevel);

    const prevBtn = document.querySelector('.aside__btn_previous');
    if (prevBtn instanceof HTMLButtonElement) prevBtn.addEventListener('click', this.prevLevel);

    const nextBtn = document.querySelector('.aside__btn_next');
    if (nextBtn instanceof HTMLButtonElement) nextBtn.addEventListener('click', this.nextLevel);

    const burger = document.getElementById('burger');
    if (burger instanceof HTMLInputElement) burger.disabled = false;

    const enterBtn = document.querySelector('.enter');
    if (enterBtn instanceof HTMLButtonElement) enterBtn.addEventListener('click', this.checkAnswer);
    this.editor.input.element.addEventListener('keyup', this.checkAnswer);

    document.querySelectorAll('.aside__list-item').forEach((item) => {
      if (item instanceof HTMLLIElement) item.addEventListener('click', this.chooseLevel);
    });
  };

  private removeBtnListeners = async (target: HTMLButtonElement): Promise<void> => {
    target.removeEventListener('click', this.insertAnswer);
    this.editor.input.element.disabled = true;

    document.querySelector('.reset')?.removeEventListener('click', this.resetLevels);

    window.removeEventListener('keyup', this.nextLevel);
    window.removeEventListener('keyup', this.prevLevel);

    const prevBtn = document.querySelector('.aside__btn_previous');
    if (prevBtn instanceof HTMLButtonElement) prevBtn.removeEventListener('click', this.prevLevel);

    const nextBtn = document.querySelector('.aside__btn_next');
    if (nextBtn instanceof HTMLButtonElement) nextBtn.removeEventListener('click', this.nextLevel);

    const burger = document.getElementById('burger');
    if (burger instanceof HTMLInputElement) burger.disabled = true;

    const enterBtn = document.querySelector('.enter');
    if (enterBtn instanceof HTMLButtonElement) enterBtn.removeEventListener('click', this.checkAnswer);
    this.editor.input.element.removeEventListener('keyup', this.checkAnswer);

    document.querySelectorAll('.aside__list-item').forEach((item) => {
      if (item instanceof HTMLLIElement) item.removeEventListener('click', this.chooseLevel);
    });
  };

  private delay = (letter: string, ms: number): Promise<string> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(letter);
      }, ms)
    );
  };

  private typeText = async (input: HTMLInputElement, answer: string | undefined, ms: number): Promise<void> => {
    if (answer && typeof answer === 'string' && typeof ms === 'number') {
      for (let i = 0; i < answer.length; i += 1) {
        const letter = await this.delay(answer[i], ms);
        input.value += letter;
        input.selectionStart = input.selectionEnd = input.value.length;
        input.focus();
      }
    }
  };

  private completeWithHint = async (): Promise<void> => {
    const answer = Array.from(document.querySelectorAll('.strobe'));
    answer.forEach((el: Element): void => {
      el.classList.remove('strobe');
      el.classList.add('flyUp');
    });
    if (!this.gameProgress[this.curLevel - 1]) {
      this.levels[this.curLevel - 1].completionStatus = COMPLETION_STATUS.COMPLETE_WITH_HELP;
      this.gameProgress[this.curLevel - 1] = COMPLETION_STATUS.COMPLETE_WITH_HELP;
    }
    addCompleteWithHintClass(document.querySelectorAll('.aside__list-item')[this.curLevel - 1], 'aside__list-item');
    addCompleteWithHintClass(document.querySelector('.aside__title'), 'aside__title');
    this.checkForGameWin();
  };

  private insertAnswer = async (e: MouseEvent | PointerEvent): Promise<void> => {
    try {
      if (e instanceof MouseEvent && e instanceof PointerEvent) {
        if (e.currentTarget instanceof HTMLButtonElement) {
          const target = e.currentTarget;
          await this.removeBtnListeners(target);
          const answer = this.levels[this.curLevel - 1].assistance;
          const ms = 200;
          this.editor.input.element.value = '';

          await this.typeText(this.editor.input.element, answer, ms);

          await this.completeWithHint();

          await this.addBtnListeners(target);
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

  private checkForGameWin = (): void => {
    if (this.gameProgress.every((elem) => elem)) {
      winGame();
    } else if (this.curLevel < this.levels.length) {
      setTimeout(() => {
        Level.unload(this);
        this.curLevel += 1;
        this.loadLevel();
      }, 1000);
    } else if (this.curLevel === this.levels.length) {
      Level.unload(this);
      this.curLevel =
        this.gameProgress.findIndex((elem: COMPLETION_STATUS) => elem === COMPLETION_STATUS.INCOMPLETE) + 1;
      this.loadLevel();
    }
  };

  private compareResults = (result: NodeListOf<Element> | undefined): void => {
    if (result && result.length) {
      const answer = Array.from(document.querySelectorAll('.strobe'));
      if (answer.every((elem: Node, i: number) => elem === result[i]) && answer.length) {
        result.forEach((el: Element): void => {
          el.classList.remove('strobe');
          el.classList.add('flyUp');
        });
        this.levels[this.curLevel - 1].completionStatus = COMPLETION_STATUS.COMPLETE;
        this.gameProgress[this.curLevel - 1] = COMPLETION_STATUS.COMPLETE;
        addCompleteClass(document.querySelectorAll('.aside__list-item')[this.curLevel - 1], 'aside__list-item');
        addCompleteClass(document.querySelector('.aside__title'), 'aside__title');
        this.checkForGameWin();
      } else {
        answer.forEach((el: Element): void => {
          el.classList.remove('strobe', 'pop');
          setTimeout(() => el.classList.add('strobe', 'pop'), 500);
        });
        result.forEach((el: Element) => shakeElement(el));
      }
    } else {
      this.editor.shake();
    }
  };

  private checkAnswerPossibility = (selector: string): void => {
    if (selector && !isCheatAnswer(selector)) {
      this.compareResults(this.table.search(selector));
    } else {
      this.editor.shake();
    }
  };

  public checkAnswer = (e: inputEventType): void => {
    try {
      if ((e instanceof KeyboardEvent && e.code === 'Enter') || e instanceof MouseEvent || e instanceof PointerEvent) {
        if (e.currentTarget instanceof HTMLInputElement) {
          this.editor.enterBtn.addClass('enter_active');
          setTimeout(() => this.editor.enterBtn.removeClass('enter_active'), 250);
          this.checkAnswerPossibility(e.currentTarget.value);
        } else if (e instanceof MouseEvent || e instanceof PointerEvent) {
          this.checkAnswerPossibility(this.editor.input.element.value);
        } else {
          throw new TypeError(`Event can be assign only to HTMLInputElement`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  private loadLevel = (levelNumber: number = this.curLevel): void => {
    Level.load(this.levels[levelNumber - 1], this);
    this.editor.generateHTMLViewer(this.table);
    const title = document.querySelector('.aside__title');
    if (title) {
      title.textContent = `Level ${levelNumber} of ${this.levels.length} `;
      title.classList.remove('aside__title_complete');
      title.classList.remove('aside__title_complete-with-hint');
      title.classList.remove('aside__title_incomplete');
      title.classList.add(`aside__title_${getCompletionStatusClass(this.levels[levelNumber - 1])}`);
    }

    const progressBar = <HTMLElement>document.querySelector('.aside__progress-bar');
    if (progressBar) progressBar.style.width = `${(levelNumber * 100) / this.levels.length}%`;

    this.table.field.element.childNodes.forEach((slot) => {
      if (slot.childNodes.length) {
        slot.childNodes.forEach((food) => {
          if (food instanceof Element && food.classList.contains('flyUp')) {
            food.classList.remove('flyUp');
            food.classList.add('strobe');
          }
        });
      }
      if (slot instanceof Element && slot.classList.contains('flyUp')) {
        slot.classList.remove('flyUp');
        slot.classList.add('strobe');
      }
    });
  };

  public chooseLevel = (e: MouseEvent | PointerEvent): void => {
    try {
      if (e.currentTarget instanceof HTMLElement) {
        Level.unload(this);
        const target: HTMLElement = e.currentTarget;
        if (target.textContent) {
          this.curLevel = parseInt(target.textContent, 10);
          this.loadLevel();

          const burger = <HTMLInputElement>document.getElementById('burger');
          if (burger) burger.checked = false;
          toggleAsideMenu();
        } else {
          throw new ReferenceError('Invalid input number');
        }
      } else {
        throw new TypeError(`Can't assign value to non-HTMLElement`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  public start = (): void => {
    this.helpBtn.element.addEventListener('click', this.insertAnswer);
    const asideList = document.querySelector('.aside__list');
    if (asideList)
      this.levels.forEach((level, i) => {
        const listItem = document.createElement('li');
        listItem.classList.add('aside__list-item', `aside__list-item_${getCompletionStatusClass(level)}`);
        listItem.textContent = `${i + 1} `;
        listItem.addEventListener('click', this.chooseLevel);
        asideList.insertAdjacentElement('beforeend', listItem);
      });
    this.loadLevel();
  };

  public nextLevel = (e: inputEventType): void => {
    if (
      e instanceof PointerEvent ||
      e instanceof MouseEvent ||
      (e instanceof KeyboardEvent && e.code === 'ArrowRight' && document.activeElement !== this.editor.input.element)
    ) {
      if (this.curLevel < this.levels.length) {
        Level.unload(this);
        this.curLevel += 1;
        this.loadLevel();
      }
    }
  };

  public prevLevel = (e: inputEventType): void => {
    if (
      e instanceof PointerEvent ||
      e instanceof MouseEvent ||
      (e instanceof KeyboardEvent && e.code === 'ArrowLeft' && document.activeElement !== this.editor.input.element)
    ) {
      if (this.curLevel > 1) {
        Level.unload(this);
        this.curLevel -= 1;
        this.loadLevel();
      }
    }
  };

  public get currentLevel(): string {
    return this.curLevel.toString();
  }

  public get progress(): string {
    return JSON.stringify(this.gameProgress);
  }
}

export default App;
