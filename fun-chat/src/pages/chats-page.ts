import type ChatsState from "../services/chats-state-service"
import type UserState from "../services/user-state-service"
import type Router from "../shared/router/routing"
import BaseComponent from "../shared/view/base-component"

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
