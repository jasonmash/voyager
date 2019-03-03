import { Attribute } from "./attribute";

export enum ChartType { Scatter2D, Scatter3D, Bar, Line, Bubble }

export interface ChartData {
  attributes: Attribute[];
}

export interface BarChartData extends ChartData {
  categories: number[];
  values: number[];
}

export interface LineChartData extends ChartData {
  categories: number[];
  values: number[];
}

export interface Scatter2DChartData extends ChartData {
  configurations: string[];
  values: number[][];
}

export interface Scatter3DChartData extends ChartData {
  values: number[][];
}
