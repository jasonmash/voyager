import { expect } from "chai";
import DataManagement from "@/utils/data-management";
import store from "@/stores/store";

describe("Utils: DataManagement", () => {
  it("Resets all data", () => {
    // load data
    store.commit("addConfiguration", { id: "1", attributes: [{ key: "a", value: 1 }, { key: "b", value: 2 }]});
    store.commit("addConfiguration", { id: "2", attributes: [{ key: "a", value: 1 }, { key: "b", value: 2 }]});

    store.commit("processAttributeValue", { key: "a", value: 1 });
    store.commit("processAttributeValue", { key: "b", value: 2 });

    expect(store.state.attributes.data.length).to.equal(2);
    expect(store.state.configurations.data.length).to.equal(2);

    // apply action
    DataManagement.resetAllData(store);

    // assert result
    expect(store.state.attributes.data.length).to.equal(0);
    expect(store.state.configurations.data.length).to.equal(0);
  });

  it("Exports all data as .json string", () => {
    // load data
    store.commit("addConfiguration", { id: "1", attributes: [{ key: "a", value: 1 }, { key: "b", value: 2 }]});
    store.commit("addConfiguration", { id: "2", attributes: [{ key: "a", value: 1 }, { key: "b", value: 2 }]});

    store.commit("processAttributeValue", { key: "a", value: 1 });
    store.commit("processAttributeValue", { key: "b", value: 2 });

    expect(store.state.attributes.data.length).to.equal(2);
    expect(store.state.configurations.data.length).to.equal(2);

    // apply action
    const result = DataManagement.getStoreData(store);
    const json = JSON.parse(result);

    // assert result
    expect(json.attributes.data.length).to.equal(2);
    expect(json.configurations.data.length).to.equal(2);
  });
});
