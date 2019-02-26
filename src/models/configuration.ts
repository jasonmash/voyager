import { AttributeValue } from "./attribute";

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
   * @type {AttributeValue[]}
   * @memberof Configuration
   */
  public attributes: AttributeValue[] = [];

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
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Load a list of attribute values into this configuration
   * @param {object[]} attributeList List of attribute values to process
   * @param {*} store Reference to vuex store to update
   * @memberof Configuration
   */
  public setAttributes(attributeList: object[], store: any) {
    const output: AttributeValue[] = [];

    // Loop through each attribute in incoming list
    attributeList.forEach((attribute: any) => {
      Object.keys(attribute).forEach((key: string) => {
        // Create new AttributeValue object
        const newAttribute: AttributeValue = {
          key,
          value: parseFloat(attribute[key])
        };

        // Use processAttribute mutation to update associated Attribute info (e.g. maxValue seen so far)
        store.commit("processAttributeValue", newAttribute);

        // Update output list
        output.push(newAttribute);
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
    graphData.forEach((component: object) => {
      Object.keys(component).forEach((key: string) => {
        if (!this.structure.components.includes(key)) {
          this.structure.components.push(key);
        }
      });
    });
  }
}

export interface ConfigurationStructure {
  connections: string[];
  components: string[];
}
