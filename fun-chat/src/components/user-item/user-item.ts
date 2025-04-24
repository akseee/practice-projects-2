import { type TUser } from "../../shared/types/types"
import BaseComponent from "../../shared/view/base-component"

export default class UserItem extends BaseComponent {
  public wrapper: BaseComponent

  constructor() {
    super({ tag: "li", classNames: ["chat__user-item"] })

    this.wrapper = new BaseComponent({ tag: "a", classNames: ["chat__user-item-wrapper"] })

    this.appendChildComponent(this.wrapper)
  }

  public setUserIItemData(user: TUser): void {
    this.setLogin(user.login)
    this.setStatus(user.isLogined)
    this.setAttribute("dataset-login", user.login)
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

  public setActiveChat(active: boolean): void {
    if (active) {
      this.wrapper.addClass("active")
    } else {
      this.wrapper.removeClass("active")
    }
  }
}
