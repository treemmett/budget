import Account, { AccountType } from '../entities/Account';
import IncomeSource, { PayScale } from '../entities/IncomeSource';
import Tax, { FilingStatus, State } from '../entities/Tax';
import Allocation from '../entities/Allocation';
import Budget from '../entities/Budget';
import BudgetController from './BudgetController';
import CategoryGroup from '../entities/CategoryGroup';
import HttpException from '../utils/HttpException';
import Transaction from '../entities/Transaction';
import TransactionCategory from '../entities/TransactionCategory';
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

  it('should throw if a non-existent budget is requested', async () => {
    await BudgetController.createBudget('My Budget', user);

    expect(
      BudgetController.getBudgets(user, '9c2cb8de-03c4-4f69-afab-dbdab33b30ba')
    ).rejects.toThrow(HttpException);
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

  it('should throw if a non-existent account is requested', async () => {
    await controller.createAccount('Some account', AccountType.checking);

    expect(
      controller.getAccounts('b027c4a8-6010-495b-b42d-5afd0e43b332')
    ).rejects.toThrow(HttpException);
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

describe('Budget controller > category groups', () => {
  let budget: Budget;
  let controller: BudgetController;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
  });

  afterEach(async () => {
    await getManager().remove(budget);
  });

  it('should create the default groups', async () => {
    const groups = await controller.getCategoryGroups();
    const groupNames = groups.map(g => g.name);

    expect(groups[0]).toBeInstanceOf(CategoryGroup);
    expect(groupNames).toContain('Housing');
    expect(groupNames).toContain('Transportation');
    expect(groupNames).toContain('Food');
    expect(groupNames).toContain('Personal Care');
    expect(groupNames).toContain('Quality of Life');
  });

  it('should create a new group', async () => {
    const group = await controller.createCategoryGroup('My New Group');

    expect(group).toBeInstanceOf(CategoryGroup);
    expect(group.id).toBeDefined();
    expect(group.name).toBe('My New Group');
  });

  it('should return a list of all groups', async () => {
    const groups = await controller.getCategoryGroups();

    expect(groups).toBeInstanceOf(Array);
    expect(groups.length).toBe(5);
    expect(groups[0]).toBeInstanceOf(CategoryGroup);
  });

  it('should return a specific group', async () => {
    const allGroups = await controller.getCategoryGroups();
    const group = await controller.getCategoryGroups(allGroups[0].id);
    expect(group).toBeInstanceOf(CategoryGroup);
    expect(group.id).toBe(allGroups[0].id);
  });

  it('should throw if a non-existent group is requested', async () => {
    await controller.createCategoryGroup('My Group');

    expect(
      controller.getCategoryGroups('3ab8543e-7da8-4736-9ac6-ed5557e346f7')
    ).rejects.toThrow(HttpException);
  });

  it('should delete a group', async () => {
    const group = await controller.createCategoryGroup('My New Category');
    let allGroups = await controller.getCategoryGroups();
    expect(allGroups.length).toBe(6);

    await controller.deleteCategoryGroup(group.id);

    allGroups = await controller.getCategoryGroups();
    expect(allGroups.length).toBe(5);
  });

  it('should not delete a group that contains categories', async () => {
    const groups = await controller.getCategoryGroups();

    try {
      await controller.deleteCategoryGroup(groups[0].id);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Unable to delete group that contains categories');
      expect(e.status).toBe(409);
    }
  });
});

describe('Budget controller > categories', () => {
  let budget: Budget;
  let controller: BudgetController;
  let group: CategoryGroup;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
    group = await controller.createCategoryGroup('My Group');
  });

  afterEach(async () => {
    await getManager().remove(budget);
  });

  it('should create a new category', async () => {
    const category = await controller.createCategory('My Category', group.id);

    expect(category).toBeInstanceOf(TransactionCategory);
    expect(category.id).toBeDefined();
  });

  it('should return all categories', async () => {
    await controller.createCategory('My Category', group.id);
    const categories = await controller.getCategories();

    expect(categories).toBeInstanceOf(Array);
    expect(categories[0]).toBeInstanceOf(TransactionCategory);
    expect(categories.length).toBe(18); // 17 default + 1 created
  });

  it('should return a specific category', async () => {
    const category = await controller.createCategory('My Category', group.id);
    const foundCategory = await controller.getCategories(category.id);

    expect(foundCategory).toBeInstanceOf(TransactionCategory);
    expect(foundCategory.id).toBe(category.id);
  });

  it('should return the categories in a group', async () => {
    await Promise.all(
      new Array(4)
        .fill(null)
        .map((_, i) => controller.createCategory(`Category ${i}`, group.id))
    );

    const categories = await controller.getCategoriesInGroup(group.id);

    expect(categories).toBeInstanceOf(Array);
    expect(categories.length).toBe(4);
    expect(categories[0]).toBeInstanceOf(TransactionCategory);
  });

  it('should create the default categories', async () => {
    const defaultGroups = [
      {
        name: 'Housing',
        categories: ['Rent', 'Insurance', 'Power', 'Gas', 'Internet']
      },
      {
        name: 'Transportation',
        categories: ['Auto Loan', 'Fuel', 'Insurance', 'Parking', 'Maintenance']
      },
      {
        name: 'Food',
        categories: ['Groceries', 'Dining']
      },
      {
        name: 'Personal Care',
        categories: ['Haircut', 'Medical']
      },
      {
        name: 'Quality of Life',
        categories: ['Entertainment', 'Clothing', 'Vacation']
      }
    ];

    const groups = await controller.getCategoryGroups();

    await Promise.all(
      defaultGroups.map(async defaultGroup => {
        const actualDefaultGroup = groups.find(
          g => g.name === defaultGroup.name
        ) as CategoryGroup;

        expect(actualDefaultGroup).toBeDefined();

        const defaultGroupCategories = await controller.getCategoriesInGroup(
          actualDefaultGroup.id
        );

        expect(defaultGroupCategories.length).toBe(
          defaultGroup.categories.length
        );

        expect(
          defaultGroupCategories.every(g =>
            defaultGroup.categories.includes(g.name)
          )
        ).toBe(true);
      })
    );
  });

  it('should rename a category', async () => {
    let category = await controller.createCategory('Original Name', group.id);
    expect(category.name).toBe('Original Name');

    await controller.renameCategory(category.id, 'Revised Name');
    category = await controller.getCategories(category.id);
    expect(category.name).toBe('Revised Name');
  });

  it('should delete a category', async () => {
    const category = await controller.createCategory('My Category', group.id);
    let categories = await controller.getCategories();
    expect(categories.map(c => c.id)).toContain(category.id);
    expect(controller.getCategories(category.id)).resolves.toBeInstanceOf(
      TransactionCategory
    );

    await controller.deleteCategory(category.id);
    categories = await controller.getCategories();
    expect(categories.map(c => c.id)).not.toContain(category.id);
    expect(controller.getCategories(category.id)).rejects.toThrow();
  });

  it('should change category groups', async () => {
    const otherGroup = await controller.createCategoryGroup('Other Group');
    const category = await controller.createCategory('My Category', group.id);

    let groupCategories = await controller.getCategoriesInGroup(group.id);
    let otherGroupCategories = await controller.getCategoriesInGroup(
      otherGroup.id
    );

    expect(groupCategories.map(g => g.id)).toContain(category.id);
    expect(otherGroupCategories.map(g => g.id)).not.toContain(category.id);

    await controller.setCategoryGroup(category.id, otherGroup.id);

    groupCategories = await controller.getCategoriesInGroup(group.id);
    otherGroupCategories = await controller.getCategoriesInGroup(otherGroup.id);

    expect(groupCategories.map(g => g.id)).not.toContain(category.id);
    expect(otherGroupCategories.map(g => g.id)).toContain(category.id);
  });
});

