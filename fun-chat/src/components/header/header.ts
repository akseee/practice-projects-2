import BaseComponent from "../../shared/base-component"
import { type TUser } from "../../shared/types"
import { View } from "../../shared/view"
import Button from "../button/button"

export default class Header extends View {
  public user: TUser
  protected wrapper: BaseComponent
  constructor(user: TUser) {
    super({ tag: "header", classNames: ["header"] })

    this.user = user
    this.wrapper = new BaseComponent({ tag: "div", classNames: ["header-wrapper"] })
    this.render()
  }

  public render(): void {
    this.setTitle("fun-chat")
    this.setAbout("#")
    this.setUser(this.user)
    this.appendChildComponent(this.wrapper)
  }

  private setTitle(text: string): void {
    const title = new BaseComponent({ tag: "h1", classNames: ["header__title"] })
    const link = new BaseComponent({ tag: "a" })
    link.setAttribute("href", "/")
    link.setTextContent(text)
    title.appendChildComponent(link)
    this.wrapper.appendChildComponent(title)
  }

  public setUser(user: TUser): void {
    const userWrapper = new BaseComponent({ tag: "div", classNames: ["user-wrapper"] })
    if (user.auth) {
      const name = new BaseComponent({ tag: "p", classNames: ["header__user-name"] })
      name.setTextContent(`Hello, ${user.name}!`)

      const exitButton = new Button("logout")
      exitButton.addClass("exit-button")

      userWrapper.appendChildrenComponents([name, exitButton])
    }

    this.wrapper.appendChildComponent(userWrapper)
  }

  private setAbout(url: string): void {
    const link = new BaseComponent({ tag: "a", classNames: ["header__about-link"] })
    link.setTextContent("About us")
    link.setAttribute("href", url)

    this.wrapper.appendChildComponent(link)
  }
}
