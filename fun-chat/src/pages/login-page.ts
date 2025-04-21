// import type Router from "../app/routing"
import type Router from "../app/routing"
import LoginForm from "../components/login-form/login-form"
import type UserState from "../services/user-state-service"
import type WebSocketService from "../services/websocket-service"
import BaseComponent from "../shared/base-component"

export default class LoginPage extends BaseComponent {
  public form: LoginForm
  constructor(
    public state: UserState,
    public router: Router,
    public webSocket: WebSocketService,
  ) {
    super({ tag: "section", classNames: ["login-page"] })

    this.webSocket = webSocket
    this.form = new LoginForm(router, state, webSocket)

    this.appendChildComponent(this.form)

    globalThis.addEventListener("click", () => {
      console.log(state)
    })
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
}