describe('Budget controller > allocations', () => {
  let budget: Budget;
  let controller: BudgetController;
  let group: CategoryGroup;
  let category: TransactionCategory;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
    group = await controller.createCategoryGroup('My Group');
    category = await controller.createCategory('My Category', group.id);
  });

  afterEach(async () => {
    await getManager().remove(budget);
  });

  it('should set an allocation', async () => {
    const allocation = await controller.setAllocation(
      category.id,
      new Date(2020, 0),
      400
    );

    expect(allocation).toBeInstanceOf(Allocation);
    expect(allocation.id).toBeDefined();
    expect(allocation.amount).toBe(400);
  });

  it('should return the allocation for a month', async () => {
    const allocation = await controller.setAllocation(
      category.id,
      new Date(2020, 5, 17),
      500
    );

    const foundAllocation = await controller.getAllocation(
      category.id,
      new Date(2020, 5, 3)
    );
    expect(foundAllocation.id).toBe(allocation.id);
    expect(foundAllocation.amount).toBe(500);
  });

  it('should replace the allocation for the same month', async () => {
    await controller.setAllocation(category.id, new Date(2018, 4, 6), 100);
    let alloc = await controller.getAllocation(
      category.id,
      new Date(2018, 4, 21)
    );
    expect(alloc.amount).toBe(100);

    await controller.setAllocation(category.id, new Date(2018, 4, 25), 500);
    alloc = await controller.getAllocation(category.id, new Date(2018, 4, 3));
    expect(alloc.amount).toBe(500);
  });

  it('should set separate allocations for different months', async () => {
    await controller.setAllocation(category.id, new Date(2019, 3, 1), 100);
    await controller.setAllocation(category.id, new Date(2019, 8, 30), 250);

    const alloc1 = await controller.getAllocation(
      category.id,
      new Date(2019, 3, 4)
    );
    const alloc2 = await controller.getAllocation(
      category.id,
      new Date(2019, 8, 14)
    );

    expect(alloc1.amount).toBe(100);
    expect(alloc2.amount).toBe(250);
  });

  it('should set multiple categories in the same month', async () => {
    const category2 = await controller.createCategory('Category 2', group.id);

    await controller.setAllocation(category.id, new Date(2019, 3, 1), 100);
    await controller.setAllocation(category2.id, new Date(2019, 3, 1), 500);

    const alloc1 = await controller.getAllocation(
      category.id,
      new Date(2019, 3, 1)
    );
    const alloc2 = await controller.getAllocation(
      category2.id,
      new Date(2019, 3, 1)
    );

    expect(alloc1.amount).toBe(100);
    expect(alloc2.amount).toBe(500);
  });
});

