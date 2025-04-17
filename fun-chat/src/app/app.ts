import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import AboutPage from "../pages/about-page"
import ChatsPage from "../pages/chats-page"
import LoginPage from "../pages/login-page"
import ChatsState from "../services/chats-state-service"

import UserState from "../services/user-state-service"
import WebSocketService from "../services/websocket-service"
import { EnumPages } from "../shared/routes"
import MainLayout from "./layout/main-layout"
import Router, { type TRoute } from "./routing"

export default class App {
  protected userState: UserState
  protected chatsState: ChatsState

  protected wsService: WebSocketService

  protected router: Router

  protected main: MainLayout
  protected loginPage: LoginPage
  protected chatsPage: ChatsPage
  protected aboutPage: AboutPage

  constructor() {
    this.userState = new UserState()
    this.chatsState = new ChatsState()

    this.wsService = new WebSocketService()

    this.router = new Router(this.createRoutes(), this.userState)
    this.main = new MainLayout()

    this.loginPage = new LoginPage(this.userState, this.router, this.wsService)
    this.chatsPage = new ChatsPage(this.chatsState, this.userState, this.router)
    this.aboutPage = new AboutPage()
  }

  // private handleUserLogin(data:): void {
  //   console.log("User logged in:", data)
  //   this.userState.setCurrentUser(data.payload.user)
  //   this.userState.setAuth(true)
  // }

  // private handleUserLogout(data): void {
  //   console.log("User logged out:", data)
  //   this.userState.setCurrentUser(null)
  //   this.userState.setAuth(false)
  // }

  public render(): void {
    const footer = new Footer()

    const user = this.userState.currentUser()
    const header = new Header({ auth: this.userState.isAuth(), name: user ? user.name : "" })

    document.body.classList.add("body")
    document.body.append(header.getHtmlElement())
    document.body.append(this.main.getHtmlElement())
    document.body.append(footer.getHtmlElement())
  }

  public createRoutes(): TRoute[] {
    return [
      {
        path: "",
        callback: (): void => {
          this.main.setContent(this.loginPage)
        },
      },
      {
        path: EnumPages.LOGIN,
        callback: (): void => {
          this.main.setContent(this.loginPage)
        },
      },
      {
        path: EnumPages.CHATS,
        callback: (): void => {
          this.main.setContent(this.chatsPage)
        },
        isProtected: true,
      },
      {
        path: EnumPages.ABOUT,
        callback: (): void => {
          this.main.setContent(this.aboutPage)
        },
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
