import Account, { AccountType } from '../entities/Account';
import Budget from '../entities/Budget';
import BudgetController from './BudgetController';
import User from '../entities/User';
import UserController from './UserController';
import { getManager } from 'typeorm';

let user: User;

beforeEach(async () => {
  user = await UserController.createUser(
    'testing@budget.com',
    'Bobby',
    'Testing',
    'mySecretPassword'
  );
});

afterEach(async () => {
  await getManager().remove(user);
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
      'other@budget.com',
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

describe('Budget controller > accounts', () => {
  let budget: Budget;
  let controller: BudgetController;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
  });

  afterEach(async () => {
    await getManager().remove(budget);
  });

  it('should create a checking account', async () => {
    const account = await controller.createAccount(
      'My Checking Account',
      AccountType.checking
    );

    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBeDefined();
    expect(account.name).toBe('My Checking Account');
    expect(account.type).toBe(0);
    expect(account.budget.id).toBe(budget.id);
  });

  it('should create a savings account', async () => {
    const account = await controller.createAccount(
      'My Savings Account',
      AccountType.savings
    );

    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBeDefined();
    expect(account.name).toBe('My Savings Account');
    expect(account.type).toBe(1);
    expect(account.budget.id).toBe(budget.id);
  });

  it('should create a credit card account', async () => {
    const account = await controller.createAccount(
      'My Credit Card',
      AccountType.creditCard
    );

    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBeDefined();
    expect(account.name).toBe('My Credit Card');
    expect(account.type).toBe(2);
    expect(account.budget.id).toBe(budget.id);
  });

  it('should return all accounts in the budget', async () => {
    await Promise.all(
      ['Name 1', 'Name 2', 'Name 3'].map(name =>
        controller.createAccount(name, AccountType.checking)
      )
    );

    const accounts = await controller.getAccounts();

    expect(accounts).toBeInstanceOf(Array);
    expect(accounts.length).toBe(3);
    expect(accounts[2]).toBeInstanceOf(Account);
  });

  it('should return a specific account', async () => {
    const accounts = await Promise.all(
      ['Name 1', 'Name 2', 'Name 3'].map(name =>
        controller.createAccount(name, AccountType.checking)
      )
    );

    const account = await controller.getAccounts(accounts[1].id);
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBe(accounts[1].id);
  });

  it('should not return accounts in another budget', async () => {
    const rightAccount = await controller.createAccount(
      'Right account',
      AccountType.checking
    );
    const wrongBudget = await BudgetController.createBudget(
      'Wrong Budget',
      user
    );
    const wrongController = new BudgetController(wrongBudget);
    await wrongController.createAccount('Wrong account', AccountType.checking);
    await wrongController.createAccount('Wrong account 2', AccountType.savings);

    const accounts = await controller.getAccounts();
    expect(accounts.length).toBe(1);
    expect(accounts[0].id).toBe(rightAccount.id);
  });

  it('should delete an account', async () => {
    await controller.createAccount('Account One', AccountType.checking);
    await controller.createAccount('Account Two', AccountType.checking);

    const accounts = await controller.getAccounts();
    expect(accounts.length).toBe(2);

    await controller.deleteAccount(accounts[0].id);
    const accountsAfterDeletion = await controller.getAccounts();
    expect(accountsAfterDeletion.length).toBe(1);
    expect(accountsAfterDeletion[0].id).toBe(accounts[1].id);
  });

  it('should edit the account type', async () => {
    let account = await controller.createAccount(
      'My Account',
      AccountType.checking
    );
    expect(account.type).toBe(0);

    await controller.updateAccount(account.id, undefined, AccountType.savings);
    account = await controller.getAccounts(account.id);
    expect(account.type).toBe(1);
  });

  it('should edit the account name', async () => {
    let account = await controller.createAccount(
      'My Account',
      AccountType.checking
    );
    expect(account.name).toBe('My Account');

    await controller.updateAccount(account.id, 'My New Name');
    account = await controller.getAccounts(account.id);
    expect(account.name).toBe('My New Name');
  });
});
