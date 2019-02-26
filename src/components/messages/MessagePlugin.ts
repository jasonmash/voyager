import { bus } from "./MessageBus";
import { Message } from "./Message";
import MessageBox from "./MessageBox";

/**
 * Function to add a new message to the UI
 *
 * Usage (from any Vue component): this.$message(message: Message);
 *
 * @param {Message} message Message to show
 */
function addMessage(message: Message) {
  if (message.duration == null) {
    message.duration = 3000;
  }

  if (message.type == null) {
    message.type = "default";
  }

  bus.$emit("message-add", message);
}

/**
 * Plugin to Vue, allows components to access this.$message
 */
const plugin = {
  install(Vue: any) {
    Vue.component(MessageBox.name, MessageBox);
    Vue.prototype.$message = addMessage;
  }
};

export default plugin;
