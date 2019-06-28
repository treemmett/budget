export const GET_BUDGETS = 'GET_BUDGETS';

export interface Budget {
  id: string;
  name: string;
}

export interface GetBudgets {
  type: typeof GET_BUDGETS;
  payload: {
    budgets: Budget[];
    selectedBudget: string;
  };
}

export type BudgetActions = GetBudgets;
