import BaseComponent from "../../shared/base-component"

export default class Button extends BaseComponent {
  constructor(
    public name: string,
    public callback: () => void,
    public type: string = "button",
  ) {
    super({ tag: "button", classNames: ["button"] })
    this.setTextContent(name)
    this.setAttribute("type", type)
    this.addListener("click", callback)
  }

  public disable(): void {
    const node = this.getNode()
    if (node instanceof HTMLButtonElement) {
      node.style.pointerEvents = "none"
      node.disabled = true
    }
  }

  public enable(): void {
    const node = this.getNode()
    if (node instanceof HTMLButtonElement) {
      node.style.pointerEvents = "auto"
      node.disabled = false
    }
  }
}
