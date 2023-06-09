Cypress.config('defaultCommandTimeout', 5000);
describe('template spec', () => {
  it('success', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#birth').type('1989-06-21');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#success').should('contain', 'Votre compte a bien été créé!');
  }),
  it('error-account-already-exist', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#birth').type('1989-06-21');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#serverError').should('contain', 'est déjà associée à un autre compte.');
  }),
  it('error-empty-inputs', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('.principal').click();
    cy.get('#firstNameEmpty').should('contain', 'Veuillez saisir votre prénom');
    cy.get('#lastNameEmpty').should('contain', 'Veuillez saisir votre nom');
    cy.get('#birthdayEmpty').should('contain', 'Veuillez saisir votre date de naissance');
    cy.get('#emailEmpty').should('contain', 'Veuillez saisir votre adresse mail');
    cy.get('#passwordEmpty').should('contain', 'Veuillez saisir un mot de passe');
    cy.get('#rePasswordEmpty').should('contain', 'Veuillez ressaisir votre mot de passe');
  }),
  it('error-empty-first-name', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#last-name').type('Authié');
    cy.get('#birth').type('1989-06-21');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#firstNameEmpty').should('contain', 'Veuillez saisir votre prénom');
  }),
  it('error-empty-last-name', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#birth').type('1989-06-21');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#lastNameEmpty').should('contain', 'Veuillez saisir votre nom');
  }),
  it('error-empty-birthday', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#birthdayEmpty').should('contain', 'Veuillez saisir votre date de naissance');
  }),
  it('error-empty-email', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#emailEmpty').should('contain', 'Veuillez saisir votre adresse mail');
  }),
  it('error-empty-password', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#re-password').type('1234');
    cy.get('.principal').click();
    cy.get('#passwordEmpty').should('contain', 'Veuillez saisir un mot de passe');
    cy.get('#passwordsError').should('contain', 'Les deux mots de passe saisis ne sont pas identiques!');
  }),
  it('error-empty-re-password', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('.principal').click();
    cy.get('#rePasswordEmpty').should('contain', 'Veuillez ressaisir votre mot de passe');
    cy.get('#passwordsError').should('contain', 'Les deux mots de passe saisis ne sont pas identiques!');
  }),
  it('error-different-passwords', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('12345');
    cy.get('.principal').click();
    cy.get('#passwordsError').should('contain', 'Les deux mots de passe saisis ne sont pas identiques!');
  }),
  it('error-email-format-.fr', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#email').type('authie.maxime@orange');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('12345');
    cy.get('.principal').click();
    cy.get('#emailError').should('contain', 'Adresse mail incorrecte');
  }),
  it('error-email-format-@', () => {
    cy.visit('http://localhost:8080/register');
    cy.get('#first-name').type('Maxime');
    cy.get('#last-name').type('Authié');
    cy.get('#email').type('authie.maximeorange.fr');
    cy.get('#password').type('1234');
    cy.get('#re-password').type('12345');
    cy.get('.principal').click();
    cy.get('#emailError').should('contain', 'Adresse mail incorrecte');
  })
})