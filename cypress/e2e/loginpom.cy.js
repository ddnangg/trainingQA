import loginPage from '../support/pages/loginPage';

describe('Login Feature - OrangeHRM with POM', () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it('TC01 - Login with valid credentials', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('loginRequest');
        loginPage.enterUsername('Admin');
        loginPage.enterPassword('admin123');
        loginPage.clickLogin();
        loginPage.assertSuccessfulLogin();
        cy.url().should('include', '/dashboard')
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    });

    it('TC02 - Login with invalid password', () => {
        loginPage.enterUsername('Admin');
        loginPage.enterPassword('qwerty123');
        loginPage.clickLogin();
        loginPage.assertInvalidLogin();
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })
});