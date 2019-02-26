import { Component, Vue } from "vue-property-decorator";
import { bus } from "./MessageBus";
import { Message } from "./Message";

/**
 * MessageBox UI component, used to show queued messages
 *
 * @class MessageBox
 * @extends {Vue}
 */
@Component
export default class MessageBox extends Vue {

  /**
   * List of queued messages
   * @type {Message[]}
   * @memberof MessageBox
   */
  public messages: Message[] = [];

  /**
   * Event handler for when UI element is mounted
   * @memberof MessageBox
   */
  public mounted() {
    // Subscribe to "message-add" events on the bus to listen for new messages
    bus.$on("message-add", this.add);
  }

  /**
   * Load a new message into the queue, show in UI
   * @param {Message} message Message to show
   * @memberof MessageBox
   */
  public add(message: Message) {
    if (!message.id) { message.id = Date.now(); }
    message.show = true;
    this.messages.push(message);

    // Set timer to remove message after duration has passed
    this.setTimer(message);
  }

  /**
   * Method to fade the message out of view (triggers slide-out animation)
   * @param {number} id Id of message to hide
   * @memberof MessageBox
   */
  public fadeOut(id: number) {
    const idx = this.messages.findIndex((message) => message.id === id);
    this.messages[idx].show = false;
  }

  /**
   * Method to remove message from queue
   * @param {number} id Id of message to remove
   * @memberof MessageBox
   */
  public remove(id: number) {
    const idx = this.messages.findIndex((message) => message.id === id);
    this.messages.splice(idx, 1);
  }

  /**
   * Trigger removal of the message after the duration has passed
   * @private
   * @param {Message} message Message to remove after timeout
   * @memberof MessageBox
   */
  private setTimer(message: Message) {
    // Check message has set duration
    if (!message.duration) { message.duration = 4000; }

    // Trigger fading out of message from UI
    setTimeout((id: number) => { this.fadeOut(id); }, message.duration, message.id);

    // Remove message from queue and clear DOM elements after fade out is complete
    setTimeout((id: number) => { this.remove(id); }, message.duration + 1000, message.id);
  }
}
