import _ from "lodash";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

interface Point {
  attribute: Attribute;
  value: number;
}

export class Optimality {

  public static getParetoFront(attrs: Attribute[], configs: Configuration[]): Configuration[] {
    const optimal = configs.filter((a) => {
      const betterValExists = _.find(configs, (b) => {
        if (b.id === a.id) { return false; }
        let isBetter = true;
        attrs.forEach((attr) => {
          if (attrs.length === 1 || b.attributes[attr.key] !== a.attributes[attr.key]) {
            if (attr.isHigherBetter) {
              isBetter = isBetter && b.attributes[attr.key] > a.attributes[attr.key];
            } else {
              isBetter = isBetter && b.attributes[attr.key] < a.attributes[attr.key];
            }
          }
        });
        return isBetter;
      });
      return !betterValExists;
    });
    return optimal;
  }

  public static getAttrValAtPoint(point: Point[], configurations: Configuration[],
                                  attr: Attribute): number | undefined {
    if (configurations.length === 0) { return undefined; }

    let configs = configurations.filter((c) => {
      let useConfig = true;
      point.forEach((p) => {
        if (!p.attribute.isHigherBetter) {
          useConfig = useConfig && (c.attributes[p.attribute.key] <= p.value);
        } else if (p.attribute.isHigherBetter) {
          useConfig = useConfig && (c.attributes[p.attribute.key] >= p.value);
        }
      });
      return useConfig;
    });

    configs = _.orderBy(configs, ["attributes." + attr.key], [attr.isHigherBetter ? "dsc" : "asc"]);

    return configs[0] ? configs[0].attributes[attr.key] : undefined;
  }
}
