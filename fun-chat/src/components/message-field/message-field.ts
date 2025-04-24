import { type TMessageStatus, type TMessage } from "../../shared/types/types"
import BaseComponent from "../../shared/view/base-component"
import Button from "../button/button"

export default class MessageField extends BaseComponent {
  public messageData
  public messageText
  public messageExtra
  constructor() {
    super({ tag: "li", classNames: ["chat__message-field"] })

    this.messageData = new BaseComponent({ tag: "div", classNames: ["chat__message-data"] })
    this.messageText = new BaseComponent({ tag: "p", classNames: ["chat__message-text"] })
    this.messageExtra = new BaseComponent({
      tag: "div",
      classNames: ["chat__message-extra"],
    })

    this.appendChildrenComponents([this.messageData, this.messageText])
  }

  public setData(message: TMessage, owner: boolean): void {
    this.setSender(message.from, owner)
    this.setTime(message.datetime)

    this.setMessageText(message.text)

    if (owner) {
      this.appendChildComponent(this.messageExtra)
      this.setStatus(message.status)
      this.setControls()
    }
  }

  protected setStatus(status: TMessageStatus): void {
    const statusWrapper = new BaseComponent({
      tag: "div",
      classNames: ["chat__message-data__status"],
    })

    statusWrapper.setTextContent(`${status.isDelivered ? "Delivered" : "not Delivered"}`)
    this.messageExtra.appendChildComponent(statusWrapper)
  }

  public onDelete(): void {
    this.destroy()
  }

  protected setControls(): void {
    const controlsWrapper = new BaseComponent({
      tag: "div",
      classNames: ["chat__message-data__buttons"],
    })
    const editButton = new Button("Edit", () => console.log("edited"), "button")
    const deleteButton = new Button("Delete", () => this.onDelete(), "button")

    editButton.addClass("message__button")
    deleteButton.addClass("message__button")

    controlsWrapper.appendChildrenComponents([editButton, deleteButton])
    this.messageExtra.appendChildComponent(controlsWrapper)
  }

  protected setMessageText(text: string): void {
    this.messageText.setTextContent(text)
  }

  protected setSender(name: string, owner: boolean): void {
    const sender = new BaseComponent({ tag: "p", classNames: ["chat__message-data__sender"] })
    sender.setTextContent(name)
    this.messageData.appendChildComponent(sender)

    if (owner) {
      this.addClass("owner")
    } else {
      this.removeClass("owner")
    }
  }

  protected setTime(datetime: number): void {
    const date = new BaseComponent({ tag: "p", classNames: ["chat__message-data__date"] })
    const time = new Date(datetime)
    const formattedDate = time.toLocaleString("en-EN", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })

    date.setTextContent(formattedDate)

    this.messageData.appendChildComponent(date)
  }
}
