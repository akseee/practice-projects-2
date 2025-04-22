import Chat from "../features/chat/chat"
import type ChatsState from "../services/chats-state-service"
import type UserState from "../services/user-state-service"
import type WebSocketService from "../services/websocket-service"
import type Router from "../shared/router/routing"
import BaseComponent from "../shared/view/base-component"

export default class ChatsPage extends BaseComponent {
  constructor(
    public chatsState: ChatsState,
    public userState: UserState,
    public router: Router,
    public ws: WebSocketService,
  ) {
    super({ tag: "section", classNames: ["chats-page"] })

    const chat = new Chat(ws, userState)

    this.appendChildComponent(chat)
  }
}
