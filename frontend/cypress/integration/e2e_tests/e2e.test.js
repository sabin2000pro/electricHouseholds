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

describe('Your Preferences Test', () => {

    it('Your Preferences Form Displayed Test', () => {
        cy.visit('http://localhost:3000/electricHouseholds/your-preferences');
        cy.get('#pref--form').submit();
    });

    it('View All Preferences Button', () => {
        cy.get('button[class = "viewpreferences--btn"]').should('be.visible');
    })

    it('Your Preferences - Input Fields Displayed', () => {
        cy.get('div[class="username--box"]').find('input');
    });

    it('Your Preferences - Select First Preferences Dropdown', () => {
        cy.get('label[class = "issue--lbl"]').find('input');
    });

    it('Your Preferences - Second Preference Drop Down', () => {
        cy.get('div[class="morningslot--box"]').find('select').contains('06:00-07:00');
    });

    it('Your Preferences - Third Preference Drop Down', () => {
        cy.get('div[class="latemorning--box"]').find('select').contains('09:00-10:00');
    });

    it('Your Preferences - Day Drop Down Menu', () => {

    });

    it('Your Preferences - Form Submit', () => {

    })
})