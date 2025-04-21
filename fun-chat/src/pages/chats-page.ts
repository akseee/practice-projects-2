import type Router from "../app/routing"
import type ChatsState from "../services/chats-state-service"
import type UserState from "../services/user-state-service"
import BaseComponent from "../shared/base-component"

export default class ChatsPage extends BaseComponent {
  constructor(
    public chatsState: ChatsState,
    public userState: UserState,
    public router: Router,
  ) {
    super({ tag: "section", classNames: ["chats-page"] })

    const title = new BaseComponent({ tag: "h2", classNames: ["chats__title"] })
    title.setTextContent("chats!")

    this.appendChildComponent(title)
  }
}
