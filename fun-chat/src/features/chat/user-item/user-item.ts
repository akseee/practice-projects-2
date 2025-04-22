import { type TUser } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"

export default class UserItem extends BaseComponent {
  public login
  public status
  public wrapper: BaseComponent

  constructor(public user: TUser) {
    super({ tag: "li", classNames: ["chat__user-item"] })

    this.wrapper = new BaseComponent({ tag: "a", classNames: ["chat__user-item-wrapper"] })

    this.login = user.login
    this.status = user.isLogined

    this.setAttribute("dataset-login", this.login)

    this.setLogin(this.login)
    this.setStatus(this.status)

    this.appendChildComponent(this.wrapper)
  }

  public setLogin(login: string): void {
    const name = new BaseComponent({ tag: "p", classNames: ["chat__user-item__login"] })
    name.setTextContent(login)
    this.wrapper.appendChildComponent(name)
  }

  public setStatus(status: boolean): void {
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
