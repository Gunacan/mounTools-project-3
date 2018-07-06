/// <reference types="Cypress" />

context('App Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('App works', () => {
        cy.get('#scroll-button').click()
        cy.url().should('eq', 'http://localhost:3000/#main')

        cy.get('#card').eq(0).click()

        cy.get('#category').should('have.text', 'Camping')
        cy.get('#tools_bar').find('#list-bar').find('div').should('have.length', 5)
        
        cy.get('div').contains('Add new item').click()
        cy.get('#form-name').type('item')
        cy.get('#form-select').select('Must-have')
        cy.get('button').contains('Add the Item').click()
        cy.get('#success-status').should('have.text', 'Item succesfully added!')
    })
})
