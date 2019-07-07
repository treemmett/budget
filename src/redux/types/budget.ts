export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ALLOCATE_FUNDS = 'ALLOCATE_FUNDS';
export const CHANGE_DATE = 'CHANGE_DATE';
export const GET_BUDGETS = 'GET_BUDGETS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_GROUPS = 'SET_GROUPS';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export interface Budget {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  groupId: string;
  sort: number;
}

export interface CategoryAllocation {
  amount: number;
  categoryId: string;
  month: number;
  year: number;
}

export interface Group {
  id: string;
  name: string;
  budgetId: string;
  sort: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface AddCategory {
  type: typeof ADD_CATEGORY;
  payload: Category;
}

export interface AddTransaction {
  type: typeof ADD_TRANSACTION;
  payload: Transaction;
}

export interface AllocateFunds {
  type: typeof ALLOCATE_FUNDS;
  payload: {
    amount: number;
    categoryId: string;
    month: number;
    year: number;
    index?: number;
  };
}

export interface ChangeDate {
  type: typeof CHANGE_DATE;
  payload: {
    month: number;
    year: number;
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

export interface SetCategories {
  type: typeof SET_CATEGORIES;
  payload: {
    categories: Category[];
  };
}

export interface SetGroups {
  type: typeof SET_GROUPS;
  payload: {
    groups: Group[];
  };
}

export interface SetTransactions {
  type: typeof SET_TRANSACTIONS;
  payload: Transaction[];
}

export type BudgetActions =
  | AddCategory
  | AddTransaction
  | AllocateFunds
  | ChangeDate
  | GetBudgets
  | GetCategories
  | SetCategories
  | SetGroups
  | SetTransactions;
