import { type TUser } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"
import UserItem from "../user-item/user-item"

export default class UserList extends BaseComponent {
  constructor() {
    super({ tag: "ul", classNames: ["chat__user-list"] })
  }

  public setUsers(list: TUser[]): void {
    console.log(list)

    list.forEach((user, index) => {
      const userItem = new UserItem(user)
      if (index === 3) {
        userItem.setActiveChat(true)
      }
      this.appendChildComponent(userItem)
    })
  }
}
