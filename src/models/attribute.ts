/**
 * Describes an attribute, includes properties but no values
 * @interface Attribute
 */
export interface Attribute {
  /**
   * Unique identifier of attribute
   * @type {string}
   * @memberof Attribute
   */
  key: string;

  /**
   * Human-friendly attribute name (calculated from key if it's camelCase)
   * @type {string}
   * @memberof Attribute
   */
  friendlyName: string;

  /**
   * Max value of this attribute seen so far
   * @type {number}
   * @memberof Attribute
   */
  maxValue: number;

  /**
   * Min value of this attribute seen so far
   * @type {number}
   * @memberof Attribute
   */
  minValue: number;

  /**
   * Min value used for graph scales
   * @type {number}
   * @memberof Attribute
   */
  scaleMin: number;

  /**
   * Max value used for graph scales
   * @type {number}
   * @memberof Attribute
   */
  scaleMax: number;

  /**
   * Increment size of attribute value (e.g. 0.1 for steps of 1, 1.1, 1.2...)
   * @type {number}
   * @memberof Attribute
   */
  step: number;

  /**
   * Boolean indicating whether attribute should be optimised for maximum or minimum value
   * @type {boolean}
   * @memberof Attribute
   */
  isHigherBetter?: boolean;

  /**
   * Boolean indicating if attribute is currently filtered
   * @type {number}
   * @memberof Attribute
   */
  isFiltered: boolean;

  /**
   * Max value of this attribute used for filter
   * @type {number}
   * @memberof Attribute
   */
  filterMaxValue: number;

  /**
   * Min value of this attribute used for filter
   * @type {number}
   * @memberof Attribute
   */
  filterMinValue: number;
}


/**
 * Describes a set of attribute values, linking an attribute via its key to a number
 * @interface AttributeValues
 */
export interface AttributeValues {
  [key: string]: number;
}
