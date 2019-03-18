// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('uploadFile', (fileName, selector) => {
    cy.get(selector).then(subject => {
        cy.fixture(fileName, 'base64').then((content) => {
            const el = subject[0];
            if (typeof content !== "string") {
                console.log(content);
                content = btoa(JSON.stringify(content));
            }
            const blob = b64toBlob(content);
            const testFile = new File([blob], fileName);
            const dataTransfer = new DataTransfer();

            dataTransfer.items.add(testFile);
            el.files = dataTransfer.files;
        });
    });
});

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    blob.lastModifiedDate = new Date();
    return blob;
}

Cypress.Commands.add('loadCsvData', () => {
    cy.visit('/');
    cy.contains('Import').click();
    cy.uploadFile("example.csv", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Importing data...");
    cy.contains("Successfully imported data from 1 file(s)");
});

Cypress.Commands.add('loadStructureData', () => {
    cy.visit('/');
    cy.uploadFile("example_config_structure.json", '#fileinput[type="file"]');
    cy.get('#fileinput[type="file"]').trigger('change', { force: true });
    cy.contains("Importing data...");
    cy.contains("Successfully imported data from 1 file(s)");
});
