import User from '../entities/User';
import UserController from './UserController';
import faker from 'faker';

let user: User;
let email: string;
let password: string;
let firstName: string;
let lastName: string;

beforeEach(async () => {
  email = faker.internet.email();
  password = faker.internet.password();
  firstName = faker.name.firstName();
  lastName = faker.name.lastName();

  user = await UserController.createUser(email, firstName, lastName, password);
});

describe('User controller > account access', () => {
  it('should create a new user', () => {
    expect(user.id).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.hash).toBeInstanceOf(Buffer);
  });

  it('should not create two users with the same email', async () => {
    await expect(
      UserController.createUser(email, firstName, lastName, password)
    ).rejects.toFail({
      message: 'This email is already registered.',
      status: 409,
    });
  });

  it('should create a new user and login', async () => {
    const { jwt } = await UserController.login(email, password);

    expect(jwt).toBeTruthy();
  });

  it('should not login if the password is incorrect', async () => {
    await expect(
      UserController.login(email, 'myWrongPassword')
    ).rejects.toFail({ message: 'Incorrect password.', status: 401 });
  });

  it("should not login if the email doesn't exist", async () => {
    await expect(
      UserController.login('fake@user.com', password)
    ).rejects.toFail({ message: 'Email not registered', status: 401 });
  });

  it('should login and verify the access token', async () => {
    const { jwt } = await UserController.login(email, password);

    const loggedIn = (await UserController.verifyToken(jwt)) as User;

    expect(loggedIn).toBeDefined();
    expect(loggedIn.email).toBe(email);
  });

  it('should deny a forged access token', async () => {
    const { jwt } = await UserController.login(email, password);

    const tokenParts = jwt.split('.');
    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
    payload.role = 'admin';
    tokenParts[1] = Buffer.from(JSON.stringify(payload)).toString('base64');
    const forgedToken = tokenParts.join('.');

    const loggedIn = await UserController.verifyToken(forgedToken);
    expect(loggedIn).toBeUndefined();
  });

  it('should not verify an empty token', async () => {
    let loggedIn = await UserController.verifyToken();
    expect(loggedIn).toBeUndefined();

    loggedIn = await UserController.verifyToken('');
    expect(loggedIn).toBeUndefined();
  });
});
