/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */
import faker from 'faker';

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      checkAuth: () => void;
      createUser: (
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
      ) => void;
      setupUser: () => void;
    }
  }
}

Cypress.Commands.add(
  'createUser',
  (email: string, password: string, firstName?: string, lastName?: string) => {
    cy.request('POST', '/api/graphql', {
      query: `mutation ($email: String!, $password: String!, $f: String!, $l: String!) {
        createUser(data: { email: $email, password: $password, firstName: $f, lastName: $l}) {
          id
        }
      }`,
      variables: {
        email,
        password,
        f: firstName || faker.name.firstName(),
        l: lastName || faker.name.lastName()
      }
    });
  }
);

Cypress.Commands.add('checkAuth', () => {
  cy.window()
    .its('localStorage')
    .its('token')
    .should('not.be.undefined');

  cy.should(() => {
    expect(localStorage.getItem('token')).match(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });
});

Cypress.Commands.add('setupUser', () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  cy.request('POST', '/api/graphql', {
    query: `mutation ($email: String!, $password: String!, $f: String!, $l: String!) {
      createUser(data: {
        email: $email,
        password: $password,
        firstName: $f,
        lastName: $l
      }) {
        id
      }
    }`,
    variables: {
      email,
      password,
      f: faker.name.firstName(),
      l: faker.name.lastName()
    }
  }).then(() => {
    cy.request('POST', '/api/graphql', {
      query: `mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          jwt
        }
      }`,
      variables: {
        email,
        password
      }
    }).then(resp => {
      localStorage.setItem('token', resp.body.data.login.jwt);
    });
  });
});
