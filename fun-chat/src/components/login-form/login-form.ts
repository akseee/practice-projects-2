import Input from "../input/input"
import BaseComponent from "../../shared/base-component"
import Button from "../button/button"

export default class LoginForm extends BaseComponent {
  public loginInput: Input
  public passwordInput: Input
  public loginButton: Button

  public form: BaseComponent

  constructor() {
    super({ tag: "div", classNames: ["form-wrapper"] })

    this.setFormTitle("Log into your account!")

    this.form = new BaseComponent({ tag: "form", classNames: ["form"] })
    this.loginInput = new Input("login", "Login")
    this.passwordInput = new Input("password", "Password")

    // this.loginInput.setErrorText(true, "error")

    this.loginButton = new Button("login")
    this.loginButton.addClass("login__button")
    this.form.appendChildrenComponents([this.loginInput, this.passwordInput])

    this.appendChildrenComponents([this.form, this.loginButton])
  }

  public setFormTitle(text: string): void {
    const title = new BaseComponent({ tag: "h2", classNames: ["form__title"] })
    title.setTextContent(text)

    this.appendChildComponent(title)
  }
}
