import _ from "lodash";

import { AttributeValues } from "./attribute";

/**
 * Represents a configuration
 * @class Configuration
 */
export class Configuration {

  /**
   * Unique identifier of configuration
   * @type {string}
   * @memberof Configuration
   */
  public id: string = "";

  /**
   * List of attribute values of this configuration
   * @type {AttributeValues}
   * @memberof Configuration
   */
  public attributes: AttributeValues = {};

  /**
   * Representation of configuration structure (i.e. network of its components)
   *
   * @type {ConfigurationStructure}
   * @memberof Configuration
   */
  public structure: ConfigurationStructure = {
    connections: [],
    components: []
  };

  /**
   * Creates an instance of Configuration.
   * @param {string} id Unique identifier for configuration
   * @memberof Configuration
   */
  constructor(config: any) {
    Object.assign(this, config);
  }

  /**
   * Load a list of attribute values into this configuration
   * @param {object[]} attributeList List of attribute values to process
   * @param {*} store Reference to vuex store to update
   * @memberof Configuration
   */
  public setAttributes(attributeList: object[], store: any) {
    const output: AttributeValues = {};

    // Loop through each attribute in incoming list
    attributeList.forEach((attribute: any) => {
      Object.keys(attribute).forEach((key: string) => {
        output[key] = parseFloat(attribute[key]);

        // Use processAttribute mutation to update associated Attribute info (e.g. maxValue seen so far)
        store.commit("processAttributeValue", { key, value: parseFloat(attribute[key])});
      });
    });

    this.attributes = output;
  }

  /**
   * Load graph information for configuration
   * @param {*} graphData Information about configuration structure
   * @memberof Configuration
   */
  public setGraph(graphData: any) {
    graphData.forEach((component: any) => {
      Object.keys(component).forEach((key: string) => {
        if (!this.structure.components.includes(key)) {
          this.structure.components.push(key);
        }

        component[key].forEach((c: any) => {
          Object.keys(c).forEach((label: string) => {
            const connection: StructureConnection = {
              label,
              from: key,
              to: c[label]
            };
            this.structure.connections.push(connection);
          });
        });
      });
    });
  }
}

export interface ConfigurationStructure {
  connections: StructureConnection[];
  components: string[];
}

export interface StructureConnection {
  label: string;
  from: string;
  to: string;
}

