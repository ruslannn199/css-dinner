import Dish from '../rs-css/components/game/dish';
import Food from '../rs-css/components/game/food';
import Table from '../rs-css/components/game/table';
import Level from '../rs-css/components/levels/level';
import { DISH_TYPE, FOOD_TYPE } from '../rs-css/components/types/enums';

describe(`Table's method search`, () => {
  let table = new Table(document.body);
  table.field.element.insertAdjacentHTML('beforeend',`
    <apple></apple>
    <orange class="small"></orange>
    <apple class="small></apple>
  `);

  it(`should return NodeListOf elements that belongs to table if selector matches elements`, () => {
    const result1 = table.search('apple');
    const result2 = table.search('.small');
    expect(result1).toBeInstanceOf(NodeList);
    expect(result2).toBeInstanceOf(NodeList);
    result1?.forEach((el) => {
      expect(el).toBeInTheDocument();
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.tagName).toBe('APPLE');
    });
    result2?.forEach((el) => {
      expect(el).toBeInTheDocument();
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el).toHaveClass('small');
    });
  });

  it(`should return [] if there's no matches`, () => {
    const emptyResult1 = table.search('#fancy');
    const emptyResult2 = table.search('div');

    expect(emptyResult1).toHaveLength(0);
    expect(emptyResult2).toHaveLength(0);
  });
  
  afterAll(() => {
    document.body.innerHTML = '';
  });
});

describe(`Table's method updateStructure`, () => {
  const table = new Table(document.body);
  const level1 = new Level({});
  const level2 = new Level({});
  const apple = new Food(FOOD_TYPE.APPLE);
  const bento = new Dish(DISH_TYPE.BENTO);
  const pickle = new Food(FOOD_TYPE.PICKLE);
  const plate = new Dish(DISH_TYPE.PLATE);
  const smallApple = new Food(FOOD_TYPE.APPLE, { isSmall: true });
  const orange = new Food(FOOD_TYPE.ORANGE);
  level1.buildLevel([apple], [bento, pickle]);
  level2.buildLevel([plate, smallApple], [orange]);

  it(`should return tableCurrentStructure`, () => {
    const result = table.updateStructure(level1);
    expect(result).toHaveProperty('heads');
    expect(result).toHaveProperty('foods');
  });

  it(`should update table's structure`, () => {
    const result1 = table.updateStructure(level1);
    expect(result1).toHaveProperty('heads', [apple, bento]);
    expect(result1).toHaveProperty('foods', [null, [pickle]]);
    const result2 = table.updateStructure(level2);
    expect(result2).toHaveProperty('heads', [plate, orange]);
    expect(result2).toHaveProperty('foods', [[smallApple], null]);
  });

  afterAll(() => {
    document.body.innerHTML = '';
  })
})