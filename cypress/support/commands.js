import '@4tw/cypress-drag-drop';
const addCypressCommand = Cypress.Commands.add;

addCypressCommand('getCy', (selector) => cy.get(`[data-cy="${selector}"]`));
