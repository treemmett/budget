import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';
import Budget from '../entities/Budget';
import CategoryGroup from '../entities/CategoryGroup';
import User from '../entities/User';
import faker from 'faker';
import generateGQL from '.';
import { gql } from 'apollo-server-core';
import validator from 'validator';

const CREATE_CATEGORY_GROUP = gql`
  mutation CreateCategoryGroup($name: String!, $budgetId: ID!) {
    createCategoryGroup(name: $name, budgetId: $budgetId) {
      id
      name
    }
  }
`;

const DELETE_CATEGORY_GROUP = gql`
  mutation DeleteCategoryGroup($budgetId: ID!, $id: ID!) {
    deleteCategoryGroup(budgetId: $budgetId, id: $id)
  }
`;

const GET_CATEGORY_GROUPS = gql`
  query GetCategoryGroups($budgetId: ID!) {
    budget(id: $budgetId) {
      categoryGroups {
        id
        name
      }
    }
  }
`;

let client: ApolloServerTestClient;
let user: User;
let budget: Budget;
beforeEach(async () => {
  user = await User.create({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  });

  budget = await Budget.create(faker.random.word(), user);

  const server = await generateGQL({ user });
  client = createTestClient(server);
});

describe('group query', () => {
  it('should return all groups to a budget', async () => {
    const groups = await Promise.all(
      [1, 2, 3, 4].map(i =>
        CategoryGroup.create(faker.random.word(), budget, i)
      )
    );

    const response = await client.query({
      query: GET_CATEGORY_GROUPS,
      variables: {
        budgetId: budget.id,
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.budget.categoryGroups).toHaveLength(4);
    expect(response.data?.budget.categoryGroups).toEqual(
      expect.arrayContaining(groups.map(g => ({ id: g.id, name: g.name })))
    );
  });

  it('should not return groups in another budget', async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });
    const wrongBudget = await Budget.create(faker.random.word(), wrongUser);

    await Promise.all(
      [1, 2, 3].map(i => CategoryGroup.create(`Group ${i}`, budget, i))
    );
    await Promise.all(
      [1, 2, 3, 4].map(i => CategoryGroup.create(`Group ${i}`, wrongBudget, i))
    );

    const response = await client.query({
      query: GET_CATEGORY_GROUPS,
      variables: {
        budgetId: budget.id,
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.budget.categoryGroups).toHaveLength(3);
  });

  it('should associate the group with the correct budget', async () => {
    await CategoryGroup.create(faker.random.word(), budget);

    const response = await client.query({
      query: gql`
        query GetCategoryGroups($budgetId: ID!) {
          budget(id: $budgetId) {
            categoryGroups {
              budget {
                id
              }
            }
          }
        }
      `,
      variables: {
        budgetId: budget.id,
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.budget.categoryGroups[0].budget.id).toBe(budget.id);
  });
});

describe('group creation', () => {
  it('should create a group', async () => {
    const name = faker.random.word();

    const response = await client.mutate({
      mutation: CREATE_CATEGORY_GROUP,
      variables: {
        budgetId: budget.id,
        name,
      },
    });

    expect(response.errors).toBeUndefined();

    expect(response.data?.createCategoryGroup.id).toBeDefined();
    expect(validator.isUUID(response.data?.createCategoryGroup.id)).toBe(true);
    expect(response.data?.createCategoryGroup.name).toBe(name);
  });

  it('should not allow a long group name', async () => {
    const response = await client.mutate({
      mutation: CREATE_CATEGORY_GROUP,
      variables: {
        budgetId: budget.id,
        name: faker.random.alphaNumeric(65),
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });

  it('should not create a group without a valid budget', async () => {
    const response = await client.mutate({
      mutation: CREATE_CATEGORY_GROUP,
      variables: {
        budgetId: faker.random.uuid(),
        name: faker.random.word(),
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });

  it('should not create group in a budget without permission', async () => {
    const wrongUser = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    });
    const wrongBudget = await Budget.create(faker.random.word(), wrongUser);

    const response = await client.mutate({
      mutation: CREATE_CATEGORY_GROUP,
      variables: {
        budgetId: wrongBudget.id,
        name: faker.random.word(),
      },
    });

    expect(response.errors).toHaveLength(1);
    expect(response.data).toBeNull();
  });
});

describe('group deletion', () => {
  it('should delete a group', async () => {
    const groups = await Promise.all(
      [1, 2, 3].map(i => CategoryGroup.create(`Group ${i}`, budget, i))
    );

    expect(groups).toHaveLength(3);

    const response = await client.mutate({
      mutation: DELETE_CATEGORY_GROUP,
      variables: { budgetId: budget.id, id: groups[0].id },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.deleteCategoryGroup).toBe(true);
  });
});
