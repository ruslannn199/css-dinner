import { COMPLETION_STATUS } from '../types/enums';
import { restaurantElement } from '../types/types';

abstract class LevelTemp {
  abstract completionStatus?: COMPLETION_STATUS;

  abstract buildLevel(...levelObj: restaurantElement[][]): void;
}

export default LevelTemp;
