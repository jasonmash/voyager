import { expect } from "chai";

import { AttributeValue, Attribute } from "@/models/attribute";

import { attributes } from "@/stores/attributes";

describe("Store: Attributes", () => {
  it("Mutation: processAttributeValue", () => {
    // mock state
    const existing: Attribute = {
      key: "attributeKey",
      maxValue: 10,
      minValue: 5,
      scaleMax: 10,
      scaleMin: 4,
      friendlyName: "Attribute Key"
    };
    const state = { data: [existing] };

    // Process new attribute with lowest value so far
    const newAttribute1: AttributeValue = { key: "attributeKey", value: 2 };
    attributes.mutations.processAttributeValue(state, newAttribute1);

    expect(state.data[0].minValue).to.equal(2);
    expect(state.data[0].scaleMin).to.equal(2);
    expect(state.data[0].maxValue).to.equal(10);
    expect(state.data[0].scaleMax).to.equal(10);

    // Process new attribute with highest value so far
    const newAttribute2: AttributeValue = { key: "attributeKey", value: 11 };
    attributes.mutations.processAttributeValue(state, newAttribute2);

    expect(state.data[0].minValue).to.equal(2);
    expect(state.data[0].scaleMin).to.equal(2);
    expect(state.data[0].maxValue).to.equal(11);
    expect(state.data[0].scaleMax).to.equal(11);

    // Process new attribute where key doesn't exist
    const newAttribute3: AttributeValue = { key: "newAttributeKey", value: 5 };
    attributes.mutations.processAttributeValue(state, newAttribute3);

    expect(state.data.length).to.equal(2);
    expect(state.data[1].friendlyName).to.equal("New Attribute Key");
  });

  it("Getter: attributes", () => {
    // mock state
    const existing: Attribute = {
      key: "attributeKey",
      maxValue: 10,
      minValue: 5,
      scaleMax: 10,
      scaleMin: 4,
      friendlyName: "Attribute Key"
    };
    const state = { data: [existing] };

    // use getter
    const result: Attribute[] = attributes.getters.attributes(state, null, null, null);

    // assert result
    expect(result.length).to.equal(1);
    expect(result[0].key).to.equal("attributeKey");
    expect(result[0].friendlyName).to.equal("Attribute Key");
    expect(result[0].minValue).to.equal(5);
    expect(result[0].maxValue).to.equal(10);
    expect(result[0].scaleMin).to.equal(4);
    expect(result[0].scaleMax).to.equal(10);
  });
});
