context("Research page", () => {
  beforeEach(() => {
    //Standaard gaan we niet navigeren naar de pagina waarop de loading spinner te zien is.
    cy.visit("https://localhost:5001/Research?loading=false");
  });

  it("Check spinner", () => {
    //De pagina met de spinner opvragen
    cy.visit("https://localhost:5001/Research");

    //De spinner valideren aan de hand van een cy.get
    cy.get(".spinner-border");
  });

  it("Check button functionality", () => {
    //Wanneer we op de button klikken verwachten we dat de pagina stop met laden en we de lijst te zien krijgen.

    //We navigeren naar loading page
    cy.visit("https://localhost:5001/Research");

    //We vragen de button op
    cy.get(".btn-danger")
      //We klikken op de button
      .click();

    //We valideren of we een tabel te zien krijgen.
    cy.get("table");
  });

  it("Check number of rows", () => {
    // In het geval dat lijst of tabellen weergeven op de pagina kan het interessant zijn voor een tester om na te gaan of alle items uit de lijst getoond worden.
    // We kunnen dit nageen met behulp van de children command. Deze geeft ons alle child elements terug.

    //We vragen de tabel body op
    cy.get("tbody")
      //We vragen de kinderen op
      .children()
      //We asserten de lengte van deze array die we terug krijgen.
      .should("have.length", 13);
  });

  //TODO: Add pagination, Sortering , Filtering
});
