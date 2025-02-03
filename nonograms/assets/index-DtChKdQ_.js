var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _children, _node;
class Component {
  constructor({ tag = "div", className = "" }, ...children) {
    __privateAdd(this, _children, []);
    __privateAdd(this, _node, null);
    const node = document.createElement(tag);
    node.className = className;
    __privateSet(this, _node, node);
    if (children) {
      this.appendChildren(children);
    }
  }
  append(child) {
    __privateGet(this, _children).push(child);
    __privateGet(this, _node).append(child.getNode());
  }
  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }
  getNode() {
    return __privateGet(this, _node);
  }
  getChildren() {
    return __privateGet(this, _children);
  }
  querySelector(selector) {
    return __privateGet(this, _node).querySelector(selector);
  }
  setTextContent(content) {
    __privateGet(this, _node).textContent = content;
  }
  setAttribute(attribute, value) {
    __privateGet(this, _node).setAttribute(attribute, value);
  }
  getAttribute(attribute) {
    return __privateGet(this, _node).getAttribute(attribute);
  }
  removeAttribute(attribute) {
    __privateGet(this, _node).removeAttribute(attribute);
  }
  setVisible(visible) {
    if (visible) {
      __privateGet(this, _node).classList.remove("visually-hidden");
    } else {
      __privateGet(this, _node).classList.add("visually-hidden");
    }
  }
  toggleClass(className) {
    __privateGet(this, _node).classList.toggle(className);
  }
  addClass(className) {
    __privateGet(this, _node).classList.add(className);
  }
  removeClass(className) {
    __privateGet(this, _node).classList.remove(className);
  }
  checkClass(className) {
    return __privateGet(this, _node).classList.contains(className);
  }
  addListener(event, listener, options = false) {
    __privateGet(this, _node).addEventListener(event, listener, options);
  }
  removeListener(event, listener, options = false) {
    __privateGet(this, _node).removeEventListener(event, listener, options);
  }
  setDisabled(disabled) {
    __privateGet(this, _node).disabled = disabled;
  }
  destroyChildren() {
    __privateGet(this, _children).forEach((child) => {
      child.destroy();
    });
    __privateGet(this, _children).length = 0;
  }
  destroy() {
    this.destroyChildren();
    __privateGet(this, _node).remove();
  }
}
_children = new WeakMap();
_node = new WeakMap();
class Button extends Component {
  constructor(cn, text, listener) {
    super({ tag: "button", className: `button ${cn}` });
    this.setTextContent(text);
    this.setAttribute("type", "button");
    this.addListener("click", listener);
  }
}
class Header extends Component {
  constructor() {
    super({ tag: "header", className: "header" });
    this.title = new Component({ tag: "h1", className: "title" });
    this.title.setTextContent("nonograms");
    this.theme = new Button("theme ", "theme", () => {
      this.handleThemeChange();
    });
    this.volume = new Button("volume ", "", () => {
      this.handleVolume();
    });
    this.wrapper = new Component({ tag: "div", className: "controls-header" });
    this.wrapper.appendChildren([this.volume, this.theme]);
    this.leaderboard = new Button("leaderboard", "leaderboard", () => {
      this.handleLeaderboardOpen();
    });
    this.rules = new Button("rules", "rules", () => {
      this.handleRulesOpen();
    });
    this.controls = new Component({ tag: "div", className: "controls" });
    this.setup = new Button("setup", "setup game", () => {
      this.handleSetupOpen();
    });
    this.controls.appendChildren([
      this.wrapper,
      this.setup,
      this.leaderboard,
      this.rules
    ]);
    this.appendChildren([this.title, this.controls]);
    this.handlers = {
      onRulesOpen: null,
      onLeaderboardOpen: null,
      onSetupOpen: null
    };
  }
  setHandlers(handlers) {
    this.handlers = { ...this.handlers, ...handlers };
  }
  handleRulesOpen() {
    if (this.handlers.onRulesOpen) {
      this.handlers.onRulesOpen();
    } else {
      console.log("something is wrong with rules handler");
    }
  }
  handleLeaderboardOpen() {
    if (this.handlers.onLeaderboardOpen) {
      this.handlers.onLeaderboardOpen();
    } else {
      console.log("something is wrong with leaderboard handler");
    }
  }
  handleSetupOpen() {
    if (this.handlers.onSetupOpen) {
      this.handlers.onSetupOpen();
    } else {
      console.log("something is wrong with setup handler");
    }
  }
  handleThemeChange() {
    const setTheme = (theme) => {
      document.body.classList.remove("dark", "light");
      document.body.classList.add(theme);
    };
    if (document.body.classList.contains("light")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  handleVolume() {
    this.volume.toggleClass("active");
    console.log("toggled volume");
  }
}
class Info extends Component {
  constructor() {
    super({ tag: "div", className: "info" });
    this.text = new Component({ tag: "p", className: "info-text" });
    this.timer = new Component({ tag: "div", className: "info-timer" });
    this.text.setTextContent("hihi");
    this.timer.setTextContent("00:21");
    this.appendChildren([this.text, this.timer]);
  }
  startTimer() {
  }
}
class Main extends Component {
  constructor() {
    super({ tag: "main", className: "main" });
    this.start = new Button("start", "start game", () => {
    });
    this.restart = new Button("restart", "restart game", () => {
    });
    this.load = new Button("load", "load previous game", () => {
    });
    this.save = new Button("save", "save game", () => {
    });
    this.wrapper = new Component({ tag: "div", className: "controls-main" });
    this.wrapper.appendChildren([
      this.start,
      this.restart,
      this.load,
      this.save
    ]);
    this.info = new Info();
    this.initialButtonState();
    this.appendChildren([this.wrapper, this.info]);
  }
  initialButtonState() {
    this.checkLoadings();
    this.start.setVisible(true);
    this.restart.setVisible(false);
    this.load.setVisible(true);
    this.save.setVisible(false);
  }
  checkLoadings() {
    this.load.setDisabled(true);
  }
}
class View extends Component {
  constructor() {
    super({ tag: "div", className: "page " });
    this.grid = null;
    this.header = new Header();
    this.main = new Main();
    this.appendChildren([this.header, this.main]);
  }
  setGrid(grid) {
    this.main.append(grid);
  }
  render() {
    document.body.appendChild(this.getNode());
  }
}
const matrix = {
  easy: {
    dino: [
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 0]
    ],
    heart: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0]
    ],
    rabbit: [
      [0, 0, 1, 0, 1],
      [0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1]
    ],
    chicken: [
      [0, 1, 0, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0]
    ],
    camel: [
      [0, 0, 0, 1, 1],
      [1, 1, 0, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0]
    ]
  },
  medium: {
    cup: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    spider: [
      [0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
      [0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0]
    ],
    snowman: [
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 1, 1]
    ],
    cat: [
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 1]
    ],
    kettle: [
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    hamster: [
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    ],
    crab: [
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
      [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1]
    ]
  },
  hard: {
    mikki: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ],
    man: [
      [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    ],
    portrait: [
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
      [1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
      [1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0]
    ],
    camera: [
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ],
    elephant: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
      [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }
};
class AppData {
  constructor() {
    this.allTemplates = matrix;
    this.size = 5;
    this.currentTemplate = null;
    this.difficulty = "easy";
    this.isStarted = false;
  }
  getAllTemplates() {
    return this.allTemplates;
  }
  saveInLS() {
  }
  setTemplate(template) {
    this.currentTemplate = template;
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }
  setRandom() {
  }
  getFromLS() {
  }
  checkGrid() {
  }
  setWinner() {
  }
}
let isMouseDown = false;
let current = null;
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  current = null;
});
class Cell extends Component {
  constructor(x, y, size) {
    super({ tag: "button", className: "cell" });
    this.row = x;
    this.column = y;
    this.fieldSize = size;
    this.setAttribute("data-row", this.row);
    this.setAttribute("data-column", this.column);
    this.setEdges();
    this.addListener("contextmenu", (e) => e.preventDefault());
    this.addListener("mousedown", (e) => this.handleMouseDown(e));
    this.addListener("mouseenter", (e) => this.handleMouseEnter(e));
  }
  setEdges() {
    if ((this.row + 1) % 5 === 0) {
      !(this.row + 1 === this.fieldSize) && this.addClass("bottom");
    }
    if ((this.column + 1) % 5 === 0) {
      !(this.column + 1 === this.fieldSize) && this.addClass("right");
    }
  }
  handleMouseDown(e) {
    e.preventDefault();
    isMouseDown = true;
    if (e.button === 0) {
      this.handleLeftClick();
    } else if (e.button === 2) {
      this.handleRightClick();
    }
  }
  handleMouseEnter(e) {
    if (isMouseDown && current) {
      if (current === "set-marked") {
        this.addMarked();
      } else if (current === "set-choosen") {
        this.addChoosen();
      } else if (current === "remove-marked") {
        this.removeMarked();
      } else if (current === "remove-choosen") {
        this.removeChoosen();
      }
    }
  }
  handleLeftClick() {
    if (this.checkClass("choosen")) {
      this.removeChoosen();
      current = "remove-choosen";
    } else {
      this.addChoosen();
      current = "set-choosen";
    }
  }
  handleRightClick() {
    if (this.checkClass("marked")) {
      this.removeMarked();
      current = "remove-marked";
    } else {
      this.addMarked();
      current = "set-marked";
    }
  }
  addMarked() {
    if (this.checkClass("choosen")) {
      return;
    }
    if (!this.checkClass("marked")) {
      this.addClass("marked");
      const cross = new Component({ tag: "div", className: "cross" });
      this.append(cross);
    }
  }
  removeMarked() {
    if (this.checkClass("marked")) {
      this.removeClass("marked");
      this.destroyChildren();
    }
  }
  addChoosen() {
    if (this.checkClass("marked")) {
      this.removeMarked();
    }
    this.addClass("choosen");
  }
  removeChoosen() {
    this.removeClass("choosen");
  }
}
class Field extends Component {
  constructor(size) {
    super({
      tag: "div",
      className: `field ${size === 5 ? "field-5" : size === 10 ? "field-10" : "field-15"}`
    });
    this._size = size;
    this.destroyChildren();
    this.createField();
  }
  set size(newSize) {
    this._size = newSize;
  }
  get size() {
    return this._size;
  }
  createField() {
    for (let i = 0; i < this.size * this.size; i++) {
      const row = Math.floor(i / this.size);
      const column = i % this.size;
      const cell = new Cell(row, column, this.size);
      this.append(cell);
    }
  }
}
class Hints extends Component {
  constructor(type) {
    super({
      tag: "div",
      className: `${type === "column" ? "top-columns" : type === "row" ? "left-rows" : "filler"}`
    });
    this.type = type;
  }
  createHints(data) {
    if (this.type === "filler") return;
    for (let i = 0; i < data.length; i++) {
      const cell = new InfoCell(this.type, i);
      if (data[i]) {
        cell.setHints(data[i]);
      }
      this.append(cell);
    }
  }
}
class InfoCell extends Component {
  constructor(type, i) {
    super({ tag: "div", className: "cell-info" });
    this.setAttribute("data-type", type);
    this.setAttribute("data-i", i);
  }
  setHints(hints) {
    for (let number of hints) {
      const hint = new Component({ tag: "span", className: "hint" });
      hint.setTextContent(number);
      hint.addListener("click", () => hint.toggleClass("marked"));
      this.append(hint);
    }
  }
}
function calculateRowHints(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let sum = 0;
    let res = [];
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 1) {
        sum += 1;
      } else if (sum > 0) {
        res.push(sum);
        sum = 0;
      }
    }
    if (sum > 0) {
      res.push(sum);
    }
    result.push(res);
  }
  return result;
}
function calculateColumnHints(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let sum = 0;
    let res = [];
    for (let j = 0; j < array[i].length; j++) {
      if (array[j][i] === 1) {
        sum += 1;
      } else if (sum > 0) {
        res.push(sum);
        sum = 0;
      }
    }
    if (sum > 0) {
      res.push(sum);
    }
    result.push(res);
  }
  return result;
}
class Grid extends Component {
  constructor(size) {
    super({ tag: "div", className: "grid-wrapper" });
    this.grid = new Component({ tag: "div", className: "grid" });
    this.size = size;
    this.field = new Field(size);
    this.filler = new Hints("filler");
    this.columnHints = new Hints("column");
    this.rowHints = new Hints("row");
    this.mock = [
      [0, 0, 1, 0, 1],
      [0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1]
    ];
    this.setRowHints();
    this.setColumnHints();
    this.grid.appendChildren([
      this.filler,
      this.columnHints,
      this.rowHints,
      this.field
    ]);
    this.append(this.grid);
  }
  setRowHints() {
    const data = calculateRowHints(this.mock);
    this.rowHints.createHints(data);
  }
  setColumnHints() {
    const data = calculateColumnHints(this.mock);
    this.columnHints.createHints(data);
  }
}
class DifficultyFieldset extends Component {
  constructor(levels) {
    super({
      tag: "fieldset",
      className: "difficulty-field"
    });
    this.levels = levels;
    this.legend = new Component({ tag: "legend" });
    this.legend.setTextContent("Select difficulty:");
    this.append(this.legend);
    this.levels.forEach((diff) => {
      this.input = new Component({
        tag: "input",
        className: "difficulty-input"
      });
      this.input.setAttribute("name", "difficulty");
      this.input.setAttribute("type", "radio");
      this.input.setAttribute("value", diff);
      this.input.setAttribute("id", diff);
      this.label = new Component({
        tag: "label",
        className: "difficulty-label"
      });
      this.label.setTextContent(diff);
      this.label.setAttribute("for", diff);
      if (diff === "easy") {
        this.input.getNode().checked = true;
      }
      this.appendChildren([this.input, this.label]);
    });
  }
  setActive(diff) {
    this.querySelector(`#${diff}`).checked = true;
  }
}
class TemplateFieldset extends Component {
  constructor(options = []) {
    super({
      tag: "fieldset",
      className: "template-field"
    });
    this.options = options;
    this.templateLabel = new Component({ tag: "label" });
    this.templateLabel.setAttribute("for", "templates");
    this.legend = new Component({ tag: "legend" });
    this.legend.setTextContent("Select a template:");
    this.append(this.legend);
    this.select = new Component({
      tag: "select",
      className: "select"
    });
    this.select.setAttribute("id", "templates");
    this.select.setAttribute("name", "templates");
    this.setTemplates(options);
  }
  setSelectedTemplate(template) {
    const select = this.querySelector("select");
    if (select) {
      select.value = template;
    }
  }
  setTemplates(options) {
    this.destroyChildren();
    this.append(this.legend);
    options.forEach((item) => {
      this.option = new Component({ tag: "option", className: "option" });
      this.option.setTextContent(item);
      this.option.setAttribute("value", item);
      this.select.append(this.option);
    });
    this.templateLabel.append(this.select);
    this.append(this.templateLabel);
  }
}
class Form extends Component {
  constructor() {
    var _a;
    super({ tag: "div", className: "aside-content" });
    this.levels = ["easy", "medium", "hard"];
    this.templatess = {};
    this.difficulty = "easy";
    this.title = new Component({ tag: "h2", className: "aside-title" });
    this.title.setTextContent("Settings");
    this.templateFieldset = new TemplateFieldset();
    this.difficultyFieldset = new DifficultyFieldset(this.levels);
    this.difficultyFieldset.addListener("change", (e) => {
      this.difficulty = e.target.value;
      this.templateFieldset.setTemplates(this.templatess[this.difficulty]);
    });
    this.randomButton = new Button("random", "randomize template", () => {
      this.handleRandomizer();
    });
    this.submit = new Button(
      "submit",
      "submit settings",
      () => this.handleFormSubmit()
    );
    this.submit.setAttribute("type", "submit");
    this.appendChildren([
      this.title,
      this.templateFieldset,
      this.difficultyFieldset,
      this.randomButton,
      this.submit
    ]);
    this.formData = {
      template: this.templateFieldset.querySelector("select").value,
      difficulty: (_a = this.difficultyFieldset.querySelector("input:checked")) == null ? void 0 : _a.value
    };
  }
  extractFromMatrix(matrix2) {
    for (const difficulty in matrix2) {
      const names = Object.keys(matrix2[difficulty]);
      this.templatess[difficulty] = names;
    }
    this.setInitialFormData();
  }
  setInitialFormData() {
    this.templateFieldset.setTemplates(this.templatess[this.difficulty]);
  }
  handleFormSubmit() {
    var _a;
    const formData = {
      template: this.templateFieldset.querySelector("select").value,
      difficulty: (_a = this.difficultyFieldset.querySelector("input:checked")) == null ? void 0 : _a.value
    };
    console.log("sent form data:");
    console.log(formData);
  }
  handleRandomizer() {
    const randomDifficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
    const templates = this.templatess[randomDifficulty];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    this.setActiveDifficulty(randomDifficulty);
    this.templateFieldset.setTemplates(templates);
    this.templateFieldset.setSelectedTemplate(randomTemplate);
    this.formData = {
      template: randomTemplate,
      difficulty: randomDifficulty
    };
    console.log("randomized:", this.formData);
  }
  setActiveDifficulty(diff) {
    this.difficultyFieldset.setActive(diff);
  }
}
class Aside extends Component {
  constructor(name, children) {
    super({
      tag: "aside",
      className: "aside "
    });
    this.append(children);
    this.name = name;
    this.button = new Button(
      `aside-button ${this.name}`,
      `${this.name}`,
      () => this.toggleAside()
    );
    this.overlay = new Component({ tag: "div", className: "overlay" });
    this.overlay.setVisible(false);
    this.overlay.addListener("click", () => {
      this.closeAside();
    });
    document.body.append(this.overlay.getNode());
    document.body.append(this.button.getNode());
    document.body.append(this.getNode());
  }
  closeAside() {
    this.button.setTextContent(this.name);
    this.button.removeClass("open");
    this.overlay.setVisible(false);
    this.removeClass("open");
  }
  openAside() {
    this.button.setTextContent("close");
    this.button.addClass("open");
    this.overlay.setVisible(true);
    this.addClass("open");
  }
  toggleAside() {
    if (!this.checkClass("open")) {
      this.openAside();
    } else {
      this.closeAside();
    }
  }
}
const rules = `Nonograms is a puzzle game to reveal a hidden picture by looking at the number clues.
The clues are given at the top and left side of the grid. Each number in these clue defines a block of black cell.
A number indicates an unbroken line of black cells, and they are in the same order as the lines.
These puzzles are often black and white—describing a binary image—but they can also be colored.`;
class Rules extends Component {
  constructor() {
    super({ tag: "div", className: "aside-content" });
    this.title = new Component({ tag: "h2", className: "" });
    this.title.setTextContent("what is this game?");
    this.text = new Component({ tag: "p", className: "rules-text" });
    this.text.setTextContent(rules);
    this.appendChildren([this.title, this.text]);
  }
}
const mock = [
  {
    template: "cat",
    difficulty: "hard",
    time: 110
  },
  {
    template: "cat",
    difficulty: "hard",
    time: 120
  },
  {
    template: "dog",
    difficulty: "easy",
    time: 40
  }
];
class Leaderboard extends Component {
  constructor() {
    super({ tag: "div", className: "aside-content" });
    this.title = new Component({ tag: "h2", className: "aside-title" });
    this.title.setTextContent("Leaderboard");
    this.list = new Component({ tag: "ul", className: "leaderboard-list" });
    this.appendChildren([this.title, this.list]);
    this.createList(mock);
    this.setLeaderboardList();
  }
  setLeaderboardList() {
    if (localStorage.getItem("nono-leaderboard")) {
      console.log("not empty");
      return [];
    } else {
      console.log("empty");
    }
  }
  createList(data) {
    data.sort((a, b) => {
      return a.time - b.time;
    }).forEach((result, index) => {
      const element = new Component({
        tag: "li",
        className: "leaderboard-list-item"
      });
      element.setTextContent(
        `${index + 1}: ${result.template} - ${result.difficulty} - ${Math.floor(result.time / 60)}:${String(result.time % 60).padStart(2, "0")} - ${(/* @__PURE__ */ new Date()).toLocaleDateString()} `
      );
      this.list.append(element);
    });
  }
}
class Connector {
  constructor() {
    this.view = new View();
    this.model = new AppData();
    this.grid = new Grid(5);
    this.form = new Form();
    this.asideForm = new Aside("form", this.form);
    this.leaderboard = new Leaderboard();
    this.asideLeaderboard = new Aside("leaderboard", this.leaderboard);
    this.rules = new Rules();
    this.asideRules = new Aside("rules", this.rules);
    this.view.header.setHandlers({
      onRulesOpen: this.handleRulesOpen.bind(this),
      onLeaderboardOpen: this.handleLeaderboardOpen.bind(this),
      onSetupOpen: this.handleSetupOpen.bind(this)
    });
  }
  setAllTemplates() {
    const templates = this.model.getAllTemplates();
    this.form.extractFromMatrix(templates);
  }
  setGridSize(size) {
    this.grid = new Grid(size);
  }
  handleSubmitForm() {
    this.asideForm.closeAside();
  }
  handleRulesOpen() {
    this.asideRules.openAside();
  }
  handleLeaderboardOpen() {
    this.asideLeaderboard.openAside();
  }
  handleSetupOpen() {
    this.asideForm.openAside();
  }
  render() {
    this.view.setGrid(this.grid);
    this.view.render();
  }
  init() {
    this.setAllTemplates();
  }
}
const connector = new Connector();
connector.render();
connector.init();
//# sourceMappingURL=index-DtChKdQ_.js.map
