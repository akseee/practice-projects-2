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
    this.volume = new Button("volume active", "", () => {
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
      this.setup,
      this.wrapper,
      this.leaderboard,
      this.rules
    ]);
    this.appendChildren([this.title, this.controls]);
    this.handlers = {
      onRulesOpen: null,
      onLeaderboardOpen: null,
      onSetupOpen: null,
      onVolumeToggle: null
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
    if (this.handlers.onVolumeToggle) {
      if (this.volume.checkClass("active")) {
        this.handlers.onVolumeToggle(false);
      } else {
        this.handlers.onVolumeToggle(true);
      }
    } else {
      console.log("something is wrong with volume handler");
    }
  }
}
class Info extends Component {
  constructor() {
    super({ tag: "div", className: "info" });
    this.text = new Component({ tag: "p", className: "info-text" });
    this.timer = new Component({ tag: "div", className: "info-timer" });
    this.text.setTextContent("");
    this.timer.setTextContent("00:00");
    this.appendChildren([this.timer]);
    this.seconds = 0;
    this.intervalId = null;
  }
  getTime() {
    return this.seconds;
  }
  startTimer() {
    if (this.intervalId !== null) return;
    this.timer.addClass("active");
    this.intervalId = setInterval(() => {
      this.seconds++;
      const minutes = Math.floor(this.seconds / 60);
      const secs = this.seconds % 60;
      const timeString = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      this.timer.setTextContent(timeString);
    }, 1e3);
  }
  stopTimer() {
    this.timer.removeClass("active");
    if (this.intervalId === null) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  resetTimer() {
    this.timer.removeClass("active");
    this.stopTimer();
    this.seconds = 0;
    this.timer.setTextContent("00:00");
  }
}
class Main extends Component {
  constructor() {
    super({ tag: "main", className: "main" });
    this.restart = new Button(
      "restart",
      "restart game",
      () => this.handelRestart()
    );
    this.load = new Button(
      "load",
      "load last saved game",
      () => this.handleLoad()
    );
    this.save = new Button("save", "save game", () => this.handleSave());
    this.solution = new Button(
      "solution",
      "solution",
      () => this.handleSolution()
    );
    this.wrapper = new Component({ tag: "div", className: "controls-main" });
    this.wrapper.appendChildren([
      this.restart,
      this.solution,
      this.load,
      this.save
    ]);
    this.info = new Info();
    this.setInitialButtonState();
    this.appendChildren([this.wrapper, this.info]);
    this.handlers = {
      onRestart: null,
      onSolution: null,
      onLoad: null,
      onSave: null
    };
  }
  setHandlers(handlers) {
    this.handlers = { ...this.handlers, ...handlers };
  }
  getTime() {
    return this.info.getTime();
  }
  stopTimer() {
    this.info.stopTimer();
  }
  handleStart() {
    this.info.resetTimer();
    this.setGameStartedButtons();
    this.info.startTimer();
  }
  handleOver() {
    this.info.resetTimer();
    this.setInitialButtonState();
  }
  handelRestart() {
    if (this.handlers.onRestart) {
      this.handlers.onRestart();
    } else {
      console.log("something is wrong with restarting handler");
    }
  }
  handleSolution() {
    if (this.handlers.onSolution) {
      this.handlers.onSolution();
    } else {
      console.log("something is wrong with solution handler");
    }
  }
  handleLoad() {
    if (this.handlers.onLoad) {
      this.handlers.onLoad();
    } else {
      console.log("something is wrong with loading handler");
    }
  }
  handleSave() {
    if (this.handlers.onSave) {
      this.handlers.onSave();
    } else {
      console.log("something is wrong with saving handler");
    }
  }
  setInitialButtonState() {
    this.checkLoadings();
    this.restart.setVisible(true);
    this.restart.setDisabled(true);
    this.load.setVisible(true);
    this.save.setVisible(false);
    this.solution.setDisabled(true);
  }
  setGameStartedButtons() {
    this.restart.setVisible(true);
    this.restart.setDisabled(false);
    this.load.setVisible(false);
    this.save.setVisible(true);
    this.save.setDisabled(false);
    this.solution.setDisabled(false);
  }
  setAfterSolutionButtons() {
    this.restart.setVisible(true);
    this.restart.setDisabled(false);
    this.load.setVisible(false);
    this.save.setVisible(true);
    this.save.setDisabled(true);
    this.solution.setDisabled(true);
  }
  checkLoadings() {
    if (localStorage.getItem("save")) {
      console.log("exist");
    } else {
      this.load.setDisabled(true);
    }
  }
}
class View extends Component {
  constructor() {
    super({ tag: "div", className: "page" });
    this.grid = null;
    this.header = new Header();
    this.main = new Main();
    this.appendChildren([this.header, this.main]);
    document.body.classList.add("light");
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
    this.currentTemplate = "dino";
    this.currentMatrix = [
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 0]
    ];
    this.difficulty = "easy";
    this.state = "ready";
    this.gameState = this.playersGrid = [];
  }
  setState(state) {
    this.state = state;
  }
  createPlayersGrid() {
    let temp = this.currentMatrix.length;
    this.playersGrid = [];
    for (let i = 0; i < temp; i++) {
      this.playersGrid.push(new Array(temp).fill(0));
    }
  }
  changePlayersGrid(x, y, value) {
    this.playersGrid[x][y] = value;
  }
  loadPlayerGrid(template, difficulty, matrix2) {
    this.playersGrid = matrix2;
    this.currentTemplate = template;
    this.currentMatrix = this.allTemplates[difficulty][template];
    this.difficulty = difficulty;
  }
  getAllTemplates() {
    return this.allTemplates;
  }
  recieveForm({ difficulty, template }) {
    this.currentTemplate = template;
    this.currentMatrix = this.allTemplates[difficulty][template];
    this.difficulty = difficulty;
    this.createPlayersGrid();
  }
  getTemplateMatrix() {
    return this.allTemplates[this.difficulty][this.currentTemplate];
  }
  saveGame(template, difficulty, time, matrix2) {
    const save = { template, difficulty, time, matrix: matrix2 };
    localStorage.setItem("save", JSON.stringify(save));
  }
  getSave() {
    return localStorage.getItem("save");
  }
  saveLeaderboardVictory(template, difficulty, time) {
    const currentLeaderboard = JSON.parse(localStorage.getItem("victory")) || [];
    const newVictory = { template, difficulty, time };
    currentLeaderboard.push(newVictory);
    localStorage.setItem("victory", JSON.stringify(currentLeaderboard));
  }
  getFromLS() {
    const savedGrid = localStorage.getItem("playersGrid");
    if (savedGrid) {
      this.playersGrid = JSON.parse(savedGrid);
    } else {
      console.log("No grid found in localStorage");
    }
  }
}
let isMouseDown = false;
let current = null;
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  current = null;
});
class Cell extends Component {
  constructor(x, y, size, cellHandler) {
    super({ tag: "button", className: "cell" });
    this.row = x;
    this.column = y;
    this.fieldSize = size;
    this.cellHandler = cellHandler;
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
  click() {
    this.addChoosen();
  }
  handleMouseDown(e) {
    e.preventDefault();
    isMouseDown = true;
    if (e.button === 0) {
      this.handleLeftClick(e);
    } else if (e.button === 2) {
      this.handleRightClick();
    }
  }
  handleMouseEnter(e) {
    if (isMouseDown && current) {
      if (current === "set-marked") {
        this.addMarked();
      } else if (current === "set-choosen") {
        this.addChoosen(e);
      } else if (current === "remove-marked") {
        this.removeMarked();
      } else if (current === "remove-choosen") {
        this.removeChoosen(e);
      }
    }
  }
  handleLeftClick(e) {
    if (this.checkClass("choosen")) {
      this.removeChoosen(e);
      current = "remove-choosen";
    } else {
      this.addChoosen(e);
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
  addChoosen(e) {
    if (this.checkClass("choosen")) {
      return;
    }
    if (this.checkClass("marked")) {
      this.removeMarked();
    }
    this.addClass("choosen");
    this.cellHandler(this.row, this.column, "add");
  }
  removeChoosen(e) {
    if (!this.checkClass("choosen")) {
      return;
    }
    this.removeClass("choosen");
    this.cellHandler(this.row, this.column, "remove");
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
  constructor(size = 5, matrix2 = null, handler) {
    super({ tag: "div", className: "grid-wrapper" });
    this.grid = new Component({ tag: "div", className: "grid" });
    this.size = size;
    this.matrix = matrix2;
    this.cellHandler = handler;
    this.field = new Field(this.size, this.cellHandler);
    this.filler = new Hints("filler");
    this.columnHints = new Hints("column");
    this.rowHints = new Hints("row");
    this.grid.appendChildren([
      this.filler,
      this.columnHints,
      this.rowHints,
      this.field
    ]);
    this.append(this.grid);
  }
  setMatrix(matrix2) {
    this.matrix = matrix2;
    const row = calculateRowHints(matrix2);
    const column = calculateColumnHints(matrix2);
    this.rowHints.createHints(row);
    this.columnHints.createHints(column);
  }
  updateGrid(matrix2) {
    this.size = matrix2.length;
    this.matrix = matrix2;
    this.destroyChildren();
    this.createGrid();
    this.setMatrix(this.matrix);
  }
  createGrid() {
    this.field = new Field(this.size, this.cellHandler);
    this.filler = new Hints("filler");
    this.columnHints = new Hints("column");
    this.rowHints = new Hints("row");
    this.grid.appendChildren([
      this.filler,
      this.columnHints,
      this.rowHints,
      this.field
    ]);
    this.append(this.grid);
  }
}
class Field extends Component {
  constructor(size, cellHandler) {
    super({
      tag: "div",
      className: `field ${size === 5 ? "field-5" : size === 10 ? "field-10" : "field-15"}`
    });
    this.size = size;
    this.cellHandler = cellHandler;
    this.createField();
  }
  clearField() {
    this.destroyChildren();
    this.createField();
  }
  showField(matrix2) {
    this.destroyChildren();
    for (let i = 0; i < this.size * this.size; i++) {
      const row = Math.floor(i / this.size);
      const column = i % this.size;
      const cell = new Cell(row, column, this.size, this.cellHandler);
      if (matrix2[row][column] === 1) {
        cell.click();
      }
      this.append(cell);
    }
  }
  loadedField(matrix2) {
    console.log(matrix2);
    this.destroyChildren();
    for (let i = 0; i < this.size * this.size; i++) {
      const row = Math.floor(i / this.size);
      const column = i % this.size;
      const cell = new Cell(row, column, this.size, this.cellHandler);
      if (matrix2[row][column] === 1) {
        cell.click();
      }
      this.append(cell);
    }
  }
  createField() {
    this.destroyChildren();
    for (let i = 0; i < this.size * this.size; i++) {
      const row = Math.floor(i / this.size);
      const column = i % this.size;
      const cell = new Cell(row, column, this.size, this.cellHandler);
      this.append(cell);
    }
  }
}
class Form extends Component {
  constructor(onSubmit) {
    var _a;
    super({ tag: "form", className: "aside-content" });
    this.levels = ["easy", "medium", "hard"];
    this.templatess = {};
    this.difficulty = "easy";
    this.onSubmit = onSubmit;
    this.title = new Component({ tag: "h2", className: "aside-title" });
    this.title.setTextContent("Settings");
    this.templateFieldset = new TemplateFieldset();
    this.difficultyFieldset = new DifficultyFieldset(this.levels);
    this.difficultyFieldset.addListener("change", (e) => {
      this.difficulty = e.target.value;
      this.templateFieldset.setTemplates(this.templatess[this.difficulty]);
    });
    this.randomButton = new Button("random", "randomize template", (e) => {
      this.handleRandomizer();
    });
    this.submit = new Button("submit", "submit settings", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
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
    if (this.onSubmit) {
      this.onSubmit(formData);
    }
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
  hideButton() {
    this.button.setVisible(false);
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
class Leaderboard extends Component {
  constructor() {
    super({ tag: "div", className: "aside-content" });
    this.title = new Component({ tag: "h2", className: "aside-title" });
    this.title.setTextContent("Leaderboard");
    this.list = new Component({ tag: "ul", className: "leaderboard-list" });
    this.appendChildren([this.title, this.list]);
    this.setLeaderboardList();
  }
  setLeaderboardList() {
    const victoryData = localStorage.getItem("victory");
    if (victoryData) {
      try {
        const parsedData = JSON.parse(victoryData);
        this.createList(parsedData);
      } catch (e) {
        console.error("parsing error: ", e);
      }
    } else {
      console.log("empty");
    }
  }
  createList(data) {
    this.list.destroyChildren();
    data.sort((a, b) => {
      return a.time - b.time;
    }).splice(0, 5).forEach((result, index) => {
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
class Notification extends Component {
  constructor() {
    super({ tag: "div", className: "aside-content" });
    this.title = new Component({ tag: "h2", className: "aside-title" });
    this.title.setTextContent("");
    this.text = new Component({ tag: "p", className: "notification-text" });
    this.appendChildren([this.title, this.text]);
  }
  setMessage(message) {
    this.text.setTextContent(message);
  }
}
const startingSound = "" + new URL("start-DiYUZ00K.mp3", import.meta.url).href;
const vistorySound = "" + new URL("victory-C4ebeegk.mp3", import.meta.url).href;
const clickingSound = "" + new URL("click-BFwcdGqz.mp3", import.meta.url).href;
class Connector {
  constructor() {
    this.view = new View();
    this.model = new AppData();
    this.grid = new Grid(5, null, this.onCellUpdate.bind(this));
    this.form = new Form(this.handleSubmitForm.bind(this));
    this.asideForm = new Aside("form", this.form);
    this.leaderboard = new Leaderboard();
    this.asideLeaderboard = new Aside("leaderboard", this.leaderboard);
    this.rules = new Rules();
    this.asideRules = new Aside("rules", this.rules);
    this.notification = new Notification();
    this.asideNotification = new Aside("notification", this.notification);
    this.asideNotification.hideButton();
    this.view.header.setHandlers({
      onRulesOpen: this.handleRulesOpen.bind(this),
      onLeaderboardOpen: this.handleLeaderboardOpen.bind(this),
      onSetupOpen: this.handleSetupOpen.bind(this),
      onVolumeToggle: this.handleVolumeToggle.bind(this)
    });
    this.view.main.setHandlers({
      onRestart: this.handleGameRestart.bind(this),
      onSolution: this.handleSolutionShowing.bind(this),
      onLoad: this.handleLoadGame.bind(this),
      onSave: this.handleGameSave.bind(this)
    });
    this.startSound = new Audio(startingSound);
    this.victorySound = new Audio(vistorySound);
    this.clickingSound = new Audio(clickingSound);
    document.addEventListener("click", () => console.log(this.model.state));
    const matrix2 = this.model.getTemplateMatrix();
    this.grid.updateGrid(matrix2);
  }
  handleSubmitForm(formData) {
    this.asideForm.closeAside();
    this.clickingSound.play();
    this.model.setState("ready");
    this.model.recieveForm(formData);
    const matrix2 = this.model.getTemplateMatrix();
    this.grid.updateGrid(matrix2);
  }
  startingGame() {
    this.startSound.play();
    this.view.main.handleStart();
    this.model.setState("playing");
    console.log(this.model.currentMatrix);
  }
  endingGame() {
    this.view.main.handleOver();
    this.model.setState("waiting");
  }
  initiatePlayerVictory() {
    this.victorySound.play();
    const time = this.view.main.getTime();
    const template = this.model.currentTemplate;
    const difficulty = this.model.difficulty;
    this.openNotififcation(
      `Congratulations! You compelted ${template} within ${time} seconds on ${difficulty} difficulty! ${difficulty !== "hard" ? "Try another one, maybe make it more difficult now?" : ""}`
    );
    this.view.main.stopTimer();
    this.model.saveLeaderboardVictory(template, difficulty, time);
    this.leaderboard.setLeaderboardList();
    this.endingGame();
  }
  onCellUpdate(row, column, action) {
    if (this.model.state === "setting") {
      return;
    }
    if (this.model.state === "ready") {
      this.startingGame();
    }
    if (this.model.state === "playing") {
      const value = action === "add" ? 1 : 0;
      this.model.changePlayersGrid(row, column, value);
      if (this.compareMatrix() && !this.model.solution) {
        this.initiatePlayerVictory();
      }
    }
  }
  handleGameRestart() {
    this.startingGame();
    this.grid.field.clearField();
  }
  handleSolutionShowing() {
    this.clickingSound.play();
    this.openNotififcation(
      "Now you can see the original image. You cannot continue the game"
    );
    this.endingGame();
    this.showMatrix();
  }
  handleLoadGame() {
    this.clickingSound.play();
    this.openNotififcation("the game is loaded, you can continue");
    const { template, difficulty, time, matrix: matrix2 } = JSON.parse(
      localStorage.getItem("save")
    );
    this.model.loadPlayerGrid(template, difficulty, matrix2);
    const arr = this.model.getTemplateMatrix();
    this.grid.updateGrid(arr);
    this.grid.field.loadedField(matrix2);
    this.startingGame();
  }
  handleGameSave() {
    this.clickingSound.play();
    const time = this.view.main.getTime();
    const template = this.model.currentTemplate;
    const difficulty = this.model.difficulty;
    const currentMatrix = this.model.playersGrid;
    this.openNotififcation("Game is saved");
    this.model.saveGame(template, difficulty, time, currentMatrix);
    this.endingGame();
  }
  setAllTemplates() {
    const templates = this.model.getAllTemplates();
    this.form.extractFromMatrix(templates);
  }
  handleRulesOpen() {
    this.clickingSound.play();
    this.asideRules.openAside();
  }
  handleLeaderboardOpen() {
    this.clickingSound.play();
    this.asideLeaderboard.openAside();
  }
  handleSetupOpen() {
    this.clickingSound.play();
    this.asideForm.openAside();
  }
  handleVolumeToggle(activate) {
    this.startSound.muted = activate;
    this.victorySound.muted = activate;
    this.clickingSound.muted = activate;
  }
  openNotififcation(text) {
    this.notification.setMessage(text);
    this.asideNotification.openAside();
  }
  compareMatrix() {
    let player = this.model.playersGrid;
    let original = this.model.currentMatrix;
    return JSON.stringify(player) === JSON.stringify(original);
  }
  showMatrix() {
    let original = this.model.currentMatrix;
    this.grid.field.showField(original);
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
//# sourceMappingURL=index-D3ejEkHy.js.map
