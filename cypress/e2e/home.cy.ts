describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.contains('efficiency');
  })

  it('should have a button that changes data', () => {
    cy.contains('a', 'shift').click();
    cy.get('h3').should('contain', 'shift');
  });

  it('should hover a bar and trigger the selected row', () => {
    cy.get('#cell-0-0').should('be.visible').trigger('mouseover', {force: true})
    cy.get('#tr-sl').should('be.visible').should('have.css', 'background-color', 'rgb(240, 240, 240)')
  })

})