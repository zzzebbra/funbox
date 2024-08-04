describe('Maps', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Pin successfully added and deleted', () => {
    cy.getCy('pin-add-input').type('1');
    cy.getCy('pin-add-button').click();
    cy.getCy('pin-item').should('exist');
    cy.getCy('pin-item-delete-button').click();
    cy.getCy('pin-item').should('not.exist');
  });

  it('List of items added', () => {
    // Ждем догрузки карты
    cy.wait(2000);
    const namesList = ['1','2','3','4'];
    namesList.forEach((name) => {
      cy.getCy('pin-add-input').type(name);
      cy.getCy('pin-add-button').click();
    });
    cy.getCy('pin-item').should('have.length', namesList.length);
  });

  it('DnD test sorting', () => {
    const namesList = ['1','2','3','4'];
    namesList.forEach((name) => {
      cy.getCy('pin-add-input').type(name);
      cy.getCy('pin-add-button').click();
    });
    cy.getCy('pin-item-drag-button').first().move({ deltaX: 0, deltaY: 150 });
    cy.getCy('pin-item').last().contains(namesList[0]);
  });

  it('Submit button disabled', () => {
    cy.getCy('pin-add-input').should('be.empty');
    cy.getCy('pin-add-button').should('have.attr', 'disabled');
    cy.getCy('pin-add-button').click({ force: true });
    cy.getCy('pin-item').should('not.exist');
  });

  it('InfoWindows show name of the pin', () => {
    const name = 'Name1'
    cy.getCy('pin-add-input').type(name);
    cy.getCy('pin-add-button').click();
    cy.get('[class$=-marker-view]').click({force: true});
    cy.get('[class$="gm-style-iw-d"]').contains(name);
    cy.get('[title="Close"]').click();
    cy.get('[class$="gm-style-iw-d"]').should('not.exist');
  });
});

