import Button from "../../../components/button/button"
import Input from "../../../components/input/input"
import BaseComponent from "../../../shared/view/base-component"

export default class MessageInput extends BaseComponent {
  public input: Input
  public button: Button

  private currentListener?: () => void
  constructor() {
    super({ tag: "div", classNames: ["message__input-wrapper"] })

    this.input = new Input("message-input", "type your message here")
    this.input.addClass("send-input")
    this.button = new Button("Send", () => console.log("sending"), "submit")
    this.button.addClass("send-button")

    this.appendChildrenComponents([this.input, this.button])
  }

  public setSendingCallback(callback: (text: string) => void): void {
    if (this.currentListener) {
      this.button.removeListener("click", this.currentListener)
    }

    const newListener = (): void => {
      const text: string | void = this.input.getValue()
      if (text !== "void") {
        if (text.trim() !== "") {
          callback(text.trim())
          this.input.setValue("")
        }
        return
      }
    }

    this.currentListener = newListener
    this.button.addListener("click", newListener)
  }

  public disableFields(): void {
    this.button.disable()
    this.input.disable()
  }

  public enableFields(): void {
    this.button.enable()
    this.input.enable()
  }
}
