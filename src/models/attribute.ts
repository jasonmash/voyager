export interface Attribute {
  key: string;
  value: number;
}

export interface AttributeInfo {
  key: string;
  friendlyName: string;
  maxValue: number;
  minValue: number;
  scaleMin: number;
  scaleMax: number;
  isHigherBetter?: boolean;
}
