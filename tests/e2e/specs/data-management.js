// https://docs.cypress.io/api/introduction/api.html

describe('Data Management', () => {
  it('Allows importing a .csv file', () => {
    cy.visit('/');
    cy.contains('Import').click();
    cy.uploadFile("example.csv", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Importing data...");
    cy.contains("Successfully imported data from 1 file(s)");
    cy.contains("Cost");
    cy.contains("Response Time");
    cy.contains("Reliability");
    cy.contains("config-1");
    cy.contains("config-2");
  });

  it('Allows importing a .json configurations file', () => {
    cy.visit('/');
    cy.contains('Import').click();
    cy.uploadFile("example_import.json", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Importing data...");
    cy.contains("Successfully imported data from 1 file(s)");
    cy.contains("Cost");
    cy.contains("Response Time");
    cy.contains("Reliability");
    cy.contains("config-1");
    cy.contains("config-2");
    cy.contains("config-1").parent().click();
    cy.contains("h5", "config-1");
    cy.contains(".list-group-item", "Cost").contains("10.784824500000001");
  });

  it('Allows importing a .json structural file', () => {
    cy.visit('/');
    cy.contains('Import').click();
    cy.uploadFile("example_config_structure.json", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Importing data...");
    cy.contains("Successfully imported data from 1 file(s)");
    cy.visit('/');
    cy.contains("config-1").parent().click();
    cy.contains("h5", "config-1");
    cy.contains("Structure");
    cy.get(".echarts.chart");
  });

  it('Allows importing a previously exported file', () => {
    cy.visit('/');
    cy.contains('Reset').click();
    cy.contains('Import').click();
    cy.uploadFile("example_export.json", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Importing data...");
    cy.contains("Successfully imported data from 1 file(s)");
    cy.contains("Cost");
    cy.contains("Response Time");
    cy.contains("Reliability");
    cy.contains("config-1");
    cy.contains("config-2");
    cy.get(".list-group-item").contains("config-1").parent().click();
    cy.contains("h5", "config-1");
    cy.contains(".list-group-item", "Cost").contains("10");
  });

  it('Allows resetting all data', () => {
    cy.visit('/');
    cy.contains('Import').click();
    cy.uploadFile("example_export.json", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Cost");
    cy.contains("Response Time");
    cy.contains("Reliability");
    cy.contains("config-1");
    cy.contains("config-2");
    
    const stub = cy.stub();
    cy.on('window:confirm', stub);
    cy.contains('Reset').click().then(() => {
      expect(stub).to.be.called;
      cy.contains("Cost").should('not.exist');
      cy.contains("config-2").should('not.exist');
    });
  });

  it('Allows loading example data', () => {
    cy.visit('/');
    cy.contains('Reset').click();
    cy.contains("Cost").should('not.exist');
    cy.contains("Response Time").should('not.exist');

    cy.contains('load some example data').click();

    cy.contains("Cost").should('exist');
    cy.contains("Range").should('exist');
    cy.contains("Battery Life").should('exist');
    cy.contains("Config-1").should('exist');
    cy.contains("Config-2").should('exist');
  });
});
  