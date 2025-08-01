import '@4tw/cypress-drag-drop';
/* global context beforeEach it cy */
context('Drag and Drop Functionality', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('DND test', () => {
		cy.get('[data-testid="ingredientBun"]').first().as('topBunIngredient');
		cy.get('[data-testid="dndBunTop"]').as('topBunArea');
		cy.get('@topBunIngredient').drag('@topBunArea');

		cy.get('[data-testid="dndBunBottom"]').as('bottomBunArea');
		cy.get('@bottomBunArea').find('.constructor-element').should('exist');

		cy.contains('Начинки').click();

		cy.get('[data-testid="dndBunMiddle"]').as('middleArea');

		cy.get('[data-testid="ingredientMain"]').eq(0).as('firstMainIngredient');
		cy.get('@firstMainIngredient').drag('@middleArea');
		cy.wait(1000);

		cy.contains('Соусы').click();

		cy.get('[data-testid="ingredientSauce"]').first().as('sauceIngredient');
		cy.get('@sauceIngredient').drag('@middleArea');
		cy.wait(1000);

		cy.contains('Начинки').click();

		cy.get('@firstMainIngredient').drag('@middleArea');
		cy.wait(1000);

		cy.get('@middleArea').find('.constructor-element').should('have.length', 3);
	});
});
