describe('OrangeHRM Login with Intercept', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
    it('TC01 - Login with valid credentials', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('loginRequest');
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    });

    it('TC02 - Login with invalid password', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('qwerty123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    })
});