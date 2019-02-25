import Vue from "vue";
import Component from "vue-class-component";

import { Attribute, AttributeInfo } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

@Component
export default class DetailsComponent extends Vue {
  get value(): Configuration {
    return this.$store.getters.configurations.find((v: Configuration) => v.id === this.$route.params.pathMatch);
  }

  get attributeInfo(): AttributeInfo[] {
    return this.$store.getters.attributes;
  }

  public deleteConfiguration(): void {
    if (confirm("Are you sure you wish to delete this configuration?")) {
      this.$store.commit("deleteConfiguration", this.value);
    }
  }

  public getAttrFriendlyName(key: string): string {
    const info = this.attributeInfo.find((i) => i.key === key);
    return info ? info.friendlyName : key;
  }

  get radarData() {
    const configuration = this.value;
    const data: any[] = [];

    configuration.attributes.forEach((a: Attribute) => {
      const info = this.attributeInfo.find((i) => i.key === a.key);
      if (info) {
        data.push({ name: info.friendlyName, min: info.minValue, max: info.maxValue, value: a.value });
      }
    });

    return {
      tooltip: {},
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        color: "black"
      },
      radar: {
        indicator: data.map(({ name, min, max }) => {
          return { name, min, max };
        })
      },
      series: [
        {
          name: configuration.id,
          type: "radar",
          data: [{ value: data.map(({ value }) => value) }]
        }
      ]
    };
  }
}
