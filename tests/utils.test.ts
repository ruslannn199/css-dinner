import Level from '../rs-css/components/levels/level';
import { COMPLETION_STATUS } from '../rs-css/components/types/enums';
import { getChar, getCompletionStatusClass, getPare, isCheatAnswer, winGame } from '../rs-css/components/utils/utils';

describe('Function getChar', () => {

  it('should return string', () => {
    expect(typeof getChar(0)).toBe('string');
  });

  it('should return letter A if it given 0', () => {
    expect(getChar(0)).toBe('A');
  });

  it('should return letter N if it given 13', () => {
    expect(getChar(13)).toBe('N');
  });

  it('should return letter Z if it given 25', () => {
    expect(getChar(25)).toBe('Z');
  });

  it('should return letter A if it given less than 0', () => {
    expect(getChar(-Math.floor((Math.random() * 100)))).toBe('A');
  });

  it('should return letter Z if it given more than 25', () => {
    expect(getChar(Math.floor((Math.random() * 100)) + 25)).toBe('Z');
  });
});

describe('Function getPare', () => {
  let tableElement: HTMLElement;
  let markupElement: HTMLDivElement;
  const realIndex = 'A';
  const fakeIndex = 'D';
  const nullIndexes = [null, ''];

  beforeAll(() => {
    document.body.innerHTML = `
      <div class="table">
        <apple data-hovered-index="A"></apple>
      </div>
      <div class="editor__markup">
        <div data-hovered-index="A"></div>
      </div>
    `;
    tableElement = <HTMLElement>document.querySelector('apple');
    markupElement = <HTMLDivElement>document.querySelector('.editor__markup')?.querySelector('div');
  });
  
  it('should return markup element if it is restaurantElement which is HTMLDivElement', () => {
    const result = getPare(tableElement, realIndex);
    expect(result).toBe(markupElement);
    expect(result).toBeInstanceOf(HTMLDivElement);
    expect(result).toBeInTheDocument();
  });

  it('should return table element if it is .editor__markup\'s element which is HTMLElement', () => {
    const result = getPare(markupElement, realIndex);
    expect(result).toBe(tableElement);
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result).toBeInTheDocument();
  });

  it('should return element with attribute data-hovered-index that is equals', () => {
    expect(getPare(tableElement, realIndex)).toHaveAttribute('data-hovered-index', 'A');
    expect(getPare(markupElement, realIndex)).toHaveAttribute('data-hovered-index', 'A');
  });

  it('should return null if index is empty, null or fake', () => {
    expect(getPare(tableElement, nullIndexes[0])).toBeNull();
    expect(getPare(markupElement, nullIndexes[1])).toBeNull();
    expect(getPare(tableElement, fakeIndex)).toBeNull();
    expect(getPare(markupElement, fakeIndex)).toBeNull();
  });
});

describe('Function winGame', () => {
  let resetBtn: HTMLButtonElement;
  let popup: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <button class="reset"></button>
      <div class="popup"></div>
    `;

    resetBtn = <HTMLButtonElement>document.querySelector('.reset');
    popup = <HTMLDivElement>document.querySelector('.popup');
  })

  it('shouldn\'t return anything', () => {
    expect(winGame()).toBeUndefined();
  });

  it('should add classes reset_won and popup_active to .reset and .popup elements', () => {
    winGame();
    expect(resetBtn).toHaveClass('reset_won');
    expect(popup).toHaveClass('popup_active');
  });

  it('shouldn\'t add class if there is no element match', () => {
    document.body.innerHTML = '';
    winGame();
    expect(resetBtn).not.toHaveClass('reset_won');
    expect(popup).not.toHaveClass('popup_active');
  });
});

describe('Function isCheatAnswer', () => {
  it('should return boolean', () => {
    expect(typeof isCheatAnswer('')).toBe('boolean');
  });

  it('should return true if value includes pop or strobe', () => {
    expect(isCheatAnswer('pop')).toBeTruthy();
    expect(isCheatAnswer('strobe')).toBeTruthy();
    expect(isCheatAnswer('.strobe')).toBeTruthy();
    expect(isCheatAnswer('.pop')).toBeTruthy();
  });

  it('should return false otherwise', () => {
    expect(isCheatAnswer('')).toBeFalsy();
    expect(isCheatAnswer('apple')).toBeFalsy();
    expect(isCheatAnswer('orange')).toBeFalsy();
  });
});

describe('Function getCompletionStatusClass', () => {

  const level = new Level({});
  level.completionStatus = COMPLETION_STATUS.INCOMPLETE;

  it('should return string', () => {
    expect(typeof getCompletionStatusClass(level)).toBe('string');
  });

  it('should return incomplete if completion status is incomplete', () => {
    expect(getCompletionStatusClass(level)).toBe('incomplete');
  });

  it('should return complete if completion status is complete', () => {
    level.completionStatus = COMPLETION_STATUS.COMPLETE;
    expect(getCompletionStatusClass(level)).toBe('complete');
  });

  it('should return complete-with-hint if completion status is complete with help', () => {
    level.completionStatus = COMPLETION_STATUS.COMPLETE_WITH_HELP;
    expect(getCompletionStatusClass(level)).toBe('complete-with-hint');
  });
})
