import type WebSocketService from "../../services/websocket-service"
import BaseComponent from "../../shared/view/base-component"
import ChatInfo from "./chat-info/chat-info"
import Dialogue from "./dialogue/dialogue"
import UserList from "./user-list/user-list"

export default class Chat extends BaseComponent {
  protected userList: UserList
  protected dialogue: Dialogue
  protected chatInfo: ChatInfo

  constructor(protected ws: WebSocketService) {
    super({ tag: "div", classNames: ["chat-wrapper"] })

    this.ws = ws
    this.userList = new UserList()
    this.dialogue = new Dialogue()
    this.chatInfo = new ChatInfo()

    this.appendChildrenComponents([this.userList, this.dialogue, this.chatInfo])
    this.loadUsers()
  }

  public async loadUsers(): Promise<void> {
    try {
      const responseAuthenticated = await this.ws.getAllAuthenticatedUsers()
      const responseUnauthorized = await this.ws.getAllUnauthorizedUsers()

      if (responseAuthenticated && responseUnauthorized) {
        this.userList.setUsers([
          ...responseAuthenticated.payload.users,
          ...responseUnauthorized.payload.users,
        ])
      }
    } catch (error) {
      console.log("error has occured in loading users", error)
    }
  }
}
