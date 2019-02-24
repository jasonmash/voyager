import { expect } from "chai";

import { Configuration } from "@/models/configuration";

describe("Configuration", () => {
  it("creates new object when constructor is used", () => {
    const id = "configuration_id";
    const configuration: Configuration = new Configuration(id);
    expect(configuration.id).to.equal(id);
  });

  it("loads graph properties from provided data", () => {
    const configuration: Configuration = new Configuration("configuration_id");
    expect(configuration.components).to.be.length(0);
    expect(configuration.connections).to.be.length(0);
  });

  it("loads attributes from provided data", () => {
    const configuration: Configuration = new Configuration("configuration_id");
    expect(configuration.attributes).to.be.length(0);
  });

  /*
  import { shallowMount } from "@vue/test-utils";
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  }); */
});
