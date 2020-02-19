import HttpException from '../utils/HttpException';
import User from '../entities/User';
import UserController from './UserController';

describe('User controller > account access', () => {
  let user: User;

  beforeEach(async () => {
    user = await UserController.createUser(
      'test@email.com',
      'Bobby',
      'Testing',
      'mySecretPassword'
    );
  });

  it('should create a new user', async () => {
    expect(user.email).toBe('test@email.com');
    expect(user.firstName).toBe('Bobby');
    expect(user.lastName).toBe('Testing');
    expect(user.hash).toBeInstanceOf(Buffer);
  });

  it('should create a new user and login', async () => {
    const { jwt } = await UserController.login(
      'test@email.com',
      'mySecretPassword'
    );

    expect(jwt).toBeTruthy();
  });

  it('should not login if the password is incorrect', async () => {
    try {
      await UserController.login('test@email.com', 'myWrongPassword');
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Incorrect password.');
      expect(e.status).toBe(401);
    }
  });

  it("should not login if the email doesn't exist", async () => {
    try {
      await UserController.login('fake@email.com', 'mySecretPass');
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Email not registered');
      expect(e.status).toBe(401);
    }
  });

  it('should login and verify the access token', async () => {
    const { jwt } = await UserController.login(
      'test@email.com',
      'mySecretPassword'
    );

    const loggedIn = (await UserController.verifyToken(jwt)) as User;

    expect(loggedIn).toBeDefined();
    expect(loggedIn.email).toBe('test@email.com');
  });

  it('should deny a forged access token', async () => {
    const { jwt } = await UserController.login(
      'test@email.com',
      'mySecretPassword'
    );

    const tokenParts = jwt.split('.');
    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
    payload.role = 'admin';
    tokenParts[1] = Buffer.from(JSON.stringify(payload)).toString('base64');
    const forgedToken = tokenParts.join('.');

    const loggedIn = await UserController.verifyToken(forgedToken);
    expect(loggedIn).toBeUndefined();
  });
});
