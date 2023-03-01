// import { App } from "./src/App.js";
import { mounted, render, useState } from "./src/core/index.js";

// new App(document.querySelector("#app"));

render(document.querySelector("#app"), () => {
  const [count, setCount] = useState(42);
  const [obj, setObj] = useState({ b: "1234" });

  return `
  <div>
    helloWorld ${count}
    ${IncreaseButton({ count, setCount })}
  </div>
  `;
});

const IncreaseButton = ({ ...props }) => {
  const onClickButton = () => {
    props.setCount(props.count + 1);
  };

  mounted(() => {
    document
      .querySelector("#increase-btn")
      .addEventListener("click", onClickButton);
  });

  return `
  <div>
    <div>
      <button id="increase-btn">increase</button>
      ${decreaseButton(props)}
    </div>
  </div>
  `;
};

const decreaseButton = ({ ...props }) => {
  const onClickButton = () => {
    props.setCount(props.count - 1);
  };

  mounted(() => {
    document
      .querySelector("#decrease-btn")
      ?.addEventListener("click", onClickButton);
  });

  return `
    <button id="decrease-btn">decrease</button>
  `;
};
