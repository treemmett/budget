import { AuthenticationError } from 'apollo-server-express';
import Config from '../utils/config';
import User from './User';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import validator from 'validator';

describe('registration', () => {
  it('should create a new user', async () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };

    const user = await User.create(data);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.email).toBe(data.email);
    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.hash).toBeInstanceOf(Buffer);
  });

  it('should not create two users with the same email', async () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };

    await expect(User.create(data)).resolves.toBeDefined();
    await expect(User.create(data)).rejects.toBeDefined();
  });

  it('should not allow invalid emails', async () => {
    const data = {
      email: faker.name.firstName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };

    await expect(User.create(data)).rejects.toBeDefined();
  });

  it('should not allow long emails', async () => {
    const data = {
      email: `${faker.random.alphaNumeric(70)}@email.com`,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };

    await expect(User.create(data)).rejects.toBeDefined();
  });

  it('should not allow long first names', async () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.random.alphaNumeric(52),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };

    await expect(User.create(data)).rejects.toBeDefined();
  });

  it('should not allow long last names', async () => {
    const data = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.random.alphaNumeric(52),
      password: faker.internet.password(),
    };

    await expect(User.create(data)).rejects.toBeDefined();
  });
});

describe('login', () => {
  it('should login and return a token', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await User.create({
      email,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password,
    });

    const token = await User.login({ email, password });

    expect(typeof token).toBe('string');
    expect(validator.isJWT(token)).toBe(true);
  });

  it('should not allow an unregistered email', async () => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.login(data)).rejects.toBeDefined();
  });

  it('should not allow an incorrect password', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await User.create({
      email,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password,
    });

    await expect(
      User.login({ email, password: faker.internet.password() })
    ).rejects.toBeDefined();
  });
});

describe('token validation', () => {
  it('should validate a token and return the associated user', async () => {
    const password = faker.internet.password();

    const user = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password,
    });

    const token = await User.login({ email: user.email, password });

    const returnedUser = await User.validateToken(token);

    expect(returnedUser).toBeInstanceOf(User);
    expect(returnedUser.id).toBe(user.id);
  });

  it('should not validate a false token', async () => {
    await expect(User.validateToken('foo')).rejects.toThrow(
      AuthenticationError
    );
  });

  it('should not validate a forged token', async () => {
    const password = faker.internet.password();

    const user = await User.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password,
    });

    const token = await User.login({ email: user.email, password });

    const tokenParts = token.split('.');

    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
    payload.admin = true;

    const payloadJson = JSON.stringify(payload);

    const forgedToken = [
      tokenParts[0],
      Buffer.from(payloadJson).toString('base64'),
      tokenParts[2],
    ].join('.');

    await expect(User.validateToken(forgedToken)).rejects.toThrow(
      AuthenticationError
    );
  });

  it('should not allow a valid token with no user', async () => {
    const token = jwt.sign({}, Config.JWT_SECRET, {
      subject: faker.random.uuid(),
    });

    await expect(User.validateToken(token)).rejects.toThrow(
      AuthenticationError
    );
  });
});
