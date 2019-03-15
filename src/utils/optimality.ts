import _ from "lodash";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

/**
 * Represents a point to find optimal configuration at
 */
interface Point {
  attribute: Attribute; // Attribute for point
  value: number; // Value of attribute at point
}

export class Optimality {

  /**
   * Get list of configurations forming the pareto front of a set of configurations
   * @param attrs Attributes to optimise for
   * @param configs Configurations to use
   */
  public static getParetoFront(attrs: Attribute[], configs: Configuration[]): Configuration[] {
    const optimal = configs.filter((a) => {
      // Config is optimal if a better configuration doesn't exist
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

  /**
   * Find value of attribute for a given point
   * @param points Array of points, including the value and the attribute the value is for
   * @param configurations List of configurations to use
   * @param attribute Return value attribute
   */
  public static getAttrValAtPoint(points: Point[], configurations: Configuration[],
                                  attribute: Attribute): number | undefined {
    if (configurations.length === 0) { return undefined; }

    let configs = configurations.filter((c) => {
      let useConfig = true;
      // Loop through each point, include configuration if all constraints matched
      points.forEach((p) => {
        if (!p.attribute.isHigherBetter) {
          useConfig = useConfig && (c.attributes[p.attribute.key] <= p.value);
        } else if (p.attribute.isHigherBetter) {
          useConfig = useConfig && (c.attributes[p.attribute.key] >= p.value);
        }
      });
      return useConfig;
    });

    // Order possible configuration by desired attribute value (e.g. lower is better)
    configs = _.orderBy(configs, ["attributes." + attribute.key], [attribute.isHigherBetter ? "dsc" : "asc"]);

    // Return optimal value at specified attribute if one exists
    return configs[0] ? configs[0].attributes[attribute.key] : undefined;
  }
}
