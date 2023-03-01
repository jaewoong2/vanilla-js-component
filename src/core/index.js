const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

function deepCopy(obj) {
  let copy;

  // 배열일 경우
  if (Array.isArray(obj)) {
    copy = obj.map((item) => deepCopy(item));
  }
  // 객체일 경우
  else if (typeof obj === "object" && obj !== null) {
    copy = {};
    Object.keys(obj).forEach((key) => {
      copy[key] = deepCopy(obj[key]);
    });
  }
  // 원시 타입일 경우
  else {
    copy = obj;
  }

  return copy;
}

function component() {
  const options = {
    currentStateKey: 0,
    afterMount: {},
    states: [],
    parent: null,
    mountedCount: 0,
    component: null,
  };

  function useState(initState) {
    const { currentStateKey: key, states } = options;

    if (states.length === key) states.push(deepCopy(initState));

    const state = states[key];

    const setState = (newState) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;
      states[key] = deepCopy(newState);
      _render();
    };

    options.currentStateKey += 1;
    return [state, setState];
  }

  const _render = debounceFrame(() => {
    const { parent, component } = options;
    if (!parent || !component) return;
    console.log("render");
    options.currentStateKey = 0;
    parent.innerHTML = component();
    Object.keys(options.afterMount).forEach((key) => {
      options.afterMount[key]();
    });
  });

  function render(parent, component) {
    options.renderCount += 1;
    options.parent = parent;
    options.component = component;
    _render();
  }

  function mounted(cb) {
    options.afterMount[cb.toString()] = cb;
  }

  return {
    useState,
    render,
    mounted,
  };
}

export const { render, useState, mounted } = component();
