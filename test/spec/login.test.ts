import faker from 'faker';

describe('User registration', () => {
  it('should create a new user', () => {
    cy.visit('/login');
    cy.location('pathname').should('eq', '/login');

    cy.contains('Register').click();
    cy.location('pathname').should('eq', '/register');

    cy.contains('First Name')
      .siblings('input')
      .type(faker.name.firstName());

    cy.contains('Last Name')
      .siblings('input')
      .type(faker.name.lastName());

    cy.contains('Email')
      .siblings('input')
      .type(faker.internet.email());

    const pw = faker.internet.password();

    cy.contains('Password')
      .siblings('input')
      .type(pw);

    cy.contains('Confirm Password')
      .siblings('input')
      .type(pw);

    cy.contains('Register').click();
    cy.location('pathname').should('eq', '/');

    cy.checkAuth();
  });
});

describe('User login', () => {
  it('should login', () => {
    const email = faker.internet.email();
    const pw = faker.internet.password();
    cy.createUser(email, pw);

    cy.visit('/login');

    cy.focused().type(email);

    cy.contains('Password')
      .siblings('input')
      .type(pw);

    cy.contains('Login').click();

    cy.location('pathname').should('eq', '/');

    cy.checkAuth();
  });
});
