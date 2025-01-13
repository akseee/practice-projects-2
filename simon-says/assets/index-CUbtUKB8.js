var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _children, _node;
const levels = {
  easy: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
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
const keys = [
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
];
class AppModel {
  constructor() {
    this.difficulty = "easy";
    this._levels = levels;
    this.generatedConsequence = [];
    this.playerConsequence = [];
    this.maxRounds = 5;
    this.currentRound = 2;
    this.consequenceLength = 2;
    this.validKeys = this.getValidKeys();
  }
  set levels(levels2) {
    this._levels = levels2;
  }
  get levels() {
    return this._levels;
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    this.validKeys = this.getValidKeys();
  }
  getDifficulty() {
    return this.difficulty;
  }
  setCurrentRound(round) {
    this.currentRound = round;
  }
  getCurrentRound() {
    return this.currentRound;
  }
  getMaxRounds() {
    return this.maxRounds;
  }
  setGeneratedConsequence(sequence) {
    this.generatedConsequence = sequence;
  }
  getGeneratedConsequence() {
    return this.generatedConsequence;
  }
  setPlayerConsequence(sequence) {
    this.playerConsequence = sequence;
  }
  getPlayerConsequence() {
    return this.playerConsequence;
  }
  setSequenceLength(length) {
    this.sequenceLength = length;
  }
  getSequenceLength() {
    return 2 + (this.currentRound - 1) * 2;
  }
  getValidKeys() {
    return levels[this.difficulty];
  }
  resetRound() {
    this.generatedConsequence = [];
    this.playerConsequence = [];
  }
  resetGame() {
    this.resetRound();
    this.currentRound = 1;
  }
}
class AppPresenter {
  constructor({ model: model2, page: page2 }) {
    this.model = model2;
    this.view = page2;
    console.log(this.view);
  }
  renderView() {
    console.log(this.view);
    document.body.appendChild(this.view.getNode());
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
  removeAttribute(attribute) {
    __privateGet(this, _node).removeAttribute(attribute);
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
  addListener(event, listener, options = false) {
    __privateGet(this, _node).addEventListener(event, listener, options);
  }
  removeListener(event, listener, options = false) {
    __privateGet(this, _node).removeEventListener(event, listener, options);
  }
  setDisabled() {
    __privateGet(this, _node).disabled = true;
  }
  removeDisabled() {
    __privateGet(this, _node).disabled = false;
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
class BoardKey extends Component {
  constructor({ text }) {
    super({
      tag: "button",
      className: "button key",
      text
    });
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
class OutputKey extends Component {
  constructor({ text }) {
    super({
      tag: "div",
      className: "output-key",
      text
    });
  }
}
class AppView extends Component {
  constructor() {
    super({ tag: "div", className: "page" });
    this._keysList = keys;
    this._outputList = ["a", "b", "c"];
    this.header = new Component({
      tag: "header",
      className: "header"
    });
    this.body = new Component({ tag: "main", className: "main" });
    this.footer = new Component({
      tag: "footer",
      className: "footer"
    });
    this.renderHeader();
    this.renderBody();
    this.renderFooter();
    this.appendChildren([this.header, this.body, this.footer]);
  }
  renderHeader() {
    this.title = new Component({
      tag: "h1",
      className: "title",
      text: "Проверяющие, работа не готова:( Извините"
    });
    this.easyButton = new Component({
      tag: "button",
      className: "button easy ",
      text: "easy"
    });
    this.mediumButton = new Component({
      tag: "button",
      className: "button medium",
      text: "medium"
    });
    this.hardButton = new Component({
      tag: "button",
      className: "button hard",
      text: "hard"
    });
    this.easyButton.addListener("click", () => this.onDifficultyChange("easy"));
    this.mediumButton.addListener(
      "click",
      () => this.onDifficultyChange("medium")
    );
    this.hardButton.addListener("click", () => this.onDifficultyChange("hard"));
    this.difficulty = new Component(
      { tag: "div", className: "difficulty" },
      this.easyButton,
      this.mediumButton,
      this.hardButton
    );
    this.header.appendChildren([this.title, this.difficulty]);
  }
  renderBody() {
    this.information = new Component({ tag: "div", className: "information" });
    const startBtn = new Component({
      tag: "button",
      className: "button start ",
      text: "start new game"
    });
    const optionalBtn = new Component({
      tag: "button",
      className: "button option ",
      text: "...repeat sequence"
    });
    const controls = new Component({ tag: "div", className: "controls" });
    controls.appendChildren([startBtn, optionalBtn]);
    const infoText = new Component({
      tag: "p",
      className: "info",
      text: "Слишком намудрила себе. Буду благодарна если будет возможность перепроверить потом"
    });
    const roundsText = new Component({
      tag: "h2",
      className: "rounds",
      text: `Round 1/6`
    });
    const status = new Component({ tag: "div", className: "status" });
    status.appendChildren([infoText, roundsText]);
    this.information.appendChildren([controls, status]);
    this.output = new Component({ tag: "div", className: "output" });
    this.output.appendChildren(
      this._outputList.map((output) => {
        return new OutputKey({ text: output });
      })
    );
    this.display = new Component(
      { tag: "div", className: "display" },
      new Component(
        {
          tag: "div",
          className: "display-wrapper"
        },
        this.output
      )
    );
    this.keyboard = new Component({ tag: "div", className: "keyboard" });
    this.keyboard.appendChildren(
      this._keysList.map((text) => {
        return new BoardKey({ text });
      })
    );
    this.body.appendChildren([this.information, this.display, this.keyboard]);
  }
  renderFooter() {
    this.footer.append(
      new Link({
        className: "",
        text: "gh@akseee",
        href: "https://github.com/akseee",
        onClick: () => {
        }
      })
    );
  }
  onDifficultyChange(difficulty) {
    console.log(difficulty);
  }
}
const page = new AppView();
const model = new AppModel();
model.levels = levels;
const app = new AppPresenter({
  model,
  page
});
app.renderView();
//# sourceMappingURL=index-CUbtUKB8.js.map
