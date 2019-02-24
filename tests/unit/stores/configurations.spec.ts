import { expect } from "chai";

import { Configuration } from "@/models/configuration";

import { configurations } from "@/stores/configurations";

// destructure assign `mutations`
const { addConfiguration, addConfigurations, deleteConfiguration, updateConfiguration } = configurations.mutations;

describe("Store: Configurations", () => {
  it("Mutation: addConfiguration", () => {
    // mock state
    const existingConfig = new Configuration("id1");
    const state = { data: [existingConfig] };

    // create object
    const newConfiguration = new Configuration("id2");

    // apply mutation
    addConfiguration(state, newConfiguration);

    // assert result
    expect(state.data.length).to.equal(2);
    expect(state.data[1]).to.equal(newConfiguration);
  });

  it("Mutation: addConfigurations", () => {
    // mock state
    const existingConfig = new Configuration("id1");
    existingConfig.attributes = [{ key: "attribute", value: 1 }];
    const state = { data: [existingConfig] };

    // create object
    const configToAdd = new Configuration("id");
    const configToUpdate = new Configuration("id1");
    configToUpdate.attributes = [{ key: "attribute", value: 2 }];

    // apply mutation
    addConfigurations(state, [configToAdd, configToUpdate]);

    // assert result
    expect(state.data.length).to.equal(2);
    expect(state.data).to.contain(configToAdd);

    const updatedConfig = state.data.find((f) => f.id === "id1");
    expect(updatedConfig).to.not.be.equal(undefined);
    if (!updatedConfig) { return; }
    expect(updatedConfig.attributes[0].key).to.equal("attribute");
    expect(updatedConfig.attributes[0].value).to.equal(2);
  });

  it("Mutation: deleteConfiguration", () => {
    // mock state
    const existingConfig = new Configuration("id1");
    const configToDelete = new Configuration("id2");
    const state = { data: [existingConfig, configToDelete] };

    // apply mutation
    deleteConfiguration(state, configToDelete);

    // assert result
    expect(state.data.length).to.equal(1);
    expect(state.data).to.not.include(configToDelete);
    expect(state.data).to.include(existingConfig);
  });

  it("Mutation: updateConfiguration", () => {
    // mock state
    const existingConfig = new Configuration("id1");
    const state = { data: [existingConfig] };

    // apply mutation
    const configToUpdate = new Configuration("id1")
    configToUpdate.attributes = [{ key: "attribute", value: 2 }];
    updateConfiguration(state, configToUpdate);

    // assert result
    expect(state.data.length).to.equal(1);
    expect(state.data[0].attributes.length).to.equal(1);
    expect(state.data[0].attributes[0].key).to.equal("attribute");
    expect(state.data[0].attributes[0].value).to.equal(2);
  });

  it("Getter: configurations", () => {
    // mock state
    const existingConfig = new Configuration("id1");
    existingConfig.attributes = [{ key: "attribute", value: 2 }];
    const state = { data: [existingConfig] };

    // use getter
    const getter = configurations.getters.configurations;
    const allConfigurations = getter(state, null, null, null);

    // assert result
    expect(allConfigurations.length).to.equal(1);
    expect(allConfigurations[0].id).to.equal("id1");
    expect(allConfigurations[0].attributes.length).to.equal(1);
    expect(allConfigurations[0].attributes[0].key).to.equal("attribute");
    expect(allConfigurations[0].attributes[0].value).to.equal(2);
  });
});
