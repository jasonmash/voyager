import { expect } from "chai";

import { Configuration } from "@/models/configuration";

describe("Configuration", () => {
  it("creates new object when constructor is used", () => {
    const id = "configuration_id";
    const configuration: Configuration = new Configuration({id});
    expect(configuration.id).to.equal(id);
  });

  it("loads graph properties from provided data", () => {
    const configuration: Configuration = new Configuration({id: "configuration_id"});
    expect(configuration.structure.components).to.be.length(0);

    const graphData = [
      { TASWorkflow0: [
        { ServiceBindings: "MS10" },
        { MSBindings: "MS10" },
        { ServiceBindings: "DS10" },
        { ABindings: "AS30" },
        { DBindings: "DS10" },
        { ServiceBindings: "AS30" }]
      },
      { MS10: [{ WorkflowBinding: "TASWorkflow0" }]},
      { AS30: [{ WorkflowBinding: "TASWorkflow0" }]},
      { DS10: [{ WorkflowBinding: "TASWorkflow0" }]}
    ];

    configuration.setGraph(graphData);

    expect(configuration.structure.components).to.be.length(4);
  });

  it("loads attributes from provided data", () => {
    const configuration: Configuration = new Configuration({ id: "configuration_id" });

    const attributeList = [{ cost: "10.7" }];

    const commit = (mutation: string, attribute: any) => {
      expect(mutation).to.be.equal("processAttributeValue");
      expect(attribute.key).to.be.equal("cost");
      expect(attribute.value).to.be.equal(10.7);
    };

    configuration.setAttributes(attributeList, { commit });
    expect(configuration.attributes.cost).to.be.equal(10.7);
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
