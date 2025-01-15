var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _children, _node;
const levels = {
  easy: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  medium: [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m"
  ],
  hard: [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m"
  ]
};
class AppModel {
  constructor() {
    this._difficulty = "easy";
    this.levels = levels;
    this.generatedSequence = [];
    this.clicks = 0;
    this.maxRounds = 5;
    this.currentRound = 1;
    this.attempt = true;
    this.button = {
      next: "continue",
      start: "new game",
      repeat: "repeat",
      over: "better luck next time!"
    };
    this.info = {
      idle: "...waiting for the game to start",
      start: "Focus and repeat the sequence. You have one life extra",
      life: "Dont cheat! Joke. Open console.",
      correct: "Well done! Next to continue",
      incorrect: "Oopsie, wrong one. You have one more attempt. Click the button above",
      lost: "You lost:( Hint: open console to see the sequence. Another try?",
      win: "Congrats! You nailed it! One more try?"
    };
  }
  get sequence() {
    return this.generatedSequence;
  }
  set sequence(sequence) {
    this.generateSequence = sequence;
  }
  get keys() {
    return this.levels[this._difficulty];
  }
  set difficulty(difficulty) {
    this._difficulty = difficulty;
  }
  generateSequence() {
    const sequenceLength = this.getSequenceLength();
    const generated = Array.from({ length: sequenceLength }, () => {
      const randomIndex = Math.floor(Math.random() * this.keys.length);
      return this.keys[randomIndex];
    });
    this.generatedSequence = generated;
    console.log("the sequence is [" + generated + "]");
    return generated;
  }
  clearSequence() {
    this.sequence = [];
  }
  setIsPlaying(playing) {
    this.isPlaying = playing;
  }
  getCurrentKeys() {
    return this.levels[this.difficulty];
  }
  getSequenceLength() {
    return 2 + (this.currentRound - 1) * 2;
  }
  resetClicks() {
    this.clicks = 0;
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }
  useAttempt() {
    this.attempt = false;
  }
  resetAttempt() {
    this.attempt = true;
  }
}
class AppPresenter {
  constructor({ model: model2, page: page2, keyboard: keyboard2 }) {
    this.model = model2;
    this.view = page2;
    this.keyboard = keyboard2;
  }
  setup() {
    this.keyboard.setPresenter(this);
    this.keyboard.setupKeyboard(this.model.keys);
    this.keyboard.disableKeyboard();
    this.view.renderKeyboard(this.keyboard);
    this.view.setInitialButtonState();
    this.bindButtonListeners();
  }
  render() {
    document.body.appendChild(this.view.getNode());
  }
  startRound() {
    this.model.resetClicks();
    this.model.generateSequence();
    this.keyboard.clearOutput();
    this.view.changeRoundsText(this.model.currentRound);
    this.showSequence(true);
  }
  completeRound() {
    if (this.model.currentRound < 5) {
      this.view.setNextRoundButtons();
      this.model.currentRound += 1;
      this.keyboard.disableKeyboard();
    } else {
      this.view.changeInfoText(this.model.info.win);
      this.gameOver();
    }
  }
  gameOver() {
    this.keyboard.disableKeyboard();
    this.view.setRoundButtons();
  }
  resetGame() {
    this.model.currentRound = 1;
    this.model.resetAttempt();
    this.model.resetClicks();
    this.view.changeInfoText(this.model.info.idle);
    this.view.changeRoundsText(1);
    this.view.setDifficultyButtonsDisabled(false);
  }
  // keyboard handlers
  showSequence(repeat) {
    this.keyboard.showSequence(this.model.sequence, repeat);
  }
  handleInput(key) {
    const expected = this.model.sequence[this.model.clicks];
    if (expected === key) {
      this.keyboard.printKey(key);
      this.keyboard.highlightKey(key, true);
      this.model.clicks += 1;
      if (this.model.sequence.length === this.model.clicks) {
        this.completeRound();
      }
    } else {
      this.keyboard.highlightKey(key, false);
      this.handleWrongInput();
    }
  }
  handleWrongInput() {
    this.keyboard.disableKeyboard();
    if (this.model.attempt) {
      this.view.changeInfoText(this.model.info.incorrect);
      this.keyboard.disableKeyboard();
      this.keyboard.clearOutput();
      this.model.useAttempt();
    } else {
      this.view.changeInfoText(this.model.info.lost);
      this.view.setAfterRepeatButtons();
    }
  }
  // buttons listeners
  handleStartButton() {
    console.log("Game is started! Good luck");
    this.view.setDifficultyButtonsDisabled(true);
    this.view.changeInfoText(this.model.info.start);
    this.startRound();
  }
  handleRepeatButton() {
    this.showSequence(false);
    this.view.changeInfoText(this.model.info.life);
  }
  handleNextButton() {
    this.startRound();
  }
  handleRestartButton() {
    this.setup();
    this.resetGame();
  }
  handleDifficultyChange(difficulty) {
    this.model.setDifficulty(difficulty);
    this.model.generateSequence();
    this.keyboard.setupKeyboard(this.model.keys);
    this.view.setActiveDifficultyButton(difficulty);
  }
  bindButtonListeners() {
    this.view.start.addListener("click", () => {
      this.handleStartButton();
    });
    this.view.repeat.addListener("click", () => this.handleRepeatButton());
    this.view.restart.addListener("click", () => this.handleRestartButton());
    this.view.next.addListener("click", () => this.handleNextButton());
    this.view.easyButton.addListener(
      "click",
      () => this.handleDifficultyChange("easy")
    );
    this.view.mediumButton.addListener(
      "click",
      () => this.handleDifficultyChange("medium")
    );
    this.view.hardButton.addListener(
      "click",
      () => this.handleDifficultyChange("hard")
    );
  }
}
class Component {
  constructor({ tag = "div", className = "", text = "" }, ...children) {
    __privateAdd(this, _children, []);
    __privateAdd(this, _node, null);
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
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
  toggleClass(className) {
    __privateGet(this, _node).classList.toggle(className);
  }
  setVisible(visible) {
    if (visible) {
      __privateGet(this, _node).classList.remove("visually-hidden");
    } else {
      __privateGet(this, _node).classList.add("visually-hidden");
    }
  }
  addClass(className) {
    __privateGet(this, _node).classList.add(className);
  }
  removeClass(className) {
    __privateGet(this, _node).classList.remove(className);
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
  setLink(link) {
    __privateGet(this, _node).href = link;
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
class DifficultyButton extends Component {
  constructor(text) {
    super({
      tag: "button",
      className: `button ${text}`,
      text
    });
    if (text === "easy") {
      this.addClass("active");
    }
    this.setAttribute("data-difficulty", text);
  }
  setActive(isActive) {
    if (isActive) {
      this.addClass("active");
    } else {
      this.removeClass("active");
    }
  }
  setDisabled(isDisabled) {
    super.setDisabled(isDisabled);
    if (isDisabled) {
      this.setAttribute("disabled", true);
    } else {
      this.removeAttribute("disabled");
    }
  }
}
class Link extends Component {
  constructor({ className, text, href, onClick }) {
    super({ tag: "a", className, text });
    this.onClick = onClick;
    this.setAttribute("href", href);
    if (onClick) {
      this.onClick = onClick;
      this.addListener("click", this.onClick);
    }
  }
  setHref(href) {
    this.setAttribute("href", href);
  }
  destroy() {
    this.removeListener("click", this.onClick);
    super.destroy();
  }
}
class AppView extends Component {
  constructor() {
    super({ tag: "div", className: "page" });
    this.header = new Component({
      tag: "header",
      className: "header"
    });
    this.title = new Component({
      tag: "h1",
      className: "title",
      text: "Simon Saysssss"
    });
    this.easyButton = new DifficultyButton("easy");
    this.mediumButton = new DifficultyButton("medium");
    this.hardButton = new DifficultyButton("hard");
    this.difficulty = new Component(
      { tag: "div", className: "difficulty" },
      this.easyButton,
      this.mediumButton,
      this.hardButton
    );
    this.header.appendChildren([this.title, this.difficulty]);
    this.body = new Component({ tag: "main", className: "main" });
    this.start = new Component({
      tag: "button",
      className: "button start ",
      text: "START"
    });
    this.repeat = new Component({
      tag: "button",
      className: "button repeat ",
      text: "repeat"
    });
    this.restart = new Component({
      tag: "button",
      className: "button restart ",
      text: "new game"
    });
    this.next = new Component({
      tag: "button",
      className: "button next",
      text: "next"
    });
    this.controls = new Component({ tag: "div", className: "controls" });
    this.controls.appendChildren([
      this.start,
      this.next,
      this.repeat,
      this.restart
    ]);
    this.infoText = new Component({
      tag: "p",
      className: "info",
      text: "...waiting for the game to start"
    });
    this.roundsText = new Component({
      tag: "h2",
      className: "rounds",
      text: `:)`
    });
    this.status = new Component({ tag: "div", className: "status" });
    this.status.appendChildren([this.infoText, this.roundsText]);
    this.information = new Component({ tag: "div", className: "information" });
    this.information.appendChildren([this.controls, this.status]);
    this.keyboard = null;
    this.body.append(this.information);
    this.footer = new Component({
      tag: "footer",
      className: "footer"
    });
    this.footer.append(
      new Link({
        className: "",
        text: "gh@akseee",
        href: "https://github.com/akseee",
        onClick: () => {
        }
      })
    );
    this.render();
    this.setInitialButtonState();
  }
  render() {
    this.appendChildren([this.header, this.body, this.footer]);
  }
  renderKeyboard(keyboard2) {
    this.keyboard = keyboard2;
    this.body.append(this.keyboard);
  }
  setDisabledButtons() {
    this.next.setDisabled(true);
    this.start.setDisabled(true);
    this.restart.setDisabled(true);
    this.repeat.setDisabled(true);
  }
  setInitialButtonState() {
    this.next.setVisible(false);
    this.start.setVisible(true);
    this.next.setDisabled(true);
    this.start.setDisabled(false);
    this.restart.setDisabled(true);
    this.repeat.setDisabled(true);
  }
  setAfterRepeatButtons() {
    this.start.setVisible(false);
    this.next.setDisabled(true);
    this.repeat.setDisabled(true);
    this.restart.setDisabled(false);
  }
  setRoundButtons() {
    this.start.setVisible(false);
    this.next.setVisible(true);
    this.repeat.setDisabled(false);
    this.restart.setDisabled(false);
    this.next.setDisabled(true);
  }
  setNextRoundButtons() {
    this.start.setVisible(false);
    this.next.setVisible(true);
    this.next.setDisabled(false);
    this.repeat.setDisabled(true);
    this.restart.setDisabled(true);
  }
  setActiveDifficultyButton(difficulty) {
    [this.easyButton, this.mediumButton, this.hardButton].forEach((button) => {
      if (button.getAttribute("data-difficulty") === difficulty) {
        button.setActive(true);
      } else {
        button.setActive(false);
      }
    });
  }
  setDifficultyButtonsDisabled(disabled) {
    [this.easyButton, this.mediumButton, this.hardButton].forEach((button) => {
      button.setDisabled(disabled);
    });
  }
  changeInfoText(text) {
    this.infoText.setTextContent(text);
  }
  changeRoundsText(round) {
    this.roundsText.setTextContent(`Round ${round}/5`);
  }
  changeStartText(text) {
    this.start.setTextContent(text);
  }
}
class BoardKey extends Component {
  constructor({ text, disabled = false }) {
    super({
      tag: "button",
      className: "button key",
      text
    });
    this.setAttribute("data-key", text.toLowerCase());
    this.setDisabled(disabled);
    this.clickListener = null;
  }
  setDisabled(disabled) {
    this.getNode().disabled = disabled;
  }
  getValue() {
    return this.getAttribute("data-key");
  }
  setClickListener(listener) {
    if (this.clickListener) {
      this.removeListener("click", this.clickListener);
    }
    this.clickListener = listener;
    this.addListener("click", listener);
  }
}
class VirtualKeyboard extends Component {
  constructor() {
    super({ tag: "div", className: "keyboardWrapper" });
    this.output = new Component({
      tag: "input",
      className: "output"
    });
    this.output.setAttribute("readonly", true);
    this.display = new Component(
      { tag: "div", className: "display" },
      this.output
    );
    this.keyboard = new Component({ tag: "div", className: "keyboard" });
    this.handlePhysicalPress = this.handlePhysicalPress.bind(this);
    this.render();
  }
  setPresenter(presenter) {
    this.presenter = presenter;
  }
  render() {
    this.appendChildren([this.display, this.keyboard]);
  }
  setupKeyboard(keys) {
    this.keyboard.destroyChildren();
    this.keyboard.appendChildren(
      keys.map((key) => new BoardKey({ text: key, disabled: false }))
    );
  }
  getKey(keyValue) {
    return this.keyboard.querySelector(`[data-key="${keyValue.toLowerCase()}"]`);
  }
  getAllKeys() {
    return this.keyboard.getChildren();
  }
  highlightKey(keyValue, isValid = true) {
    const key = this.getKey(keyValue);
    if (key) {
      key.disabled = false;
      key.classList.add(isValid ? "active" : "wrong");
      setTimeout(() => key.classList.remove("active", "wrong"), 500);
    }
  }
  showSequence(sequence, repeat) {
    sequence.forEach((key, index) => {
      setTimeout(() => {
        this.disableKeyboard();
        this.highlightKey(key, true);
        this.presenter.view.setDisabledButtons();
      }, 750 * index);
    });
    setTimeout(() => {
      this.enableKeyboard();
      if (repeat) {
        this.presenter.view.setRoundButtons();
      } else {
        this.presenter.view.setAfterRepeatButtons();
      }
    }, 750 * sequence.length);
  }
  enableKeyboard() {
    this.getAllKeys().forEach((key) => {
      key.setDisabled(false);
      key.setClickListener(() => {
        this.presenter.handleInput(key.getValue());
      });
    });
    document.addEventListener("keydown", this.handlePhysicalPress);
  }
  disableKeyboard() {
    this.getAllKeys().map((key) => key.setDisabled(true));
    document.removeEventListener("keydown", this.handlePhysicalPress);
  }
  handlePhysicalPress(event) {
    const keyValue = event.key.toLowerCase();
    const availableKeys = this.getAllKeys().map(
      (key) => key.getValue().toLowerCase()
    );
    if (availableKeys.includes(keyValue)) {
      this.presenter.handleInput(keyValue);
    }
  }
  printKey(key) {
    const currentText = this.output.getAttribute("value") || "";
    this.output.setAttribute("value", currentText + key);
  }
  clearOutput() {
    this.output.setAttribute("value", "");
  }
}
const page = new AppView();
const model = new AppModel();
model.levels = levels;
const keyboard = new VirtualKeyboard();
const app = new AppPresenter({
  model,
  page,
  keyboard
});
app.setup();
app.render();
//# sourceMappingURL=index-JIjzmK_3.js.map
