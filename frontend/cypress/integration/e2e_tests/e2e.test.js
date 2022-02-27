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
        cy.get('div[class="day--box"]').find('select').contains('Tuesday');
    });

    it('Your Preferences - Form Submit', () => {

    })
});

describe('Admin Login Tests', () => {

    it('Admin Login Visit', () => {
        cy.visit('http://localhost:3000/electricHouseholds/api/v1/auth/client/admin-login');
    });

    it('Admin Login - Form Displayed', () => { // Pass
        cy.get('#login--formadmin').should('be.visible');
    });

    it('Admin Login - Image Displayed', () => {
        cy.get('div[class="home-img-box"]').find('img').should('be.visible');
    }); 

    it('Admin Login - Paragraph Text Displayed', () => {
        cy.contains('Login');
    });

    it('Admin Login - Footer Displayed', () => {
        cy.get('footer[class="footer"]').should('be.visible');
    })
})

describe('Admin Dashboard Register Tests', () => {

    it('First Admin Dashboard Test', () => {
        cy.visit('http://localhost:3000/electricHouseholds/api/v1/auth/client/admin-register');
    });

    it('Admin Register - Slogan Displayed', () => {
        cy.contains('Register');
    });

    it('Admin Register - Image Displayed', () => {
        cy.get('div[class="home-img-box"]').find('img').should('be.visible');
    })

    it('Admin Dashboard - Register Form Displayed', () => {
        cy.get('#admin--register-form').should('be.visible');
    })
});

describe('Admin Dashboard - Forgot Password Tests', () => {

    it('Forgot Password Visit', () => {
        cy.visit('http://localhost:3000/electricHouseholds/api/v1/auth/client/admin-forgotpassword');
    })

    it('Forgot Password - Form Displayed', () => {
        cy.get('#forgot--pw').should('be.visible');
    });

    it('Forgot Password - E-mail Input Present', () => {
        cy.get('div[class="email--box"]').find('input').should('be.visible');
    });

    it('Forgot Password - Submit Button Present', () => {
        cy.get('div[class="submit--container"]').find('button').should('be.visible').should('have.text', 'Submit');
    });

    it('Forgot Password - Footer Present', () => {
        cy.get('footer[class="footer"]').should('be.visible');
    })
})

describe('Contact Us Tests', () => {

    it('Visit Contact Us Page', () => {
        cy.visit('http://localhost:3000/electricHouseholds/contact-us');
    });

    it('Contact Us - Slogan Displayed', () => {
        cy.contains('Contact Us');
    })
})