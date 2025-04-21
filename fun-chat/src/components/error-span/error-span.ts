import BaseComponent from "../../shared/base-component"

export default class ErrorSpan extends BaseComponent {
  constructor() {
    super({ tag: "span", classNames: ["error-span"] })
  }

  public setError(visible: boolean, text: string): void {
    if (visible) {
      this.setTextContent(text)
      this.removeClass("visually-hidden")
    } else {
      this.setTextContent("")
      this.addClass("visually-hidden")
    }
  }
}
