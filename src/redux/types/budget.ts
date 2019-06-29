export const ALLOCATE_FUNDS = 'ALLOCATE_FUNDS';
export const GET_BUDGETS = 'GET_BUDGETS';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export interface Budget {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  groupId: string;
}

export interface CategoryAllocation {
  amount: string;
  categoryId: string;
  month: number;
  year: number;
}

export interface Group {
  id: string;
  name: string;
  budgetId: string;
}

export interface AllocateFunds {
  type: typeof ALLOCATE_FUNDS;
  payload: {
    amount: string;
    categoryId: string;
    month: number;
    year: number;
    index?: number;
  };
}

export interface GetBudgets {
  type: typeof GET_BUDGETS;
  payload: {
    budgets: Budget[];
    selectedBudget: string;
  };
}

export interface GetCategories {
  type: typeof GET_CATEGORIES;
  payload: {
    categories: Category[];
    categoryAllocations: CategoryAllocation[];
    groups: Group[];
  };
}

export type BudgetActions = AllocateFunds | GetBudgets | GetCategories;
