import { type TUser } from "../../shared/types/types"
import BaseComponent from "../../shared/view/base-component"

export default class UserItem extends BaseComponent {
  public wrapper: BaseComponent
  public messagesAmount: BaseComponent
  public newMessages: boolean
  constructor() {
    super({ tag: "li", classNames: ["chat__user-item"] })

    this.wrapper = new BaseComponent({ tag: "a", classNames: ["chat__user-item-wrapper"] })

    this.appendChildComponent(this.wrapper)
    this.newMessages = false
    this.messagesAmount = new BaseComponent({
      tag: "div",
      classNames: ["chat__user-item__messages-amount"],
    })
  }

  public setUserIItemData(user: TUser): void {
    this.setLogin(user.login)

    if (user.login === "123" || user.login == "432") {
      this.setNewMessages(1235)
    }

    this.setStatus(user.isLogined)
    this.getNode().dataset.login = user.login
  }

  private setLogin(login: string): void {
    const name = new BaseComponent({ tag: "p", classNames: ["chat__user-item__login"] })
    name.setTextContent(login)
    this.wrapper.appendChildComponent(name)
  }

  private setStatus(status: boolean): void {
    const icon = new BaseComponent({ tag: "div", classNames: ["chat__user-item__status"] })

    if (status) {
      icon.addClass("online")
      icon.removeClass("offline")
    } else {
      icon.removeClass("online")
      icon.addClass("offline")
    }

    this.wrapper.appendChildComponent(icon)
  }

  public setNewMessages(amount: number = 0): void {
    const text = new BaseComponent({
      tag: "p",
      classNames: ["chat__user-item__messages-amount__text"],
    })

    if (amount > 0) {
      this.newMessages = true
      text.setTextContent(`${amount}`)
      this.messagesAmount.show()
    } else {
      this.newMessages = false
      this.messagesAmount.hide()
    }

    this.messagesAmount.appendChildComponent(text)
    this.wrapper.appendChildComponent(this.messagesAmount)
  }
}
