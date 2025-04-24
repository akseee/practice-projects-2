import { type TCurrentUser, type TUser } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"
import UserItem from "../../../components/user-item/user-item"

export default class UserList extends BaseComponent {
  constructor() {
    super({ tag: "ul", classNames: ["chat__user-list"] })
  }

  public setUsers(
    list: TUser[],
    current: TCurrentUser | null,
    onClick: (user: TUser) => void,
  ): void {
    list.forEach((user) => {
      if (current !== null && current.login === user.login) return
      const userItem = new UserItem()
      userItem.setUserIItemData(user)

      userItem.addListener("click", () => {
        onClick(user)
        userItem.addClass("active")
      })

      this.appendChildComponent(userItem)
    })
  }
}
