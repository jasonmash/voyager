import { expect } from "chai";

import { Configuration } from "@/models/configuration";

import { configurations } from "@/stores/configurations";

describe("Store: Configurations", () => {
  it("Mutation: addConfiguration", () => {
    // mock state
    const existingConfig = new Configuration({ id: "id1"});
    const state = { data: [existingConfig] };

    // create object
    const newConfiguration = new Configuration({ id: "id2"});

    // apply mutation
    configurations.mutations.addConfiguration(state, newConfiguration);

    // assert result
    expect(state.data.length).to.equal(2);
    expect(state.data[1].id).to.equal(newConfiguration.id);
  });

  it("Mutation: addConfigurations", () => {
    // mock state
    const existingConfig = new Configuration({ id: "id1"});
    existingConfig.attributes = { attribute: 1 };
    const state = { data: [existingConfig] };

    // create object
    const configToAdd = new Configuration({ id: "id"});
    const configToUpdate = new Configuration({ id: "id1"});
    configToUpdate.attributes = { attribute: 2 };

    // apply mutation
    configurations.mutations.addConfigurations(state, [configToAdd, configToUpdate]);

    // assert result
    expect(state.data.length).to.equal(2);
    const addedConfig = state.data.find((f) => f.id === "id1");
    expect(addedConfig).to.be.an("object");

    const updatedConfig = state.data.find((f) => f.id === "id1");
    expect(updatedConfig).to.not.be.equal(undefined);
    if (!updatedConfig) { return; }
    expect(updatedConfig.attributes.attribute).to.equal(2);
  });

  it("Mutation: deleteConfiguration", () => {
    // mock state
    const existingConfig = new Configuration({ id: "id1"});
    const configToDelete = new Configuration({ id: "id2"});
    const state = { data: [existingConfig, configToDelete] };

    // apply mutation
    configurations.mutations.deleteConfiguration(state, configToDelete);

    // assert result
    expect(state.data.length).to.equal(1);
    expect(state.data).to.not.include(configToDelete);
    expect(state.data).to.include(existingConfig);
  });

  it("Mutation: updateConfiguration", () => {
    // mock state
    const existingConfig = new Configuration({ id: "id1"});
    const state = { data: [existingConfig] };

    // apply mutation
    const configToUpdate = new Configuration({ id: "id1"});
    configToUpdate.attributes = { attribute: 2 };
    configurations.mutations.updateConfiguration(state, configToUpdate);

    // assert result
    expect(state.data.length).to.equal(1);
    expect(state.data[0].attributes.attribute).to.equal(2);
  });

  it("Mutation: resetConfigurations", () => {
    // mock state
    const existingConfig = new Configuration({ id: "id1" });
    const state = { data: [existingConfig] };
    expect(state.data.length).to.equal(1);

    // apply mutation
    configurations.mutations.resetConfigurations(state, null);

    // assert result
    expect(state.data.length).to.equal(0);
  });

  it("Getter: configurations", () => {
    // mock state
    const existingConfig = new Configuration({ id: "id1"});
    existingConfig.attributes = { attribute: 2 };
    const state = { data: [existingConfig] };

    // use getter
    const getter = configurations.getters.configurations;
    const allConfigurations = getter(state, null, null, null);

    // assert result
    expect(allConfigurations.length).to.equal(1);
    expect(allConfigurations[0].id).to.equal("id1");
    expect(allConfigurations[0].attributes.attribute).to.equal(2);
  });
});
