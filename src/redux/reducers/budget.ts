import { Budget, BudgetActions, GET_BUDGETS } from '../types/budget';

export const defaultState = {
  selectedBudget: '',
  budgets: [] as Budget[]
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

    default:
      return state;
  }
}
