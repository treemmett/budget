declare module 'rudget' {
  export interface Budget {
    id: string;
    name: string;
    categoryGroup: CategoryGroup;
  }

  export interface CategoryGroup {
    categories: TransactionCategory[];
    category: TransactionCategory;
    id: string;
    name: string;
    sort: number;
  }

  export interface TransactionCategory {
    allocation: number;
    budget: Budget;
    group: CategoryGroup;
    id: string;
    name: string;
    sort: number;
  }

  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}
