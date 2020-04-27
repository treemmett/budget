import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';
import CreateUserInput from '../inputs/CreateUserInput';
import { IsJWT } from 'class-validator';
import faker from 'faker';
import generateServer from '.';
import { gql } from 'apollo-server-express';

let client: ApolloServerTestClient;

const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      email
      firstName
      lastName
    }
  }
`;

const LOGIN = gql`
  mutation Login($credentials: LoginInput!) {
    login(credentials: $credentials)
  }
`;

beforeAll(async () => {
  const server = await generateServer();
  client = createTestClient(server);
});

it('should register a new user', async () => {
  const data = new CreateUserInput({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  });

  const results = await client.mutate({
    mutation: CREATE_USER,
    variables: { data },
  });

  expect(results.errors).toBeUndefined();

  expect(results.data?.createUser.email).toBe(data.email);
  expect(results.data?.createUser.firstName).toBe(data.firstName);
  expect(results.data?.createUser.lastName).toBe(data.lastName);
});

it('should login', async () => {
  const data = new CreateUserInput({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  });

  await client.mutate({
    mutation: CREATE_USER,
    variables: { data },
  });

  const results = await client.mutate({
    mutation: LOGIN,
    variables: {
      credentials: {
        email: data.email,
        password: data.password,
      },
    },
  });

  expect(results.errors).toBeUndefined();
  expect(typeof results.data?.login).toBe('string');
  expect(IsJWT(results.data?.login)).toBeTruthy();
});
