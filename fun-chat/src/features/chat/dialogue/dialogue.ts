import MessageField from "../../../components/message-field/message-field"
import { type TMessage } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"

const mock1: TMessage = {
  id: "123123123",
  from: "my g",
  to: "attaxe",
  text: " swear, my cat understands every word I say. swear, my cat understands every word I say. swear, my cat understands every word I say.",
  datetime: 1745500672725,
  status: {
    isDelivered: false,
    isReaded: false,
    isEdited: false,
  },
}

const mock2: TMessage = {
  id: "123123123",
  from: "attaxe",
  to: "my g",
  text: "If life gives you lemons, make lemonade… then wonder who gave you life lemons.",
  datetime: 1745500672725,
  status: {
    isDelivered: false,
    isReaded: false,
    isEdited: false,
  },
}

export default class Dialogue extends BaseComponent {
  public input: BaseComponent
  public messages: BaseComponent
  constructor() {
    super({ tag: "div", classNames: ["chat__dialogue"] })

    this.messages = new BaseComponent({ tag: "div", classNames: ["messages-wrapper"] })
    this.input = new BaseComponent({ tag: "div", classNames: ["input-wrapper"] })
    this.addMessage(mock1, true)
    this.addMessage(mock2, false)
    this.appendChildrenComponents([this.messages, this.input])
  }

  public setEmptyChat(): void {
    this.clearMessages()

    const text = new BaseComponent({ tag: "p", classNames: ["empty-chat__text"] })
    text.setTextContent("the beginning of the dialogue")

    this.messages.appendChildComponent(text)
  }

  public clearMessages(): void {
    this.messages.destroyChildren()
  }

  public addMessage(message: TMessage, owner: boolean): void {
    const messageElement = new MessageField()
    messageElement.setData(message, owner)
    this.messages.appendChildComponent(messageElement)
  }
}
