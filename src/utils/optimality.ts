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

  public static getOptimalConfigForPoint(point: Point[], configurations: Configuration[],
                                         useWorstCase: boolean): Configuration[] {
    if (configurations.length === 0) { return []; }

    let configs = configurations.filter((c) => {
      let isPoint = true;
      point.forEach((p) => {
        isPoint = isPoint && c.attributes[p.attribute.key] === p.value;
      });
      return isPoint;
    });

    let i = 0;
    while (configs.length === 0) {
      i++;
      configs = configurations.filter((c) => {
        let isPoint = true;
        point.forEach((p) => {
          if (!useWorstCase) {
            isPoint = isPoint && (c.attributes[p.attribute.key] <= (p.value + (i * p.attribute.step))
                              && c.attributes[p.attribute.key] >= (p.value - (i * p.attribute.step)));
          } else if (!p.attribute.isHigherBetter) {
            isPoint = isPoint && (c.attributes[p.attribute.key] >= (p.value - (i * p.attribute.step)));
          } else if (p.attribute.isHigherBetter) {
            isPoint = isPoint && (c.attributes[p.attribute.key] <= (p.value + (i * p.attribute.step)));
          }
        });
        return isPoint;
      });
    }

    const attributes = point.map((p) => p.attribute);

    let optimalConfigs = this.getParetoFront(attributes, configs);
    while (optimalConfigs.length === 0) {
      i++;
      configs = configurations.filter((c) => {
        let isPoint = true;
        point.forEach((p) => {
          if (!useWorstCase) {
            isPoint = isPoint && (c.attributes[p.attribute.key] <= (p.value + (i * p.attribute.step))
                              && c.attributes[p.attribute.key] >= (p.value - (i * p.attribute.step)));
          } else if (!p.attribute.isHigherBetter) {
            isPoint = isPoint && (c.attributes[p.attribute.key] >= (p.value - (i * p.attribute.step)));
          } else if (p.attribute.isHigherBetter) {
            isPoint = isPoint && (c.attributes[p.attribute.key] <= (p.value + (i * p.attribute.step)));
          }
        });
        return isPoint;
      });
      optimalConfigs = this.getParetoFront(attributes, configs);
    }
    return optimalConfigs;
  }
}
