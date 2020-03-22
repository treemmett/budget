import budgetStyles from '../../src/views/Budgets/Budgets.scss';
import fabStyles from '../../src/components/Fab/Fab.scss';

describe('Budgets overview', () => {
  beforeEach(() => {
    cy.setupUser();
  });

  it('should create a new budget', () => {
    cy.visit('/');
    cy.get(`button.${fabStyles.fab}`).click();
    cy.get(`button.${fabStyles.fab}`).should('not.exist');
    cy.focused().type('My new budget{enter}');

    cy.get(`.${budgetStyles.budget} span.${budgetStyles.name}`).should(
      'have.text',
      'My new budget'
    );
  });

  it('should create and display multiple budgets', () => {
    cy.visit('/');
    cy.get(`button.${fabStyles.fab}`).click();
    cy.focused().type('My budget{enter}');

    cy.reload();

    cy.get(`.${budgetStyles.budget} span.${budgetStyles.name}`).should(
      'have.text',
      'My budget'
    );

    cy.get(`button.${fabStyles.fab}`).click();
    cy.focused().type('My shared budget{enter}');

    cy.reload();

    cy.get(`.${budgetStyles.budget} span.${budgetStyles.name}`)
      .eq(0)
      .should('have.text', 'My budget');
    cy.get(`.${budgetStyles.budget} span.${budgetStyles.name}`)
      .eq(1)
      .should('have.text', 'My shared budget');
  });
});
