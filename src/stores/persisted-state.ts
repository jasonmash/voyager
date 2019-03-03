/*
  Modified from https://github.com/robinvdvleuten/vuex-persistedstate

  MIT License

  Copyright (c) 2016-2019 Robin van der Vleuten <robin@webstronauts.co>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

import merge from "deepmerge";
import * as shvl from "shvl";
import { Configuration } from "@/models/configuration";

export default function(options?: any, storage?: any, key?: any) {
  options = options || {};
  storage = options.storage || (window && window.localStorage);
  key = options.key || "vuex";

  function canWriteStorage(store: any) {
    try {
      store.setItem("@@", 1);
      store.removeItem("@@");
      return true;
    // tslint:disable-next-line:no-empty
    } catch (e) {}

    return false;
  }

  function getState(storeKey: any, store: any, value: any) {
    try {
      // tslint:disable-next-line:no-conditional-assignment
      return (value = store.getItem(storeKey)) && typeof value !== "undefined"
        ? JSON.parse(value)
        : undefined;
    // tslint:disable-next-line:no-empty
    } catch (err) {}

    return undefined;
  }

  function filter() {
    return true;
  }

  function setState(storeKey: any, state: any, store: any) {
    return store.setItem(storeKey, JSON.stringify(state));
  }

  function reducer(state: any, paths: any) {
    return paths.length === 0
      ? state
      : paths.reduce((substate: any, path: any) => {
          return shvl.set(substate, path);
        }, {});
  }

  function subscriber(store: any) {
    return (handler: any) => {
      return store.subscribe(handler);
    };
  }

  if (!canWriteStorage(storage)) {
    throw new Error("Invalid storage instance given");
  }

  return (store: any) => {
    const savedState = shvl.get(options, "getState", getState)(key, storage);

    if (typeof savedState === "object" && savedState !== null) {
      const newState = savedState;
      newState.configurations.data = savedState.configurations.data.map((c: any) => new Configuration(c));

      store.replaceState(merge(store.state, savedState, {
        arrayMerge: options.arrayMerger || ((s: any, saved: any) => saved),
        clone: false
      }));
    }

    (options.subscriber || subscriber)(store)((mutation: any, state: any) => {
      if ((options.filter || filter)(mutation)) {
        (options.setState || setState)(
          key,
          (options.reducer || reducer)(state, options.paths || []),
          storage
        );
      }
    });
  };
}
