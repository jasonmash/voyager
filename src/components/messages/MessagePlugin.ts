import { bus } from "./MessageBus";
import { Message } from "./Message";
import MessageBox from "./MessageBox";

function addMessage(message: Message) {
  if (message.duration == null) {
    message.duration = 3000;
  }

  if (message.type == null) {
    message.type = "default";
  }

  bus.$emit("message-add", message);
}

const plugin = {
  install(Vue: any) {
    Vue.component(MessageBox.name, MessageBox);
    Vue.prototype.$message = addMessage;
  }
};

export default plugin;
