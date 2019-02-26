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
   * Boolean indicating whether attribute should be optimised for maximum or minimum value
   * @type {boolean}
   * @memberof Attribute
   */
  isHigherBetter?: boolean;
}


/**
 * Describes an attribute value, linking an attribute via its key to a number
 * @interface AttributeValue
 */
export interface AttributeValue {
  /**
   * Attribute key, used to identify which Attribute this refers to
   * @type {string}
   * @memberof AttributeValue
   */
  key: string;

  /**
   * Value of attribute
   * @type {number}
   * @memberof AttributeValue
   */
  value: number;
}
