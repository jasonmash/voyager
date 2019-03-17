describe('Charts', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('Import').click();
      cy.uploadFile("example.csv", '#fileinput[type="file"]');
      cy.get('#fileinput[type="file"]').trigger('change', { force: true });
      cy.contains("Importing data...");
      cy.contains("Successfully imported data from 1 file(s)");
    });

    it('Shows configuration radar chart', () => {
      cy.visit('/');
      cy.get(".list-group-item").contains("config-1").click();
      cy.contains("h5", "config-1");
      cy.contains(".list-group-item", "Cost").contains("10");
      cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
    });

    it('Can export radar chart', () => {
      cy.visit('/');
      cy.get(".list-group-item").contains("config-1").click();
      cy.contains("h5", "config-1");
      cy.contains(".list-group-item", "Cost").contains("10");
      cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
      cy.contains(".card", "Properties").parent().children().find("button.dropdown-toggle").click();
      cy.contains(".card", "Properties").parent().children().contains("Export (.svg)");
    });

    it('Shows configuration structure chart', () => {
      cy.visit('/');
      cy.uploadFile("example_config_structure.json", '#fileinput[type="file"]');
      cy.get('#fileinput[type="file"]').trigger('change', { force: true });
      cy.contains("Successfully imported data from 1 file(s)");
      cy.get(".list-group-item").contains("config-1").click();
      cy.contains("h5", "config-1");
      cy.contains(".list-group-item", "Cost").contains("10");
      cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
      cy.contains(".card", "Structure").parent().children().get(".echarts.chart");
    });

    it('Can export structure chart', () => {
      cy.visit('/');
      cy.uploadFile("example_config_structure.json", '#fileinput[type="file"]');
      cy.get('#fileinput[type="file"]').trigger('change', { force: true });
      cy.contains("Successfully imported data from 1 file(s)");
      cy.get(".list-group-item").contains("config-1").click();
      cy.contains(".card", "Structure").parent().children().find("button.dropdown-toggle").click();
      cy.contains(".card", "Structure").parent().children().contains("Export (.png)");
    });
});