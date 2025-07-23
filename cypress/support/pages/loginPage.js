class loginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  assertSuccessfulLogin() {
    cy.url().should('include', '/dashboard');
  }

  assertInvalidLogin() {
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  }
}

export default new loginPage();