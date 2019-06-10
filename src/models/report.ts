import { ChartType, ChartData } from "./chart-data";

/**
 * Represents a report
 */
export interface Report {
  /**
   * Identifier for report
   * @type {number}
   * @memberof Report
   */
  id: number;

  /**
   * Name of report
   * @type {string}
   * @memberof Report
   */
  name: string;

  /**
   * Included report sections
   * @type {Section[]}
   * @memberof Report
   */
  sections: Section[];
}

/**
 * Represents a section of a report
 */
export interface Section {
  /**
   * Section title
   * @type {string}
   * @memberof Section
   */
  title: string;

  /**
   * Section type
   * @type {ChartType}
   * @memberof Section
   */
  type: ChartType;

  /**
   * Chart data
   * @type {ChartData | null}
   * @memberof Section
   */
  data: ChartData | null;
}
