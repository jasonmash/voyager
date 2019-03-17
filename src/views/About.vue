<template>
<b-container fluid>
  <b-row>
    <b-col></b-col>
    <b-col sm="6">
      <div class="py-4">
        <h3>Help</h3>
        <h5 class="mt-4">Getting started</h5>
        <p>To start using Voyager, import some data using the "Import" button in the top-right corner of the Solution Explorer page.</p>


        <h5 class="mt-4">Data structure</h5>
        <p>To use Voyager, any multi-dimensional data must be structured in the following format:

          <ul>
            <li><b>Configuration</b> - a possible solution in the design space, which has a collection of attributes to represent its properties.<br>
            Configurations can optionally have an architectural structure, which is represented as a directed graph.</li>
            <li><b>Attribute</b> - a property of each configuration, e.g. response time. It is often the case that a higher or lower value is more desirable.</li>
          </ul>
        </p>

        <h5 class="mt-4">Data formats</h5>
        <p>Data can be imported into Voyager using <code>.csv</code> or <code>.json</code> files.
        You can import any previously exported <code>.json</code> files, or any data in the following formats:</p>
        <b-card no-body>
          <b-tabs card no-fade>
            <b-tab title="CSV">
              <p>
                CSV files can be imported into Voyager. These should be formatted such that:<br>
                <ul>
                  <li>The first row contains column headers, these map to attribute names</li>
                  <li>Each row represents a single configuration</li>
                  <li>Each value in a row represents an attribute</li>
                  <li>An "id" column is used as an identifier for each configuration, and will appear in the configuration list</li>
                  <li>If no "id" is specified, each configuration will be allocated a numerical idenfifier</li>
                </ul>
              </p>
              <b-row>
                <b-col>
                  <h6>Example (.csv)</h6>
                  <code>
                    Id,Cost,Response Time,Reliability<br>
                    config-1,10,40,0.98<br>
                    config-2,30,14,0.99
                  </code>
                </b-col>

                <b-col>
                  <h6>Value</h6>
                  <ul>
                    <li><b>config-1</b><br>cost = 10<br>response time = 40<br>reliability = 0.98<br></li>
                    <li><b>config-2</b><br>cost = 30<br>response time = 14<br>reliability = 0.99</li>
                  </ul>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="JSON (configurations)">
              <p>
                To import a list of configurations with its associated attributes, the JSON file should be structured as an array of objects, one per configuration. Each object must contain:<br>
                <ul>
                  <li>A single property, with a key being the configuration identifier (string)</li>
                  <li>An array of attribute values, each represented as a key-value object</li>
                </ul>
              </p>
              <b-row>
                <b-col>
                  <h6>Example (.json)</h6>
                  <code>
                  [{<br>
                  &nbsp;&nbsp;"config-1": [<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "cost": "10" },<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "responseTime": "40" },<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "reliability": "0.98" }<br>
                  &nbsp;&nbsp;]<br>
                  }, {<br>
                  &nbsp;&nbsp;"config-2": [<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "cost": "30" },<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "responseTime": "14" },<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "reliability": "0.99" }<br>
                  &nbsp;&nbsp;]<br>
                  }]
                  </code>
                </b-col>

                <b-col>
                  <h6>Value</h6>
                  <ul>
                    <li><b>config-1</b><br>cost = 10<br>response time = 40<br>reliability = 0.98<br></li>
                    <li><b>config-2</b><br>cost = 30<br>response time = 14<br>reliability = 0.99</li>
                  </ul>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="JSON (structure)">
              <p>
                Architectural structure can be imported into Voyager using JSON files, one configuration at a time.
                The JSON file should consist of a single object, with the following properties<br>
                <ul>
                  <li><b>id</b>: The configuration identifier (string)</li>
                  <li><b>graph</b>: An array of the architectural structure, where each element is an object with a key (representing the node name), and an array of connections as it's value.</li>
                </ul>
              </p>
              <b-row>
                <b-col>
                  <h6>Example (.json)</h6>
                  <code>
                  {<br>
                  &nbsp;&nbsp;"id": "config-1",<br>
                  &nbsp;&nbsp;"graph": [<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{"NodeA": [{ "AtoB": "NodeB"}]},<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{"NodeB": [{ "BtoC": "NodeC"}]},<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{"NodeC": [<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "CtoA": "NodeA"},<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "CtoB": "NodeB"}<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;]},<br>
                  &nbsp;&nbsp;]<br>
                  }
                  </code>
                </b-col>

                <b-col>
                  <h6>Value</h6>
                  <img src="@/assets/example_structure.jpg" height="250"/>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>

        <h5 class="mt-4">Exporting data</h5>
        <p>To save the current state of Voyager, press the "Export" button in the top-right corner of the Solution Explorer page.</p>


        <h5 class="mt-4">Clearing data</h5>
        <p>To reset and remove all data from Voyager, press the "Reset" button in the top-right corner of the Solution Explorer page.</p>

      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
</b-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
