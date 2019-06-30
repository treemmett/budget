import {
  ALLOCATE_FUNDS,
  Budget,
  BudgetActions,
  Category,
  CategoryAllocation,
  GET_BUDGETS,
  GET_CATEGORIES,
  Group,
  SET_CATEGORIES
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
    case ALLOCATE_FUNDS: {
      if (action.payload.index) {
        return {
          ...state,
          categoryAllocation: [
            ...state.categoryAllocation.slice(0, action.payload.index),
            ...state.categoryAllocation.slice(action.payload.index + 1),
            {
              amount: action.payload.amount,
              categoryId: action.payload.categoryId,
              month: action.payload.month,
              year: action.payload.year
            }
          ]
        };
      }

      return {
        ...state,
        categoryAllocation: [...state.categoryAllocation, action.payload]
      };
    }

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

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      };

    default:
      return state;
  }
}