describe('Budget controller > transactions', () => {
  let budget: Budget;
  let controller: BudgetController;
  let group: CategoryGroup;
  let category: TransactionCategory;
  let account: Account;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
    [group, account] = await Promise.all([
      controller.createCategoryGroup('My Group'),
      controller.createAccount('Account', AccountType.checking)
    ]);
    category = await controller.createCategory('My Category', group.id);
  });

  afterEach(async () => {
    await getManager().remove(budget);
  });

  it('should create a new transaction', async () => {
    const transaction = await controller.createTransaction(
      account.id,
      100,
      category.id,
      new Date(2020, 5, 2),
      'Groceries'
    );

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.id).toBeDefined();
  });

  it('should get transactions in current month', async () => {
    await Promise.all(
      new Array(5)
        .fill(null)
        .map(async () =>
          controller.createTransaction(
            account.id,
            10,
            category.id,
            new Date(),
            'Something today'
          )
        )
    );

    await Promise.all(
      new Array(2)
        .fill(null)
        .map(async () =>
          controller.createTransaction(
            account.id,
            10,
            category.id,
            new Date(2019, 1, 1),
            'Something in the past'
          )
        )
    );

    const transactions = await controller.getTransactions();

    expect(transactions).toBeInstanceOf(Array);
    expect(transactions.length).toBe(5);
    expect(transactions[0]).toBeInstanceOf(Transaction);
  });

  it('should get transactions within the date filter', async () => {
    await Promise.all(
      new Array(12)
        .fill(null)
        .map(async (_, i) =>
          controller.createTransaction(
            account.id,
            10,
            category.id,
            new Date(2019, i, 1),
            'January'
          )
        )
    );

    const transactions = await controller.getTransactions({
      from: new Date(2019, 4, 1),
      to: new Date(2019, 8, 1)
    });
    expect(transactions.length).toBe(5);
  });

  it('should return transactions within a category', async () => {
    const wrongCategory = await controller.createCategory(
      'Wrong category',
      group.id
    );
    await Promise.all(
      new Array(4)
        .fill(null)
        .map(() =>
          controller.createTransaction(
            account.id,
            100,
            category.id,
            new Date(),
            'Foo'
          )
        )
    );
    await Promise.all(
      new Array(3)
        .fill(null)
        .map(() =>
          controller.createTransaction(
            account.id,
            100,
            wrongCategory.id,
            new Date(),
            'Foo'
          )
        )
    );
    const transactions = await controller.getTransactions({
      categoryId: category.id
    });

    expect(transactions.length).toBe(4);
  });

  it('should return transactions within an account', async () => {
    const wrongAccount = await controller.createAccount(
      'Wrong account',
      AccountType.checking
    );

    await Promise.all(
      new Array(7)
        .fill(null)
        .map(() =>
          controller.createTransaction(
            account.id,
            100,
            category.id,
            new Date(),
            'Foo'
          )
        )
    );
    await Promise.all(
      new Array(4)
        .fill(null)
        .map(() =>
          controller.createTransaction(
            wrongAccount.id,
            100,
            category.id,
            new Date(),
            'Foo'
          )
        )
    );
    const transactions = await controller.getTransactions({
      accountId: account.id
    });

    expect(transactions.length).toBe(7);
  });

  it('should return transactions within a certain account, category, and date range', async () => {
    const wrongAccount = await controller.createAccount(
      'Wrong account',
      AccountType.checking
    );
    const wrongCategory = await controller.createCategory(
      'Wrong category',
      group.id
    );

    await Promise.all([
      controller.createTransaction(
        account.id,
        100,
        category.id,
        new Date(2020, 1, 4),
        'The right transaction'
      ),
      controller.createTransaction(
        wrongAccount.id,
        100,
        category.id,
        new Date(2020, 1, 4),
        'The wrong account'
      ),
      controller.createTransaction(
        account.id,
        100,
        wrongCategory.id,
        new Date(2020, 1, 4),
        'The wrong category'
      ),
      controller.createTransaction(
        account.id,
        100,
        category.id,
        new Date(2020, 2, 4),
        'Future date'
      ),
      controller.createTransaction(
        account.id,
        100,
        category.id,
        new Date(2020, 0, 4),
        'Past date'
      )
    ]);

    const transactions = await controller.getTransactions({
      categoryId: category.id,
      accountId: account.id,
      from: new Date(2020, 1, 1),
      to: new Date(2020, 2, 0)
    });

    expect(transactions.length).toBe(1);
  });

  it('should not allow the "from date" to be after the "to date"', async () => {
    try {
      await controller.getTransactions({
        from: new Date(2020, 2, 1),
        to: new Date(2020, 1, 1)
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('"From date" cannot be after "to date"');
    }
  });

  it('should not allow the "from" and "to" date to exceed 366 days', async () => {
    expect(
      controller.getTransactions({
        from: new Date(2017, 0, 1),
        to: new Date(2018, 0, 2)
      })
    ).resolves.not.toThrow();
    expect(
      controller.getTransactions({
        from: new Date(2020, 0, 1),
        to: new Date(2021, 0, 1)
      })
    ).resolves.not.toThrow();

    try {
      await controller.getTransactions({
        from: new Date(2017, 0, 1),
        to: new Date(2018, 0, 3)
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe(
        'Difference between the "from date" and "to date" cannot be greater than 366 days'
      );
    }

    try {
      await controller.getTransactions({
        from: new Date(2020, 0, 1),
        to: new Date(2021, 0, 2)
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe(
        'Difference between the "from date" and "to date" cannot be greater than 366 days'
      );
    }
  });
});

describe('Budget controller > income sources', () => {
  let budget: Budget;
  let controller: BudgetController;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
  });

  it('should create an hourly income source', async () => {
    const source = await controller.createIncomeSource(
      'My Income Source',
      14,
      PayScale.hourly,
      40
    );

    expect(source).toBeInstanceOf(IncomeSource);
    expect(source.id).toBeDefined();

    const income = await controller.getIncomeSource(source.id);

    expect(income.name).toBe('My Income Source');
    expect(income.rate).toBe(14);
    expect(income.hours).toBe(40);
    expect(income.scale).toBe(PayScale.hourly);
  });

  it('should create a weekly income source', async () => {
    const source = await controller.createIncomeSource(
      'My Weekly Income',
      140,
      PayScale.weekly
    );

    expect(source).toBeInstanceOf(IncomeSource);
    expect(source.id).toBeDefined();

    const income = await controller.getIncomeSource(source.id);

    expect(income.name).toBe('My Weekly Income');
    expect(income.rate).toBe(140);
    expect(income.hours).toBeNull();
    expect(income.scale).toBe(PayScale.weekly);
  });

  it('should create a monthly income source', async () => {
    const source = await controller.createIncomeSource(
      'My Monthly Income',
      500,
      PayScale.monthly
    );

    expect(source).toBeInstanceOf(IncomeSource);
    expect(source.id).toBeDefined();

    const income = await controller.getIncomeSource(source.id);

    expect(income.name).toBe('My Monthly Income');
    expect(income.rate).toBe(500);
    expect(income.hours).toBeNull();
    expect(income.scale).toBe(PayScale.monthly);
  });

  it('should create a yearly income source', async () => {
    const source = await controller.createIncomeSource(
      'My Annual Income',
      40000,
      PayScale.yearly
    );

    expect(source).toBeInstanceOf(IncomeSource);
    expect(source.id).toBeDefined();

    const income = await controller.getIncomeSource(source.id);

    expect(income.name).toBe('My Annual Income');
    expect(income.rate).toBe(40000);
    expect(income.hours).toBeNull();
    expect(income.scale).toBe(PayScale.yearly);
  });

  it('should delete an income source', async () => {
    const source = await controller.createIncomeSource(
      'My Annual Income',
      40000,
      PayScale.yearly
    );

    expect(controller.getIncomeSource(source.id)).resolves.toBeInstanceOf(
      IncomeSource
    );

    await controller.deleteIncomeSource(source.id);

    expect(controller.getIncomeSource(source.id)).rejects.toThrow(
      HttpException
    );
  });

  it('should return all income sources', async () => {
    await Promise.all(
      new Array(7)
        .fill(null)
        .map(() =>
          controller.createIncomeSource('Source', 14, PayScale.monthly)
        )
    );

    const sources = await controller.getIncomeSource();

    expect(sources).toBeInstanceOf(Array);
    expect(sources[0]).toBeInstanceOf(IncomeSource);
    expect(sources.length).toBe(7);
  });

  it('should return a specific income source', async () => {
    await controller.createIncomeSource('Source', 14, PayScale.monthly);
    const source = await controller.createIncomeSource(
      'My Source',
      22,
      PayScale.yearly
    );
    await controller.createIncomeSource('Source', 14, PayScale.monthly);

    const foundSource = await controller.getIncomeSource(source.id);
    expect(foundSource).toBeInstanceOf(IncomeSource);
    expect(foundSource.id).toBe(source.id);
  });

  it('should calculate the income for an hourly source', async () => {
    const source = await controller.createIncomeSource(
      'Source',
      12,
      PayScale.hourly,
      20
    );

    expect(controller.calculateIncome(source.id)).resolves.toBe(12 * 20 * 52);
  });

  it('should calculate the income for a monthly source', async () => {
    const source = await controller.createIncomeSource(
      'Source',
      2000,
      PayScale.monthly
    );

    expect(controller.calculateIncome(source.id)).resolves.toBe(2000 * 12);
  });

  it('should calculate the income for a weekly source', async () => {
    const source = await controller.createIncomeSource(
      'Source',
      500,
      PayScale.weekly
    );

    expect(controller.calculateIncome(source.id)).resolves.toBe(500 * 52);
  });

  it('should calculate the income for an yearly source', async () => {
    const source = await controller.createIncomeSource(
      'Source',
      45000,
      PayScale.yearly
    );

    expect(controller.calculateIncome(source.id)).resolves.toBe(45000);
  });

  it('should calculate the income for all income sources', async () => {
    await controller.createIncomeSource('Source', 45000, PayScale.yearly);
    await controller.createIncomeSource('Source', 2000, PayScale.monthly);
    await controller.createIncomeSource('Source', 500, PayScale.weekly);
    await controller.createIncomeSource('Source', 15, PayScale.hourly, 25);
    await controller.createIncomeSource('Source', 15, PayScale.hourly, 0);

    expect(controller.calculateIncome()).resolves.toBe(
      45000 + 2000 * 12 + 500 * 52 + 15 * 25 * 52
    );
  });

  it('should calculate an income of 0 if no hours are defined', async () => {
    const source = await controller.createIncomeSource(
      'My Job',
      14,
      PayScale.hourly,
      0
    );

    expect(controller.calculateIncome(source.id)).resolves.toBe(0);
  });
});

describe('Budget controller > tax', () => {
  let budget: Budget;
  let controller: BudgetController;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
  });

  it('should set a tax setting', async () => {
    const tax = await await controller.setTax({
      state: State.Florida,
      status: FilingStatus.married
    });

    expect(tax).toBeInstanceOf(Tax);
    expect(tax.id).toBeDefined();
    expect(tax.state).toBe(State.Florida);
    expect(tax.status).toBe(FilingStatus.married);
  });

  it('should return the set tax setting', async () => {
    await await controller.setTax({
      state: State.Massachusetts,
      status: FilingStatus.single
    });

    const tax = await controller.getTax();

    expect(tax).toBeInstanceOf(Tax);
    expect(tax.state).toBe(State.Massachusetts);
    expect(tax.status).toBe(FilingStatus.single);
  });

  it('should set and return a default tax setting if not set', async () => {
    const tax = await controller.getTax();

    expect(tax).toBeInstanceOf(Tax);
    expect(tax.state).toBe(State.Alabama);
    expect(tax.status).toBe(FilingStatus.single);
  });

  it('should change the state setting', async () => {
    await controller.setTax({
      state: State.Colorado,
      status: FilingStatus.separate
    });

    let tax = await controller.getTax();
    expect(tax.state).toBe(State.Colorado);
    expect(tax.status).toBe(FilingStatus.separate);

    await controller.setTax({ state: State.Utah });
    tax = await controller.getTax();
    expect(tax.state).toBe(State.Utah);
    expect(tax.status).toBe(FilingStatus.separate);
  });

  it('should change the status setting', async () => {
    await controller.setTax({
      state: State.Nevada,
      status: FilingStatus.head
    });

    let tax = await controller.getTax();
    expect(tax.state).toBe(State.Nevada);
    expect(tax.status).toBe(FilingStatus.head);

    await controller.setTax({ status: FilingStatus.single });
    tax = await controller.getTax();
    // expect(tax.state).toBe(State.Nevada);
    expect(tax.status).toBe(FilingStatus.single);
  });

  it('should not change any setting if an empty object is passed', async () => {
    await controller.setTax({
      state: State.New_York,
      status: FilingStatus.single
    });

    let tax = await controller.getTax();
    expect(tax.state).toBe(State.New_York);
    expect(tax.status).toBe(FilingStatus.single);

    await controller.setTax({});
    tax = await controller.getTax();
    expect(tax.state).toBe(State.New_York);
    expect(tax.status).toBe(FilingStatus.single);
  });
});

describe('Budget controller > users', () => {
  let budget: Budget;
  let controller: BudgetController;

  beforeEach(async () => {
    budget = await BudgetController.createBudget('My Budget', user);
    controller = new BudgetController(budget);
  });

  it('should return the user attached to the budget', async () => {
    const foundUser = await controller.getUser();

    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser.id).toBe(user.id);
  });

  it('should error if there is no user on the budget', async () => {
    const fakeBudget = new Budget();
    const fakeController = new BudgetController(fakeBudget);

    try {
      await fakeController.getUser();
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('User not found');
    }
  });
});
