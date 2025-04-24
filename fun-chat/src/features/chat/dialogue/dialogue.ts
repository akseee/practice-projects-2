import MessageField from "../../../components/message-field/message-field"
import { type TMessage } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"
import MessageInput from "../message-input/message-input"

export default class Dialogue extends BaseComponent {
  public input: MessageInput
  public messages: BaseComponent
  public text: BaseComponent

  constructor() {
    super({ tag: "div", classNames: ["chat__dialogue"] })

    this.messages = new BaseComponent({ tag: "ul", classNames: ["messages-wrapper"] })
    this.input = new MessageInput()

    this.appendChildrenComponents([this.messages, this.input])
    this.setDefaultChat()
    this.text = new BaseComponent({ tag: "p", classNames: ["empty-chat__text"] })
  }

  public setEmptyChat(): void {
    this.clearMessages()
    this.text.removeClass("visually-hidden")
    this.text.setTextContent("the beginning of the dialogue")

    this.messages.appendChildComponent(this.text)
  }

  public setDefaultChat(): void {
    this.clearMessages()

    const text = new BaseComponent({ tag: "p", classNames: ["empty-chat__text"] })
    text.setTextContent("click on chat top start a conversation!")

    this.messages.appendChildComponent(text)
    this.input.disableFields()
  }

  public async clearMessages(): Promise<void> {
    this.messages.destroyChildren()
  }

  public addMessage(message: TMessage, owner: boolean): void {
    const messageElement = new MessageField()
    this.text.addClass("visually-hidden")

    messageElement.setData(message, owner)
    this.messages.appendChildComponent(messageElement)
    this.scrollToBottom()
  }

  public setSendHandler(callback: (text: string) => void): void {
    this.input.setSendingCallback(callback)
  }

  public scrollToBottom(): void {
    const element = this.messages.getNode()
    element.scrollTop = element.scrollHeight
  }
}
