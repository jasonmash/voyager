import Vue from "vue";
import { Message } from "./messages/Message";

declare module "vue/types/vue" {
  interface Vue {
    $message: (message: Message) => void;
  }
}