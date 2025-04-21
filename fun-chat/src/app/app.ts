import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import MainLayout from "../components/layout/main-layout"
import AboutPage from "../pages/about-page"
import ChatsPage from "../pages/chats-page"
import LoginPage from "../pages/login-page"
import ChatsState from "../services/chats-state-service"

import UserState from "../services/user-state-service"
import WebSocketService from "../services/websocket-service"
import { EnumPages } from "../shared/router/routes"
import Router, { type TRoute } from "../shared/router/routing"

export default class App {
  protected userState: UserState
  protected chatsState: ChatsState

  protected wsService: WebSocketService

  protected router: Router

  protected main: MainLayout
  protected header: Header

  constructor() {
    this.userState = new UserState()
    this.chatsState = new ChatsState()

    this.wsService = new WebSocketService()

    this.logout = this.logout.bind(this)
    this.router = new Router(this.createRoutes(), this.userState)

    this.main = new MainLayout()
    this.header = new Header(this.router)
  }

  public render(): void {
    document.body.classList.add("body")

    const footer = new Footer()
    const user = this.userState.currentUser()
    this.header.setUser(user, this.logout)

    document.body.append(this.header.getHtmlElement())
    document.body.append(this.main.getHtmlElement())
    document.body.append(footer.getHtmlElement())
  }

  public async logout(): Promise<void> {
    const user = this.userState.userDetails()

    try {
      if (user) {
        const response = await this.wsService.logout(user.login, user.password)
        if (response.type === "ERROR") {
          console.log("Logout error:", response.payload.error)
          return
        }

        this.userState.setCurrentUser(null)
        this.userState.setUserDetails(null)
        this.header.activeUser(null)
        if (response.payload?.user) {
          this.router.navigate(EnumPages.LOGIN, true)
        }
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  public createRoutes(): TRoute[] {
    return [
      {
        path: "",
        callback: (): void => {
          const loginPage = new LoginPage(this.userState, this.router, this.wsService)

          this.main.setContent(loginPage)
        },
        isUnauth: true,
      },
      {
        path: EnumPages.LOGIN,
        callback: (): void => {
          const loginPage = new LoginPage(this.userState, this.router, this.wsService)
          this.main.setContent(loginPage)
        },
        isUnauth: true,
      },
      {
        path: EnumPages.CHATS,
        callback: (): void => {
          const chatsPage = new ChatsPage(this.chatsState, this.userState, this.router)
          this.main.setContent(chatsPage)

          const user = this.userState.currentUser()
          this.header.activeUser(user, this.logout)
        },
        isProtected: true,
      },
      {
        path: EnumPages.ABOUT,
        callback: (): void => {
          const aboutPage = new AboutPage()
          this.main.setContent(aboutPage)
        },
        isProtected: false,
        isUnauth: false,
      },

      {
        path: EnumPages.NOT_FOUND,
        callback: (): void => {
          // this.setContent()
        },
      },
    ]
  }
}
