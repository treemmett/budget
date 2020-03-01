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
