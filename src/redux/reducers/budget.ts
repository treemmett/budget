import {
  Budget,
  BudgetActions,
  Category,
  CategoryAllocation,
  GET_BUDGETS,
  GET_CATEGORIES,
  Group
} from '../types/budget';

export const defaultState = {
  selectedBudget: '',
  budgets: [] as Budget[],
  categories: [] as Category[],
  categoryAllocation: [] as CategoryAllocation[],
  groups: [] as Group[]
};

export default function authentication(
  state = defaultState,
  action: BudgetActions
): typeof defaultState {
  switch (action.type) {
    case GET_BUDGETS:
      return {
        ...state,
        selectedBudget: action.payload.selectedBudget,
        budgets: action.payload.budgets
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categoryAllocation: action.payload.categoryAllocations,
        categories: action.payload.categories,
        groups: action.payload.groups
      };

    default:
      return state;
  }
}
