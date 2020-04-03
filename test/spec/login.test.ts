import faker from 'faker';
import toastStyles from '../../src/components/Toast/Toast.scss';

describe('User registration', () => {
  it('should create a new user', () => {
    cy.visit('/login');
    cy.location('pathname').should('eq', '/login');

    cy.contains('Register').click();
    cy.location('pathname').should('eq', '/register');

    cy.contains('First Name').siblings('input').type(faker.name.firstName());

    cy.contains('Last Name').siblings('input').type(faker.name.lastName());

    cy.contains('Email').siblings('input').type(faker.internet.email());

    const pw = faker.internet.password();

    cy.contains('Password').siblings('input').type(pw);

    cy.contains('Confirm Password').siblings('input').type(pw);

    cy.contains('Register').click();
    cy.location('pathname').should('eq', '/');

    cy.checkAuth();
  });

  it('should error if a an email is already registered', () => {
    const email = faker.internet.email();
    cy.createUser(email, faker.internet.password());

    cy.visit('/register');
    cy.location('pathname').should('eq', '/register');

    cy.contains('First Name').siblings('input').type(faker.name.firstName());

    cy.contains('Last Name').siblings('input').type(faker.name.lastName());

    cy.contains('Email').siblings('input').type(email);

    const pw = faker.internet.password();

    cy.contains('Password').siblings('input').type(pw);

    cy.contains('Confirm Password').siblings('input').type(pw);

    cy.contains('Register').click();

    cy.get(`.${toastStyles.toast}`).should('have.class', toastStyles.error);
    cy.get(`.${toastStyles.toast} .${toastStyles.title}`).should(
      'have.text',
      'User creation failed'
    );
    cy.get(`.${toastStyles.toast} .${toastStyles.message}`).should(
      'have.text',
      'This email is already registered.'
    );
  });

  it(`should error if the confirmation password doesn't match`, () => {
    cy.visit('/register');

    cy.contains('First Name').siblings('input').type(faker.name.firstName());

    cy.contains('Last Name').siblings('input').type(faker.name.lastName());

    cy.contains('Email').siblings('input').type(faker.internet.email());

    cy.contains('Password').siblings('input').type(faker.internet.password());

    cy.contains('Confirm Password')
      .siblings('input')
      .type(faker.internet.password());

    cy.contains('Register').click();

    cy.get(`.${toastStyles.toast}`).should('have.class', toastStyles.error);
    cy.get(`.${toastStyles.toast} .${toastStyles.title}`).should(
      'have.text',
      'User creation failed'
    );
    cy.get(`.${toastStyles.toast} .${toastStyles.message}`).should(
      'have.text',
      'Passwords do not match.'
    );
  });
});

describe('User login', () => {
  it('should login', () => {
    const email = faker.internet.email();
    const pw = faker.internet.password();
    cy.createUser(email, pw);

    cy.visit('/login');

    cy.focused().type(email);

    cy.contains('Password').siblings('input').type(pw);

    cy.contains('Login').click();

    cy.location('pathname').should('eq', '/');

    cy.checkAuth();
  });

  it('should error if the password is incorrect', () => {
    const email = faker.internet.email();
    const pw = faker.internet.password();
    cy.createUser(email, pw);

    cy.visit('/login');

    cy.focused().type(email);
    cy.contains('Password').siblings('input').type(faker.internet.password());
    cy.contains('Login').click();

    cy.get(`.${toastStyles.toast}`).should('have.class', toastStyles.error);
    cy.get(`.${toastStyles.toast} .${toastStyles.title}`).should(
      'have.text',
      'Login failed'
    );
    cy.get(`.${toastStyles.toast} .${toastStyles.message}`).should(
      'have.text',
      'Incorrect password.'
    );
  });

  it('should error if the email is not registered', () => {
    cy.visit('/login');

    cy.focused().type(faker.internet.email());
    cy.contains('Password').siblings('input').type(faker.internet.password());
    cy.contains('Login').click();

    cy.get(`.${toastStyles.toast}`).should('have.class', toastStyles.error);
    cy.get(`.${toastStyles.toast} .${toastStyles.title}`).should(
      'have.text',
      'Login failed'
    );
    cy.get(`.${toastStyles.toast} .${toastStyles.message}`).should(
      'have.text',
      'Email not registered'
    );
  });
});
