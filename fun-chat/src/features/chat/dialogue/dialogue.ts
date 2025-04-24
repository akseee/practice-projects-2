import { type TMessage } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"

export default class Dialogue extends BaseComponent {
  public messageWrapper: BaseComponent
  constructor() {
    super({ tag: "div", classNames: ["chat__dialogue"] })

    this.messageWrapper = new BaseComponent({ tag: "div", classNames: ["message-wrapper"] })
  }
  public clearMessages(): void {
    this.destroyChildren()
  }

  public addMessage(message: TMessage): void {
    const messageElement = new BaseComponent({ tag: "div", classNames: ["chat__message"] })
    messageElement.setTextContent(`${message.from}: ${message.text}`)
    this.appendChildComponent(messageElement)
  }
}
