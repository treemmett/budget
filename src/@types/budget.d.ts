declare module 'budget' {
  export interface Account {
    id: string;
    name: string;
  }

  export interface TransactionCategory {
    allocation: number;
    id: string;
    name: string;
    sort: number;
  }

  export interface CategoryGroup {
    categories: TransactionCategory[];
    id: string;
    name: string;
    sort: number;
  }

  export interface Budget {
    id: string;
    name: string;
    categoryGroup: CategoryGroup;
  }

  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}
