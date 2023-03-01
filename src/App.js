import { Component } from "./core/index.js";
import {
  countStore,
  decreaseCount,
  increaseCount,
  setCount,
} from "./store/counterStore.js";

export class App {
  initState() {
    return {
      a: 10,
      b: 20,
    };
  }

  render() {
    return `
      <button id="increase">증가</button>
      <button id="decrease">감소</button>
      <input id="count-input" value=${countStore.getState().count} />
      <div>current = ${countStore.getState().count}</div>
    `;
  }

  setEvent() {
    const { $target } = this;
    const { dispatch } = countStore;

    $target?.querySelector("#increase").addEventListener("click", () => {
      dispatch(increaseCount());
    });

    $target?.querySelector("#decrease").addEventListener("click", () => {
      dispatch(decreaseCount());
    });

    $target?.querySelector("#count-input").addEventListener("change", (e) => {
      dispatch(setCount(+e.target.value));
    });
  }
}
