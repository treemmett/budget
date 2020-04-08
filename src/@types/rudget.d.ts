declare module 'rudget' {
  export interface Allocation {
    amount: number;
    date: Date;
    month: number;
    year: number;
  }

  export interface Budget {
    id: string;
    name: string;
  }

  export interface CategoryGroup {
    allocation: Allocation;
    categories: TransactionCategory[];
    id: string;
    name: string;
  }

  export interface TransactionCategory {
    allocation: Allocation;
    budget: Budget;
    group: CategoryGroup;
    id: string;
    name: string;
  }
}
