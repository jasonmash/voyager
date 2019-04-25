# Voyager

## Overview
  Voyager is a user-friendly software tool for trade-off exploration, developed for a final year project at the University of York. It is designed to allow visualising generalised multi-dimensional design spaces, with a focus on software architectures.

[![Build Status](https://dev.azure.com/jasonmash/voyager/_apis/build/status/jasonmash.voyager?branchName=master)](https://dev.azure.com/jasonmash/voyager/_build/latest?definitionId=3&branchName=master)


## Project setup
Requires [npm](https://www.npmjs.com/get-npm) and [Vue CLI](https://cli.vuejs.org) to be installed on your system.

To build the project, install dependencies from npm using the following command:
```
npm install
```

[Visual Studio Code](https://code.visualstudio.com) was used to develop this project, using the following recommended extensions: *Vetur*, *TSLint*, *Document This*

### Compiles and hot-reloads for development
To run the project on your local machine, use the following command to start a development server, that reloads whenever code changes are detected. The hosted application will be accessible at: http://localhost:8080/voyager
```
npm start
```

### Compiles and minifies for production
To package and distribute this project, use the following command to generate a `/dist` directory containing output files to copy to a static web host server.
```
npm run build
```

## Testing
This project contains end-to-end and unit tests, the details of which are included below. The project is connected to the Azure Pipelines continuous integration system, which runs linting, unit and e2e tests whenever a commit is pushed to GitHub.
### Linting
Enforces standard TSLint code style rules for consistency, includes a git hook that runs linting before each commit.
```
npm run lint
```

### Unit tests
Unit tests are written using mocha, and can be found in `/tests/unit`.
```
npm run test:unit
```

### End-to-end tests
End-to-end tests run using Cypress, with mocha test scripts that are found in `/tests/e2e`.
```
npm run test:e2e

npm run test:ci
```

## Code Structure
The code for this project is found in the `/src` directory, which is organised in the following manner:
- **Components** - includes reusable user interface elements, including message boxes, range sliders and each of the charts and visualisations used in the Solution Explorer. Each UI component is kept generic to enable reusability and maintainability.
- **Models** – includes the classes representing each data element used within the application. Contains classes with relevant properties and methods for Configurations, Attributes and ChartData.
- **Stores** – contains operations that manage the state of the application data, using Vuex. Ensures any mutation of the state updates the user interface as appropriate. Includes methods that are used by user interface components and pages for accessing data.
- **Utils** – contains utility classes that are used in various parts of the application, including:
  - **Data Management** – general functions that manage the state of the user interface, including resetting all data, loading demonstration data and exporting data functionality.
  - **Importer** – functionality for importing files, parsing and processing it into appropriate formats, and saving the data for display in the user interface. Includes methods for processing several forms of JSON and CSV data.
  - **Optimality** – contains functions for calculating optimal configurations, including the Pareto front and at a given point.
- **Views** – includes each page of the user interface
  - **Solution Explorer** – user interface for the Solution Explorer page, with a sub-folder containing components that make up the page (e.g. attribute list).
  - **About** – help page content for the application
  - **404** – error page for when unknown URLs are visited.
  - **Router** – the entry point for the application, consisting of a class which maps incoming URLs to the appropriate user interface component representing a page.