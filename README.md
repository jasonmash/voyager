# Voyager

## Overview
  Voyager is a tool which allows engineers to visualise architectural configurations and explore the trade-offs among their quality attributes in a multi-dimensional design space. The tool produces contextual visualisations to facilitate trade-off analysis, providing engineers with a streamlined way of understanding architectural design spaces, using an approach that combines architectural structure with multi-dimensional data visualisations.

  A hosted version of the Voyager tool can be found here: [https://jasonmash.github.io/voyager](https://jasonmash.github.io/voyager)
  
  A video demonstration can be found on YouTube at the following link: [https://www.youtube.com/watch?v=eyIniJblsPo](https://www.youtube.com/watch?v=eyIniJblsPo)
 

[![Build Status](https://dev.azure.com/jasonmash/voyager/_apis/build/status/jasonmash.voyager?branchName=master)](https://dev.azure.com/jasonmash/voyager/_build/latest?definitionId=4&branchName=master)

## Development
### Project setup
Requires [npm](https://www.npmjs.com/get-npm) and [Vue CLI](https://cli.vuejs.org) to be installed on your system.

To build the project, install dependencies from npm using the following command:
```
npm install
```

[Visual Studio Code](https://code.visualstudio.com) was used to develop this project, using the following recommended extensions: *Vetur*, *TSLint*, *Document This*

#### Compiles and hot-reloads for development
To run the project on your local machine, use the following command to start a development server, that reloads whenever code changes are detected. The hosted application will be accessible at: http://localhost:8080/voyager
```
npm start
```

#### Compiles and minifies for production
To package and distribute this project, use the following command to generate a `/dist` directory containing output files to copy to a static web host server.
```
npm run build
```

### Testing
This project contains end-to-end and unit tests, the details of which are included below. The project is connected to the Azure Pipelines continuous integration system, which runs linting, unit and e2e tests whenever a commit is pushed to GitHub.
#### Linting
Enforces standard TSLint code style rules for consistency, includes a git hook that runs linting before each commit.
```
npm run lint
```

#### Unit tests
Unit tests are written using mocha, and can be found in `/tests/unit`.
```
npm run test:unit
```

#### End-to-end tests
End-to-end tests run using Cypress, with mocha test scripts that are found in `/tests/e2e`.
```
npm run test:e2e

npm run test:ci
```

### Code Structure
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

## Extensions
  Voyager has support for integrating with external software tools, making use of the extension interface. Extensions allow external tools to act as a data source, providing architectural configuration and quality attribute data in JSON format using a HTTP/REST API interface. In addition, external tools can provide additional visualisations for individual configurations to appear in the user interface.

  Voyager supports the following endpoints:

  ### Configurations (GET)
  Voyager can send a GET request to a provided URL to request a list of configurations to analyse.
  
  #### Response
  The endpoint should return a list of configurations in JSON format. Each configuration must be represented using JSON, containing one or more attributes, with optional structure information.
  
  Each configuration must use the following JSON object format:
  
  ```json
  {
    "id": "Config-1",
    "attributes": {
      "cost": 11.30,
      "responseTime": 53.98,
      "reliability": 0.995
    },
    "structure": {
      "components": ["A", "B", "C"],
      "connections": [
        { "label": "Conn1", "from": "A", "to": "B" },
        { "label": "Conn2", "from": "A", "to": "C" },
        { "label": "Conn3", "from": "B", "to": "A" }
      ]
    }
  }
  ```

  #### Example

  ###### Request (sent from Voyager)

  ```http
  GET /configurations
  ```

  ###### JSON Response (required format for Voyager)

  ```json
  [
    {"id":"Config-0","attributes":[{"key":"cost","value":10.0},{"key":"responseTime","value":40.0},{"key":"reliability","value":0.998}]},
    {"id":"Config-1","attributes":[{"key":"cost","value":11.0},{"key":"responseTime","value":43.0},{"key":"reliability","value":0.999}]},
    {"id":"Config-2","attributes":[{"key":"cost","value":12.0},{"key":"responseTime","value":50.0},{"key":"reliability","value":0.9995}]},
    {"id":"Config-3","attributes":[{"key":"cost","value":13.0},{"key":"responseTime","value":20.0},{"key":"reliability","value":0.9974}
  ]
  ```

  ### Configuration Visualisations (GET)
  Voyager can send a GET request whenever a user selects a configuration in the user interface, requesting a set of visualisations to show in addition to the defaults. These will appear as additional tabs in the "Selected Configuration" panel.

  #### Request parameters

  In the request URL, the following query parameters with values are provided.

  | Parameter | Type | Description |
  |:----------|:-----|:------------|
  |id|String|Unique identifier of configuration|

  #### Response

  The server should return a configuration object, with a "content" array containing a list of visualisations for the provided configuration id.

  Each visualisation must be given a title, and must have a specified integer type. Voyager can show content with the following types:
  - Type 0: **HTML** (UTF-8 string)
  - Type 1: **SVG** (base64 encoded)
  - Type 2: **PNG** (base64 encoded)
  - Type 3: **JPEG** (base64 encoded)

  #### Example

  ###### Request (sent from Voyager)

  ```http
  GET /configurations/config-1
  ```

  ###### Response (required format for Voyager)

  ```json
  {
    "id":"config-1",
    "content": [
      { "title":"HTML page", "type":0,"value":"{{HTML page content goes here. Custom CSS and JS may be embedded in the page}}"},
      { "title":"SVG graphic", "type":1,"value":"{{Base64 SVG representation goes here}}"},
      { "title":"PNG graphic", "type":2,"value":"{{Base64 PNG representation goes here}}"},
      { "title":"JPEG graphic", "type":3,"value":"{{Base64 JPEG representation goes here}}"}
    ]
  }
  ```
