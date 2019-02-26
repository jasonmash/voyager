import Vue from "vue";
import { Message } from "./messages/Message";

// Add $message object to Vue typing to help during development
declare module "vue/types/vue" {
  interface Vue {
    $message: (message: Message) => void;
  }
}