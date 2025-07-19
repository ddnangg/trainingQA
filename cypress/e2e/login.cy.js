describe('OrangeHRM Login Feature', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC01 - Login with valid credentials', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })

  it('TC02 - Login with invalid password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('qwerty123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC03 - Login with invalid username', () => {
    cy.get('input[name="username"]').type('qwerty123')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC04 - Login with empty username', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group .oxd-text')
      .should('contain', 'Required')
  })

  it('TC05 - Login with empty password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group .oxd-text')
      .should('contain', 'Required')
  })
})
