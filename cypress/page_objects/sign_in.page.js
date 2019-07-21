/// <reference types="Cypress" />

export const selectors = {
  signInOptions: '#signin-options',
  signInListGroupItem: '.list-group-item ',
  emailField: '#ap_email',
  passwordField: '#ap_password',
  signInButton: '#signInSubmit',
  inAppUserName: '#nbusername'
}

export const clickSignInWWithIMDbButton = () => {
  cy.get(selectors.signInListGroupItem).contains('Sign in with IMDb').click()
  cy.url().should('contain', 'ap/signin')
}

export const signInUser = (userEmail, password, userName) => {
  cy.get(selectors.emailField).focus().clear().type(userEmail)
  cy.get(selectors.passwordField).focus().clear().type(password)
  cy.get(selectors.signInButton).click()
  cy.url().should('contain', '?ref_=login')
  cy.get(selectors.inAppUserName).should('be.visible').invoke('text').should('equal', userName)
}