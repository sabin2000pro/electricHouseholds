/// <reference types = "cypress" />

describe('Homepage Tests', () => {

     it('Visit Homepage', () => {
         cy.visit('http://localhost:3000/electricHouseholds');
     });

     it('Scans Main Paragraph - Homepage', () => { // Test 1
        cy.visit('http://localhost:3000/electricHouseholds');
        cy.contains('Reducing your peak');
     });

     it('Homepage - Contains Image', () => {
         cy.get('div[class="home-img-box"]').find('img').should('be.visible');
     });

     it('Homepage - Contains Card Text', () => {
         cy.get('div[class="container grid grid--2-cols"]').find('p').contains('Problem Description');
     })

     
})