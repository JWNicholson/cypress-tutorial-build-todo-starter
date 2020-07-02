describe('List-items', () => {
	beforeEach(() => {
		cy.seedAndVisit();
	});

	it('properly displays completed items', () => {
		cy
			.get('.todo-list li')
			.filter('.completed')
			.should('have.length', 1)
			.and('contain', 'Eggs')
			.find('.toggle')
			.should('be.checked');
	});

	it('shows remaining todos in the footer', () => {
		cy.get('.todo-count').should('contain', 3);
	});

	it('Removes a todo', () => {
		//delete the first todos
		cy.route({
			url      : '/api/todos/1',
			method   : 'DELETE',
			status   : 200,
			response : {}
		});

		cy.get('.todo-list li').as('list');

		cy
			.get('@list')
			.first()
			.find('.destroy') //delete button class
			.invoke('show') //show the button
			.click();

		//check to see if firs item was actually deleted in test
		cy.get('@list').should('have.length', 3).and('not.contain', 'Milk');
	});

	it.only('Marks and incomplete item complete', () => {
		cy.fixture('todos').then((todos) => {
			const target = Cypress._.head(todos);
			cy.route('PUT', `api/todos/${target.id}`, Cypress._.merge(target, { isComplete: true }));
		});

		cy.get('.todo-list li').first().as('first-todo');

		cy.get('@first-todo').find('.toggle').click().should('be.checked');

		cy.get('@first-todo').should('have.class', 'completed');

		cy.get('.todo-count').should('contain', 2);
	});
}); //describe
