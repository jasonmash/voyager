/**
 * Represents a notification message
 * @interface Message
 */
export interface Message {
  /**
   * Text content of message
   * @type {string}
   * @memberof Message
   */
  content: string;

  /**
   * Duration for message to appear on screen (ms)
   * @type {number}
   * @memberof Message
   */
  duration?: number;

  /**
   * Type of message
   * @type {string} Options: ['primary', 'secondary', 'info', 'danger', 'warning', 'success', 'light', 'dark']
   * @memberof Message
   */
  type?: string;

  /**
   * Unique identifier of message
   * @type {number}
   * @memberof Message
   */
  id?: number;

  /**
   * Boolean indicating whether message is visible
   * @type {boolean}
   * @memberof Message
   */
  show?: boolean;
}
