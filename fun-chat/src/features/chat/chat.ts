import {
  type TMessage,
  type TCurrentUser,
  type TUser,
  type UserExternalLoginResponse,
  type UserExternalLogoutResponse,
} from "../../shared/types/types"
import type UserState from "../../services/user-state-service"
import type WebSocketService from "../../services/websocket-service"
import BaseComponent from "../../shared/view/base-component"
import ChatInfo from "./chat-info/chat-info"
import Dialogue from "./dialogue/dialogue"
import UserList from "./user-list/user-list"
import type ChatsState from "../../services/chats-state-service"
import { getNotifications } from "../../components/notification/notification-singleton"

export default class Chat extends BaseComponent {
  protected userList: UserList
  protected dialogue: Dialogue
  protected chatInfo: ChatInfo

  protected chats: ChatsState
  protected onClick

  protected user: TCurrentUser | null
  constructor(
    protected ws: WebSocketService,
    protected userState: UserState,
    protected chatsState: ChatsState,
  ) {
    super({ tag: "div", classNames: ["chat-wrapper"] })

    this.user = userState.currentUser()
    this.chats = chatsState
    this.ws = ws

    this.ws.on("USER_EXTERNAL_LOGIN", this.handleExternalLogin.bind(this))
    this.ws.on("USER_EXTERNAL_LOGOUT", this.handleExternalLogout.bind(this))

    this.userList = new UserList()
    this.dialogue = new Dialogue()
    this.chatInfo = new ChatInfo()

    this.userState = userState
    this.onClick = this.onUserClick.bind(this)

    this.appendChildrenComponents([this.userList, this.dialogue, this.chatInfo])
    this.loadUsers()
  }

  private handleExternalLogin(message: UserExternalLoginResponse): void {
    const { login, isLogined } = message.payload.user
    if (isLogined) {
      getNotifications().showNotification(`User ${login} is online now`, "user")
      this.loadUsers()
    }
  }

  private handleExternalLogout(message: UserExternalLogoutResponse): void {
    const { login, isLogined } = message.payload.user
    if (!isLogined) {
      getNotifications().showNotification(`User ${login} is offline now`, "user")

      this.loadUsers()
    }
  }

  public async loadUsers(): Promise<void> {
    try {
      await this.ws.ready()
      const responseAuthenticated = await this.ws.getAllAuthenticatedUsers()
      const responseUnauthorized = await this.ws.getAllUnauthorizedUsers()

      const current = this.userState.currentUser()

      if (responseAuthenticated && responseUnauthorized) {
        this.userList.setUsers(
          [...responseAuthenticated.payload.users, ...responseUnauthorized.payload.users],
          current,
          this.onClick,
        )
      }
    } catch (error) {
      console.log("error has occured in loading users", error)
    }
  }

  public async onUserClick(user: TUser): Promise<void> {
    try {
      this.dialogue.clearMessages()
      await this.loadMessageHistory(user.login)
      this.dialogue.scrollToBottom()
      this.chatInfo.setData(user)

      this.dialogue.setSendHandler((text: string) => {
        void this.sendMessage(user.login, text)
      })

      this.dialogue.input.enableFields()
    } catch (error) {
      console.log("error has occured while loading chat", error)
    }
  }

  public async sendMessage(to: string, text: string): Promise<void> {
    try {
      const response = await this.ws.sendMessage(to, text)
      this.dialogue.scrollToBottom()

      if (response.type === "MSG_SEND" && response.payload.message) {
        this.dialogue.addMessage(response.payload.message, true)
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  protected async loadMessageHistory(user: string): Promise<void> {
    try {
      const response = await this.ws.fetchMessageHistory(user)
      const messages = response.payload.messages

      if (messages) {
        if (messages.length === 0) {
          this.dialogue.setEmptyChat()
          return
        }
        messages.forEach((message: TMessage) => {
          const owner = message.from === this.user?.login

          this.dialogue.addMessage(message, owner)
        })
      }
    } catch (error) {
      console.error("Failed to load message history:", error)
    }
  }
}
