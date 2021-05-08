context("Add research", () => {
  beforeEach(() => {
    cy.visit("https://localhost:5001/AddResearch");
  });

  //Voor forms kan het handig zijn als we enkele variabelen lokaal definiëren
  var demoTitle = "TitelVanEenResearch30Karakters";
  var demoAutho = "MarckVanDeVertonghen";
  var demoUrl = "EqrDLqp096q3ffw1b8EaONF2o8Kbi7gByy7UuiTIqOpVgCRqBS";

  //In deze file gaan we alle testen shrijven voor de Add research form.
  //Deze form bevat validatie

  it("Field widths check", () => {
    //In de form hebben we volgende velden met een max width:
    //Title :30 , Author:20, Url: 50
    //Inputs die te groot zijn.
    var demoTitleToWide = "TitelVanEenResearch30KaraktersExtraKarakters";
    var demoAuthoToWide = "MarckVanDeVertonghenExtraKarakters";
    var demoUrlToWide =
      "EqrDLqp096q3ffw1b8EaONF2o8Kbi7gByy7UuiTIqOpVgCRqBSExtraKarakters";

    //We kunnen eerste attributen van de input fields valideren.
    cy.get("#Research_Title").should("have.attr", "maxlength", 30);
    cy.get("#Research_Author").should("have.attr", "maxlength", 20);
    cy.get("#Research_Url").should("have.attr", "maxlength", 50);

    //Velden invullen. We String die we meegeven is te lang dus we verwachten dat enkel de eerste 30 karakters ingevuld zullen zijn.
    cy.get("#Research_Title").type(demoTitleToWide);
    cy.get("#Research_Author").type(demoAuthoToWide);
    cy.get("#Research_Url").type(demoUrlToWide);

    //Assert de ingevulde values
    cy.get("#Research_Url").should("have.value", demoUrl);
    cy.get("#Research_Title").should("have.value", demoTitle);
    cy.get("#Research_Author").should("have.value", demoAutho);
  });

  it("Form validation check", () => {
    //We drukken op de submit knop voor de form required validation.
    cy.get("button").contains("Submit").click();

    //Valideer of de error messages aanwezig zijn.
    cy.get("span")
      .should("contain", "The title is required")
      .and("contain", "Author is required")
      .and("contain", "An URL is required")
      .and("contain", "The value '' is invalid");

    //Valideer de error styling.
    cy.get("span")
      .contains("The title is required")
      .should("have.class", "text-danger");
  });

  it("Form validation check 2", () => {
    //We weten nu dat de form valideert of sommige velden ingevuld zijn. Wat als we nu een extra validatie regel hebben die zegt dat onze naam minstens x-aantal karakters moet bevatten.

    //We vullen een tekort titel, author in een een waarde die niet tot de pagina-range behoort.
    //We vullen de form in
    cy.get("#Research_Title").type("titel");
    cy.get("#Research_Author").type("kort");
    cy.get("#Research_Pages").type(5);
    cy.get("#Research_Url").type(demoUrl);
    //We drukken op de submit knop voor de form andere validation.
    cy.get("button").contains("Submit").click();

    //We controleren of de validatie aanwezig is
    cy.get("span")
      .should("contain", "The title should be atleast 12 characters")
      .and("contain", "The authors name should be atleast 5 characters")
      .and("contain", "A paper should be between 10-100 pages");
  });

  it("Data type check", () => {
    // Op onze form kunnen we het aantal pagina's meegeven. Dit mogen uiteraard geen karakters zijn.
    cy.get("#Research_Pages").type("RandomString");
    //We valideren de value van het input veld
    cy.get("#Research_Pages").should("not.have.value", "RandomString");
    //We vullen nu een geldige waarde in
    cy.get("#Research_Pages").type(3);
    //We valideren de value opnieuw
    cy.get("#Research_Pages").should("have.value", 3);
  });

  it("A valid form will redirect us to The research page", () => {
    //Nu gaan we kijken wat er gebeurt als we een Valid form ingeven.
    //We verwachten dat we naar de research pagina worden gestuurd.
    //We vullen de form in
    cy.get("#Research_Title").type(demoTitle);
    cy.get("#Research_Author").type(demoAutho);
    cy.get("#Research_Pages").type(12);
    cy.get("#Research_Url").type(demoUrl);
    //We submitten de form
    cy.get("button").contains("Submit").click();
    //We valideren de url van de pagina waarop we terechtkomen.
    cy.url().should("include", "Research");
  });
});
