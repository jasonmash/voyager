import { Attribute } from "./attribute";
import { Configuration } from "./configuration";

/**
 * Possible types of charts
 */
export enum ChartType { Scatter2D, Scatter3D, Bar, Line, Bubble }

/**
 * ChartData interface with data required for building up a chart
 */
export interface ChartData {
  attributes: Attribute[];
  values: number[];
  configs?: Configuration[];
  categories?: any[];
}
