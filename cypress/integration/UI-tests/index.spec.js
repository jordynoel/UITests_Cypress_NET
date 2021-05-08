context("Index page", () => {
  //Deze hook gaat voor elke test de commands die in de hook staan uitvoeren.
  beforeEach(() => {
    //Voor elke test gaan we de home pagina bezoeken.
    cy.visit("https://localhost:5001/");
  });

  it("Check url", () => {
    cy.url().should("include", "localhost");
  });

  it("Check nav elements", () => {
    //Vraag de navbar op met behulp van de class selector. We kunnen gebruik maken van chaining om verschillende asserts na elkaar uit te voeren.
    cy.get(".navbar")
      .should("contain", "ResearchCrew")
      .and("contain", "Research")
      .and("contain", "Add research")
      .and("contain", "Dropdown");
  });

  it("Check content elements", () => {
    //Vraag de pagina content op met behulp van de id selector.
    cy.get("#content")
      .should("contain", "Welcome to the ResearchCrew!!")
      .and("contain", "Hello, world!");

    //We kunneno ook elementen opvragen met behulp van de de html-tag
    cy.get("p").should("contain", "simple hero");
  });

  it("Check CSS attributes", () => {
    cy.get("h1")
      .contains("Hello, world!")
      .should("have.css", "font-weight", "300");

    //Failing test to show the stack trace
    cy.get("h1")
      .contains("Hello, world!")
      .should("have.css", "font-size", "3.5rem");
  });
  it("Check css", () => {
    //Vraag h1 element op dat 'hello,world!' bevat en assert het class attribuut.
    cy.get("h1").contains("Hello, world!").should("have.class", "display-4");
  });

  it("Check navigation", () => {
    //We gaan de navigatie controleren , we kunnen dit op verschillende manieren doen. We kunnen het href attribute van de a-tag valideren of we kunnen op de link klikken en de url opvragen.

    //Href attribute valideren
    cy.get(".nav-link")
      .contains("Add research")
      .should("have.attr", "href", "/AddResearch");
    //Naar de pagina navigeren met behulp van de buttons.
    cy.get(".nav-link").contains("Add research").click(); //Simuleert een user click event.
    //Vervolgens valideren we de url
    cy.url().should("include", "AddResearch");
  });

  it("Validate dropdown", () => {
    //We zoeken de dropdown link en klikken hierop.
    cy.get(".nav-link").contains("Dropdown").click();
    //We asserten of de dropdown openklapt door na te gaan of de elementen zichtbaar zijn.
    cy.get(".dropdown-menu")
      .should("contain", "Action")
      .and("contain", "Another action")
      .and("contain", "Something else here");
  });
});
