import BaseComponent from "../../shared/base-component"

export default class Input extends BaseComponent {
  public input: BaseComponent
  public error: BaseComponent
  constructor(name: string, placeholder: string, type = "text") {
    super({ tag: "label", classNames: ["input-label"] })

    this.input = new BaseComponent({ tag: "input", classNames: ["input"] })

    this.input.setAttribute("name", name)
    this.input.setAttribute("placeholder", placeholder)
    this.input.setAttribute("type", type)

    this.error = new BaseComponent({ tag: "span", classNames: ["input-error"] })

    this.appendChildrenComponents([this.input, this.error])
  }

  public getValue(): string {
    const value = this.input.getValue()
    return value || ""
  }

  public setErrorText(visible: boolean, text: string): void {
    if (visible) {
      this.error.setTextContent(text)
      this.error.removeClass("visually-hidden")
    } else {
      this.error.setTextContent("")
      this.error.addClass("visually-hidden")
    }
  }
}
