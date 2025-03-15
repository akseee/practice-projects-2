import BaseComponent from "./base-component"

const enum CSSClasses {
  BUTTON = "button",
}

export default class Button extends BaseComponent {
  constructor(
    public text: string,
    public callback: () => void,
  ) {
    super({ tag: "button", classNames: [CSSClasses.BUTTON] })
    this.setAttribute("type", "button")
    this.setTextContent(text)
    this.addListener("click", callback)
  }
}
