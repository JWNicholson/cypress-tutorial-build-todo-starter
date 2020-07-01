describe('List-items', () => {
    beforeEach(() =>{
        cy.seedAndVisit()
    })

    it('properly displays completed items', () => {
        cy.get('.todo-list li')
          .filter('.completed')
          .should('have.length', 1)
          .and('contain', 'Eggs')
          .find('.toggle')
          .should('be.checked')
    })

    it('shows remaining todos in the footer', () => {
        cy.get('.todo-count')
        .should('contain', 3)
    })

    it.only('Removes a todo', () => {
          //delete the first todos
        cy.route({
            url: '/api/todos/1',
            method: 'DELETE',
            status: 200,
            response: {}
        })

        cy.get('.todo-list li')
          .as('list')

        cy.get('@list')
          .first()
          .find('.destroy')//delete button class
          .invoke('show')//show the button
          .click()

          //check to see if firs item was actually deleted in test
          cy.get('@list')
            .should('have.length', 3)
            .and('not.contain', 'Milk')

    })

})//describe