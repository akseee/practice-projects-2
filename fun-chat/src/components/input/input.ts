import BaseComponent from "../../shared/base-component"
import ErrorSpan from "../error-span/error-span"

export default class Input extends BaseComponent {
  public input: BaseComponent
  public errorSpan: ErrorSpan
  constructor(name: string, placeholder: string, type = "text") {
    super({ tag: "label", classNames: ["input-label"] })

    this.input = new BaseComponent({ tag: "input", classNames: ["input"] })

    this.input.setAttribute("name", name)
    this.input.setAttribute("placeholder", placeholder)
    this.input.setAttribute("type", type)

    this.errorSpan = new ErrorSpan()
    this.appendChildrenComponents([this.input, this.errorSpan])

    this.input.addListener("input", () => {
      this.setErrorText(false, "")
    })
  }

  public getValue(): string {
    const value = this.input.getValue()
    return value || ""
  }

  public setErrorText(visible: boolean, text: string): void {
    this.errorSpan.setError(visible, text)
  }
}
