import BaseComponent from "../../shared/view/base-component"
import ErrorSpan from "../error-span/error-span"

export default class Input extends BaseComponent {
  public input: BaseComponent
  public errorSpan: ErrorSpan

  public placeholder: string

  constructor(name: string, placeholder: string, type = "text") {
    super({ tag: "label", classNames: ["input-label"] })

    this.input = new BaseComponent({ tag: "input", classNames: ["input"] })

    this.input.setAttribute("name", name)
    this.input.setAttribute("placeholder", placeholder)
    this.input.setAttribute("type", type)

    this.placeholder = placeholder

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

  public setValue(value: string): void {
    this.input.setValue(value)
  }

  public setErrorText(visible: boolean, text: string): void {
    this.errorSpan.setError(visible, text)
  }

  public disable(): void {
    this.input.setAttribute("disabled", "true")
    this.input.setAttribute("placeholder", "")
  }

  public enable(): void {
    this.input.removeAttribute("disabled")
    this.input.setAttribute("placeholder", this.placeholder)
  }
}
