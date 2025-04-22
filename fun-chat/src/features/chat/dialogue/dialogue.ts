import BaseComponent from "../../../shared/view/base-component"

export default class Dialogue extends BaseComponent {
  constructor() {
    super({ tag: "div", classNames: ["chat__dialogue"] })
  }
}
