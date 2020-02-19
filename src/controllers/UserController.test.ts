import HttpException from '../utils/HttpException';
import User from '../entities/User';
import UserController from './UserController';
import { getManager } from 'typeorm';

let user: User;
const userEmail = 'test@user.com';

beforeEach(async () => {
  user = await UserController.createUser(
    userEmail,
    'Bobby',
    'Testing',
    'mySecretPassword'
  );
});

afterEach(async () => {
  await getManager().remove(user);
});

describe('User controller > account access', () => {
  it('should create a new user', async () => {
    expect(user.email).toBe(userEmail);
    expect(user.firstName).toBe('Bobby');
    expect(user.lastName).toBe('Testing');
    expect(user.hash).toBeInstanceOf(Buffer);
  });

  it('should create a new user and login', async () => {
    const { jwt } = await UserController.login(userEmail, 'mySecretPassword');

    expect(jwt).toBeTruthy();
  });

  it('should not login if the password is incorrect', async () => {
    try {
      await UserController.login(userEmail, 'myWrongPassword');
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Incorrect password.');
      expect(e.status).toBe(401);
    }
  });

  it("should not login if the email doesn't exist", async () => {
    try {
      await UserController.login('fake@user.com', 'mySecretPass');
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Email not registered');
      expect(e.status).toBe(401);
    }
  });

  it('should login and verify the access token', async () => {
    const { jwt } = await UserController.login(userEmail, 'mySecretPassword');

    const loggedIn = (await UserController.verifyToken(jwt)) as User;

    expect(loggedIn).toBeDefined();
    expect(loggedIn.email).toBe(userEmail);
  });

  it('should deny a forged access token', async () => {
    const { jwt } = await UserController.login(userEmail, 'mySecretPassword');

    const tokenParts = jwt.split('.');
    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
    payload.role = 'admin';
    tokenParts[1] = Buffer.from(JSON.stringify(payload)).toString('base64');
    const forgedToken = tokenParts.join('.');

    const loggedIn = await UserController.verifyToken(forgedToken);
    expect(loggedIn).toBeUndefined();
  });
});
