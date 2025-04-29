import { type TCurrentUser, type TUser } from "../../../shared/types/types"
import BaseComponent from "../../../shared/view/base-component"
import UserItem from "../../../components/user-item/user-item"

export default class UserList extends BaseComponent {
  public activeChat: null | TUser = null
  constructor() {
    super({ tag: "ul", classNames: ["chat__user-list"] })
  }

  public setActiveChat(user: TUser | null): void {
    this.activeChat = user
    const children = this.getChildren()

    children.forEach((child) => {
      const login = child.getNode().dataset.login
      if (user && login === user.login && child instanceof UserItem) {
        child.setActiveChat(true)
        child.resetUnreadCount()
      } else if (user && login !== user.login && child instanceof UserItem) {
        child.setActiveChat(false)
      }
    })
  }

  public setNewMessagesFromUser(from: string): void {
    const children = this.getChildren()
    children.find((child) => {
      const login = child.getNode().dataset.login
      if (login === from && child instanceof UserItem) {
        child.incrementUnreadCount()
      }
    })
  }

  public setUsers(
    list: TUser[],
    current: TCurrentUser | null,
    onClick: (user: TUser) => void,
  ): void {
    this.destroyChildren()

    list.forEach((user) => {
      if (current !== null && current.login === user.login) return
      const userItem = new UserItem()
      userItem.setUserIItemData(user)

      userItem.addListener("click", () => {
        onClick(user)
      })

      this.appendChildComponent(userItem)
      console.log(this.getChildren())
    })
  }
}
