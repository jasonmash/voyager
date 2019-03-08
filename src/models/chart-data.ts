import { Attribute } from "./attribute";

export enum ChartType { Scatter2D, Scatter3D, Bar, Line, Bubble }

export interface ChartData {
  attributes: Attribute[];
  values: number[];
}

export interface CategoryChartData extends ChartData {
  categories: any[];
}
