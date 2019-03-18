describe('Charts', () => {
  it('Shows configuration radar chart', () => {
    cy.loadCsvData();
    cy.visit("/");
    cy.get(".list-group-item").contains("config-1").click();
    cy.contains("h5", "config-1");
    cy.contains(".list-group-item", "Cost").contains("10");
    cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
  });

  it('Can export radar chart', () => {
    cy.loadCsvData();
    cy.visit("/");
    cy.contains("config-1").parent().click();
    cy.contains("h5", "config-1");
    cy.contains(".list-group-item", "Cost").contains("10");
    cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
    cy.contains(".card", "Properties").parent().children().find("button.dropdown-toggle").click();
    cy.contains(".card", "Properties").parent().children().contains("Export (.svg)");
  });

  it('Shows configuration structure chart', () => {
    cy.loadCsvData();
    cy.loadStructureData();
    cy.visit('/');
    cy.contains("config-1").parent().click();
    cy.contains("h5", "config-1");
    cy.contains(".list-group-item", "Cost").contains("10");
    cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
    cy.contains(".card", "Structure").parent().children().get(".echarts.chart");
  });

  it('Can export structure chart', () => {
    cy.loadCsvData();
    cy.loadStructureData();
    cy.visit('/');
    cy.contains("config-1").parent().click();
    cy.contains(".card", "Structure").parent().children().find("button.dropdown-toggle").click();
    cy.contains(".card", "Structure").parent().children().contains("Export (.png)");
  });
    
  it('1D: bar and line charts', () => {
    cy.loadCsvData();
    cy.visit("/");

    // Select one filter
    cy.contains(".custom-checkbox", "Cost").children().last().click();

    // Verify line chart
    cy.contains(".nav-item", "Line").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.svg)");

    // Verify bar chart
    cy.contains(".nav-item", "Bar").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.svg)");
  });

  it('2D: scatter plot', () => {
    cy.loadCsvData();
    cy.visit("/");
    
    // Select two filters
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.contains(".custom-checkbox", "Reliability").children().last().click();

    // Verify 2D scatter chart
    cy.contains(".nav-item", "2D Scatter").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.svg)");
  });

  it('3D: 2D scatter plot', () => {
    cy.loadCsvData();
    cy.visit("/");
    
    // Select three filters
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.contains(".custom-checkbox", "Reliability").children().last().click();
    cy.contains(".custom-checkbox", "Response Time").children().last().click();

    // Verify 2D scatter chart
    cy.contains(".nav-item", "2D Scatter").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.svg)");
  });

  it('3D: 3D scatter plot', () => {
    cy.loadCsvData();
    cy.visit("/");
    
    // Select three filters
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.contains(".custom-checkbox", "Reliability").children().last().click();
    cy.contains(".custom-checkbox", "Response Time").children().last().click();

    // Verify 3D scatter chart
    cy.contains(".nav-item", "3D Scatter").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.png)");
  });


  it('3D: surface plot', () => {
    cy.loadCsvData();
    cy.visit("/");
    
    // Select three filters
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.contains(".custom-checkbox", "Reliability").children().last().click();
    cy.contains(".custom-checkbox", "Response Time").children().last().click();

    // Verify Surface chart
    cy.contains(".nav-item", "Surface").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.png)");
  });

  it('3D: configuration map plot', () => {
    cy.loadCsvData();
    cy.visit("/");
    
    // Select three filters
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.contains(".custom-checkbox", "Reliability").children().last().click();
    cy.contains(".custom-checkbox", "Response Time").children().last().click();

    // Verify Configuration map chart
    cy.contains(".nav-item", "Map").click();
    cy.get(".echarts.chart").should('have.length', 1);
    cy.get(".tab-pane.active").children().find("button.dropdown-toggle").click();
    cy.get(".tab-pane.active").children().contains("Export (.svg)");
  });
});