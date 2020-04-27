import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';
import Budget from '../entities/Budget';
import User from '../entities/User';
import faker from 'faker';
import generateGQL from '.';
import { gql } from 'apollo-server-core';
import validator from 'validator';

const CREATE_BUDGET = gql`
  mutation CreateBudget($name: String!) {
    createBudget(name: $name) {
      id
      name
    }
  }
`;

const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(id: $id)
  }
`;

const GET_BUDGET = gql`
  query GetBudget($id: ID!) {
    budget(id: $id) {
      id
      name
    }
  }
`;

const GET_BUDGETS = gql`
  query GetBudgets {
    budgets {
      name
    }
  }
`;

const RENAME_BUDGET = gql`
  mutation RenameBudget($id: ID!, $name: String!) {
    renameBudget(id: $id, name: $name) {
      name
    }
  }
`;

let client: ApolloServerTestClient;
let user: User;
beforeEach(async () => {
  user = await User.create({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  });

  const server = await generateGQL({ user });
  client = createTestClient(server);
});

describe('budget query', () => {
  it('should return all budgets for the user', async () => {
    await Promise.all([1, 2, 3].map(i => Budget.create(`Budget ${i}`, user)));

    const response = await client.query({
      query: GET_BUDGETS,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.budgets).toHaveLength(3);
    expect(response.data?.budgets).toEqual(
      expect.arrayContaining([
        { name: 'Budget 1' },
        { name: 'Budget 2' },
        { name: 'Budget 3' },
      ])
    );
  });

  it('should return a specific budget', async () => {
    const names = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];
    const [budget] = await Promise.all(names.map(i => Budget.create(i, user)));

    const response = await client.query({
      query: GET_BUDGET,
      variables: { id: budget.id },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.budget.id).toBe(budget.id);
    expect(response.data?.budget.name).toBe(names[0]);
  });

  it('should not return budgets for another user', async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });

    await Promise.all([
      Budget.create(faker.random.word(), wrongUser),
      Budget.create(faker.random.word(), user),
    ]);

    const response = await client.query({
      query: GET_BUDGETS,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.budgets).toHaveLength(1);
  });

  it('should not return a specific budget from another user', async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });
    const budget = await Budget.create(faker.random.word(), wrongUser);

    const response = await client.query({
      query: GET_BUDGET,
      variables: { id: budget.id },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });
});

describe('budget creation', () => {
  it('should create a budget', async () => {
    const name = faker.lorem.word();
    const response = await client.mutate({
      mutation: CREATE_BUDGET,
      variables: { name },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createBudget.id).toBeDefined();
    expect(validator.isUUID(response.data?.createBudget.id)).toBeTruthy();
    expect(response.data?.createBudget.name).toBe(name);
  });

  it('should not create a budget with a long name', async () => {
    const response = await client.mutate({
      mutation: CREATE_BUDGET,
      variables: {
        name: faker.random.alphaNumeric(70),
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });
});

describe('budget rename', () => {
  it('should rename the budget', async () => {
    const budget = await Budget.create(faker.random.word(), user);
    const newName = faker.random.word();

    const response = await client.mutate({
      mutation: RENAME_BUDGET,
      variables: {
        id: budget.id,
        name: newName,
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.renameBudget.name).toBe(newName);

    const dbBudget = await Budget.find(budget.id, user);
    expect(dbBudget.name).toBe(newName);
  });

  it('should not rename a long name', async () => {
    const budget = await Budget.create(faker.random.word(), user);
    const newName = faker.random.alphaNumeric(70);

    const response = await client.mutate({
      mutation: RENAME_BUDGET,
      variables: {
        id: budget.id,
        name: newName,
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });

  it(`should not rename a budget we don't have permission for`, async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });
    const budget = await Budget.create(faker.random.word(), wrongUser);

    const response = await client.mutate({
      mutation: RENAME_BUDGET,
      variables: {
        id: budget.id,
        name: faker.random.word(),
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });
});

describe('budget deletion', () => {
  it('should delete a budget', async () => {
    const budgets = await Promise.all(
      [
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
      ].map(name => Budget.create(name, user))
    );

    const response = await client.mutate({
      mutation: DELETE_BUDGET,
      variables: { id: budgets[0].id },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.deleteBudget).toBe(true);

    const remainingBudgets = await client.query({
      query: GET_BUDGETS,
    });

    expect(remainingBudgets.data?.budgets).toHaveLength(2);
  });

  it('should not delete a budget for another user', async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });
    const budget = await Budget.create(faker.random.word(), wrongUser);

    const response = await client.mutate({
      mutation: DELETE_BUDGET,
      variables: {
        id: budget.id,
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });
});
