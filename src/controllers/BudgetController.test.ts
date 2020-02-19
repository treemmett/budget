import Budget from '../entities/Budget';
import BudgetController from './BudgetController';
import User from '../entities/User';
import UserController from './UserController';

let user: User;

beforeEach(async () => {
  user = await UserController.createUser(
    'testing@email.com',
    'Bobby',
    'Testing',
    'mySecretPassword'
  );
});

describe('Budget controller > budgets', () => {
  it('should create a budget', async () => {
    const budget = await BudgetController.createBudget('My Budget', user);

    expect(budget.id).toBeDefined();
    expect(budget.name).toBe('My Budget');
    expect(budget.user).toBe(user);
  });

  it('should list all budgets a user has access to', async () => {
    const budgetNames = ['Budget One', 'Budget Two', 'Budget Three'];
    await Promise.all(
      budgetNames.map(name => BudgetController.createBudget(name, user))
    );

    const budgets = await BudgetController.getBudgets(user);

    expect(budgets).toBeInstanceOf(Array);
    expect(budgets.length).toBe(3);
    budgetNames.forEach(name => {
      expect(budgets.map(b => b.name)).toContain(name);
    });
  });

  it('should return a specific budget', async () => {
    const [budget] = await Promise.all(
      ['Budget One', 'Budget Two', 'Budget Three'].map(name =>
        BudgetController.createBudget(name, user)
      )
    );
    const foundBudget = await BudgetController.getBudgets(user, budget.id);

    expect(foundBudget).toBeInstanceOf(Budget);
    expect(foundBudget.id).toBe(budget.id);
  });

  it('should not return any budgets of another user', async () => {
    const secondUser = await UserController.createUser(
      'other@email.com',
      'John',
      'Doe',
      'myPass'
    );

    await Promise.all([
      Promise.all(
        ['My budget one', 'My budget two'].map(name =>
          BudgetController.createBudget(name, user)
        )
      ),
      Promise.all(
        ['Not my budget three', 'Not my budget three'].map(name =>
          BudgetController.createBudget(name, secondUser)
        )
      )
    ]);

    const myBudgets = await BudgetController.getBudgets(user);

    expect(myBudgets.length).toBe(2);
    expect(myBudgets.map(b => b.name)).toContain('My budget one');
    expect(myBudgets.map(b => b.name)).toContain('My budget two');
  });

  it('should rename the budget', async () => {
    const budget = await BudgetController.createBudget('My Budget', user);

    expect(budget.name).toBe('My Budget');

    await new BudgetController(budget).renameBudget('My Renamed Budget');
    expect(budget.name).toBe('My Renamed Budget');

    const foundBudget = await BudgetController.getBudgets(user, budget.id);
    expect(foundBudget.name).toBe('My Renamed Budget');
  });
});
