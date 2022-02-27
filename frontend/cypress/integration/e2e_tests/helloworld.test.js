/// <reference types = "cypress" />

describe('First test', () => {

     it('Visit Homepage', () => {
         cy.visit('http://localhost:3000/electricHouseholds');
     });

     
})