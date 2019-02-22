import { Component, Vue } from "vue-property-decorator";
import { bus } from "./MessageBus";
import { Message } from "./Message";

@Component
export default class MessageBox extends Vue {
  public messages: Message[] = [];

  public mounted() {
    bus.$on("message-add", this.add);
  }

  public add(message: Message) {
    if (!message.id) { message.id = Date.now(); }
    message.show = true;
    this.messages.push(message);
    this.setTimer(message);
  }

  public fadeOut(id: number) {
    const idx = this.messages.findIndex((message) => message.id === id);
    this.messages[idx].show = false;
  }

  public remove(id: number) {
    const idx = this.messages.findIndex((message) => message.id === id);
    this.messages.splice(idx, 1);
  }

  private setTimer(message: Message) {
    if (!message.duration) { message.duration = 10000; }
    setTimeout((id: number) => { this.fadeOut(id); }, message.duration, message.id);
    setTimeout((id: number) => { this.remove(id); }, message.duration + 1000, message.id);
  }
}
