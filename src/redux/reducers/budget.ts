import {
  ADD_CATEGORY,
  ADD_TRANSACTION,
  ALLOCATE_FUNDS,
  Budget,
  BudgetActions,
  CHANGE_DATE,
  Category,
  CategoryAllocation,
  GET_BUDGETS,
  GET_CATEGORIES,
  Group,
  SET_CATEGORIES,
  SET_GROUPS,
  SET_TRANSACTIONS,
  Transaction
} from '../types/budget';

export const defaultState = {
  budgets: [] as Budget[],
  categories: [] as Category[],
  categoryAllocation: [] as CategoryAllocation[],
  groups: [] as Group[],
  month: new Date().getMonth(),
  selectedBudget: '',
  transactions: [] as Transaction[],
  year: new Date().getFullYear()
};

export default function authentication(
  state = defaultState,
  action: BudgetActions
): typeof defaultState {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };

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

    case CHANGE_DATE:
      return {
        ...state,
        month: action.payload.month,
        year: action.payload.year
      };

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

    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload.groups
      };

    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };

    default:
      return state;
  }
}
