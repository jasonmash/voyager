import { Store } from "vuex";
import download from "downloadjs";

export default class DataManagement {

  /**
   * Removes all data used by application and saved in localStorage
   * @static
   * @param {Store<any>} store Vuex store reference
   * @memberof DataManagement
   */
  public static resetAllData(store: Store<any>) {
    store.commit("resetConfigurations");
    store.commit("resetAttributes");
    store.commit("resetReports");
  }

  /**
   * Exports all data stored in application to .json file
   * @static
   * @param {Store<any>} store Vuex store reference
   * @memberof DataManagement
   */
  public static exportAllData(store: Store<any>) {
    const data = JSON.stringify(store.state);
    const fileName = "export_" + new Date().toLocaleDateString() + ".json";
    download(data, fileName, "application/json");
  }
}
