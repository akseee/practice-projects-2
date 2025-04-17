import BaseComponent from "../../shared/base-component"

export default class Button extends BaseComponent {
  constructor(name: string) {
    super({ tag: "button", classNames: ["button"] })
    this.setTextContent(name)
  }
}
