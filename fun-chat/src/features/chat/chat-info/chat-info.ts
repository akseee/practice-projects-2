import { type TUser } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"

export default class ChatInfo extends BaseComponent {
  constructor() {
    super({ tag: "div", classNames: ["chat__info"] })

    this.setData({ login: "Choose chat", isLogined: false })
  }

  public setData(user: TUser): void {
    this.destroyChildren()

    const name = new BaseComponent({ tag: "p", classNames: ["chat__info-name"] })
    const icon = new BaseComponent({ tag: "div", classNames: ["chat__user-item__status"] })

    name.setTextContent(user.login)
    if (user.login === "Choose chat" && user.isLogined === false) {
      icon.removeClass("offline")
      icon.removeClass("online")
    } else if (user.isLogined) {
      icon.addClass("online")
      icon.removeClass("offline")
    } else {
      icon.removeClass("online")
      icon.addClass("offline")
    }

    this.appendChildComponent(name)
    this.appendChildComponent(icon)
  }
}
