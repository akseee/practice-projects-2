import Input from "../input/input"
import BaseComponent from "../../shared/base-component"
import Button from "../button/button"
import type Router from "../../app/routing"
import type UserState from "../../services/user-state-service"
import type WebSocketService from "../../services/websocket-service"
import { EnumPages } from "../../shared/routes"
import ErrorSpan from "../error-span/error-span"

export default class LoginForm extends BaseComponent {
  public loginInput: Input
  public passwordInput: Input
  public loginButton: Button

  public errorSpan: ErrorSpan
  public form: BaseComponent

  public router: Router
  public state: UserState
  public ws: WebSocketService

  constructor(router: Router, state: UserState, ws: WebSocketService) {
    super({ tag: "div", classNames: ["form-wrapper"] })

    this.router = router
    this.state = state
    this.ws = ws

    this.setFormTitle("Log into your account!")

    this.form = new BaseComponent({ tag: "form", classNames: ["form"] })
    this.loginInput = new Input("login", "Login")
    this.passwordInput = new Input("password", "Password", "password")

    this.loginButton = new Button("login", () => console.log("loggining in"))
    this.loginButton.addClass("login__button")

    this.errorSpan = new ErrorSpan()

    this.form.appendChildrenComponents([
      this.loginInput,
      this.passwordInput,
      this.loginButton,
      this.errorSpan,
    ])

    this.form.addListener("submit", this.handleSubmit.bind(this))
    this.appendChildComponent(this.form)
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault()

    if (!this.validateFields()) {
      return
    }

    const login = this.loginInput.getValue().trim()
    const password = this.passwordInput.getValue().trim()

    try {
      const response = await this.ws.login(login, password)

      if (response.payload?.user) {
        this.state.addUserToSessionStorage(response.payload.user)
        this.state.setCurrentUser(response.payload.user)

        this.router.navigate(EnumPages.CHATS, true)
      } else {
        this.errorSpan.setError(true, response.payload?.error)
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  public setFormTitle(text: string): void {
    const title = new BaseComponent({ tag: "h2", classNames: ["form__title"] })
    title.setTextContent(text)

    this.appendChildComponent(title)
  }

  private validateFields(): boolean {
    let isValid = true
    const login = this.loginInput.getValue().trim()
    const password = this.passwordInput.getValue().trim()

    this.loginInput.setErrorText(false, "")
    this.passwordInput.setErrorText(false, "")

    if (!login) {
      this.loginInput.setErrorText(true, "Login cannot be empty!")
      isValid = false
    } else if (login.length < 3) {
      this.loginInput.setErrorText(true, "Login should be at least 4 symbols")
      isValid = false
    }

    if (!password) {
      this.passwordInput.setErrorText(true, "Password cannot be empty!")
      isValid = false
    } else if (password.length < 5) {
      this.passwordInput.setErrorText(true, "Password should be at least 6 symbols")
      isValid = false
    } else if (!/[a-z]/.test(password)) {
      this.passwordInput.setErrorText(
        true,
        "Password should consist at least one lower case letter",
      )
      isValid = false
    } else if (!/[A-Z]/.test(password)) {
      this.passwordInput.setErrorText(
        true,
        "Password should consist at least one upper case letter",
      )
      isValid = false
    }

    return isValid
  }
}
