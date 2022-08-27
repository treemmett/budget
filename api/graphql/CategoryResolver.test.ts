import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';
import Budget from '../entities/Budget';
import Category from '../entities/Category';
import CategoryGroup from '../entities/CategoryGroup';
import User from '../entities/User';
import faker from 'faker';
import generateGQL from '.';
import { gql } from 'apollo-server-core';

let client: ApolloServerTestClient;
let user: User;
let budget: Budget;
let group: CategoryGroup;
let category: Category;
beforeEach(async () => {
  user = await User.create({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  });
  budget = await Budget.create(faker.random.word(), user);
  group = await CategoryGroup.create(faker.random.word(), budget);
  category = await Category.create(faker.random.word(), group);

  const server = await generateGQL({ user });
  client = createTestClient(server);
});

const GET_ALLOCATION = gql`
  query GetAllocation(
    $budgetId: ID!
    $groupId: ID!
    $categoryId: ID!
    $date: AllocationDateInput!
  ) {
    budget(id: $budgetId) {
      categoryGroup(id: $groupId) {
        category(id: $categoryId) {
          name
          allocation(date: $date)
        }
      }
    }
  }
`;

const SET_ALLOCATION = gql`
  mutation SetAllocation(
    $categoryId: ID!
    $amount: Int!
    $date: AllocationDateInput!
    $budgetId: ID!
  ) {
    allocateCategory(
      id: $categoryId
      amount: $amount
      date: $date
      budgetId: $budgetId
    ) {
      allocation(date: $date)
    }
  }
`;

describe('allocations', () => {
  it('should set an allocation', async () => {
    const amount = faker.random.number();
    const date = new Date();
    const response = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.allocateCategory.allocation).toBe(amount);

    const query = await client.query({
      query: GET_ALLOCATION,
      variables: {
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
        groupId: group.id,
      },
    });

    expect(query.errors).toBeUndefined();
    expect(query.data?.budget.categoryGroup.category.allocation).toBe(amount);
  });

  it('should set multiple allocations for different dates', async () => {
    const amount1 = faker.random.number();
    const mutation1 = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: amount1,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 5,
          year: 2017,
        },
      },
    });
    expect(mutation1.errors).toBeUndefined();

    const amount2 = faker.random.number();
    const mutation2 = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: amount2,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 6,
          year: 2017,
        },
      },
    });
    expect(mutation2.errors).toBeUndefined();

    const query1 = await client.query({
      query: GET_ALLOCATION,
      variables: {
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 5,
          year: 2017,
        },
        groupId: group.id,
      },
    });
    expect(query1.errors).toBeUndefined();
    expect(query1.data?.budget.categoryGroup.category.allocation).toBe(amount1);

    const query2 = await client.query({
      query: GET_ALLOCATION,
      variables: {
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 6,
          year: 2017,
        },
        groupId: group.id,
      },
    });
    expect(query2.errors).toBeUndefined();
    expect(query2.data?.budget.categoryGroup.category.allocation).toBe(amount2);
  });

  it('should override an allocation for the same date', async () => {
    const date = new Date();

    const amount1 = faker.random.number();
    await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: amount1,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      },
    });

    const query1 = await client.query({
      query: GET_ALLOCATION,
      variables: {
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
        groupId: group.id,
      },
    });

    expect(query1.errors).toBeUndefined();
    expect(query1.data?.budget.categoryGroup.category.allocation).toBe(amount1);

    const amount2 = faker.random.number();
    await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: amount2,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      },
    });

    const query2 = await client.query({
      query: GET_ALLOCATION,
      variables: {
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
        groupId: group.id,
      },
    });

    expect(query2.errors).toBeUndefined();
    expect(query2.data?.budget.categoryGroup.category.allocation).toBe(amount2);
  });

  it('should not allocate a category in a budget without permission', async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });
    const wrongBudget = await Budget.create(faker.random.word(), wrongUser);
    const wrongGroup = await CategoryGroup.create(
      faker.random.word(),
      wrongBudget
    );
    const wrongCategory = await Category.create(
      faker.random.word(),
      wrongGroup
    );

    const response = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: 100,
        budgetId: wrongBudget.id,
        categoryId: wrongCategory.id,
        date: {
          month: 1,
          year: 2020,
        },
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });

  it('should not allocate an invalid date', async () => {
    const response1 = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: 100,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: -1,
          year: 2020,
        },
      },
    });

    expect(response1.errors).toHaveLength(1);
    expect(response1.data).toBeNull();

    const response2 = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: 100,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 13,
          year: 2020,
        },
      },
    });

    expect(response2.errors).toHaveLength(1);
    expect(response2.data).toBeNull();

    const response3 = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: 100,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 1,
          year: 2035,
        },
      },
    });

    expect(response3.errors).toHaveLength(1);
    expect(response3.data).toBeNull();

    const response4 = await client.mutate({
      mutation: SET_ALLOCATION,
      variables: {
        amount: 100,
        budgetId: budget.id,
        categoryId: category.id,
        date: {
          month: 1,
          year: 2005,
        },
      },
    });

    expect(response4.errors).toHaveLength(1);
    expect(response4.data).toBeNull();
  });
});
