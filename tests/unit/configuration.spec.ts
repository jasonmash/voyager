import { expect } from "chai";

import { Configuration } from "@/models/configuration";

describe("Configuration", () => {
  it("creates new object when constructor is used", () => {
    const id = "configuration_id";
    const configuration: Configuration = new Configuration(id);
    expect(configuration.id).to.equal(id);
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
