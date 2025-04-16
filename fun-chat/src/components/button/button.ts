import BaseComponent from "../../shared/base-component"

export default class Button extends BaseComponent {
  constructor() {
    super({ tag: "button", classNames: ["button"] })
  }
}
