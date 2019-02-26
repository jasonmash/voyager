import { Store } from "vuex";
import { Configuration } from "@/models/configuration";

export default class Importer {
  /**
   * JSON file importer
   * @static
   * @param {*} data JSON data to import
   * @param {Store<any>} $store Reference to vuex store
   * @returns {boolean} Was operation successful
   * @memberof Importer
   */
  public static importFile(data: any, $store: Store<any>): boolean {
    // Try to detect data format
    if (Array.isArray(data)) {
      this.processDataArray(data, $store);
    } else if (typeof data === "object" && !!data.id && !!data.graph) {
      this.processConfigurationObject(data, $store);
    } else {
      return false;
    }
    return true;
  }

  /**
   * Process an array of configurations with attribute values
   *
   * @private
   * @static
   * @param {object[]} data Data to process
   * @param {Store<any>} $store Reference to vuex store
   * @memberof Importer
   */
  private static processDataArray(data: object[], $store: Store<any>) {
    const configurations: Configuration[] = $store.getters.configurations;
    data.forEach((config: any) => {
      Object.keys(config).forEach((id: string) => {
        const index = configurations.findIndex((c: Configuration) => c.id === id);
        if (index >= 0) {
          configurations[index].setAttributes(config[id], $store);
        } else {
          const c = new Configuration(id);
          c.setAttributes(config[id], $store);
          configurations.push(c);
        }
      });
    });
    $store.commit("addConfigurations", configurations);
  }

  /**
   * Process a configuration object with structural(graph) values
   *
   * @private
   * @static
   * @param {object[]} data Data to process
   * @param {Store<any>} $store Reference to vuex store
   * @memberof Importer
   */
  private static processConfigurationObject(data: any, $store: Store<any>) {
    const configurations: Configuration[] = $store.getters.configurations;
    const index = configurations.findIndex((c: Configuration) => c.id === data.id);
    if (index >= 0) {
      configurations[index].setGraph(data.graph);
    } else {
      const c = new Configuration(data.id);
      c.setGraph(data.graph);
      configurations.push(c);
    }
    $store.commit("addConfigurations", configurations);
  }
}
