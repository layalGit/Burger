/* global describe beforeEach it cy */
describe('Тестирование модального окна', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Открытие и закрытие модального окна различными способами', () => {
		cy.contains('Булки').click({ force: true });
		cy.wait(1000);
		cy.get('[data-testid="ingredientBun"]').first().click();
		cy.wait(1000);
		cy.get('[data-testid="modal-content"]').should('be.visible');
		cy.wait(1000);
		cy.get('[data-testid="modal-close-icon"] svg', { timeout: 8000 }).click({
			force: true,
		});
		cy.wait(1000);
		cy.get('[data-testid="modal-content"]').should('not.exist');
		cy.wait(1000);

		cy.contains('Соусы').click();
		cy.wait(1000);
		cy.get('[data-testid="ingredientSauce"]').first().click();
		cy.wait(1000);
		cy.get('[data-testid="modal-content"]').should('be.visible');
		cy.wait(1000);
		cy.get('body').type('{esc}');
		cy.wait(1000);
		cy.get('[data-testid="modal-content"]').should('not.exist');
		cy.wait(1000);

		cy.contains('Начинки').click();
		cy.wait(1000);
		cy.get('[data-testid="ingredientMain"]').first().click();
		cy.wait(1000);
		cy.get('[data-testid="modal-content"]').should('be.visible');
		cy.wait(1000);
		cy.get('[data-testid="modal-overlay"]').click({ force: true });
		cy.wait(1000);
		cy.get('[data-testid="modal-content"]').should('not.exist');
		cy.wait(1000);
	});
});
