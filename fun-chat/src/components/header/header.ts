import BaseComponent from "../../shared/base-component"
import { type TUserResponse } from "../../shared/types"
import { View } from "../../shared/view"
import Button from "../button/button"

export default class Header extends View {
  protected wrapper: BaseComponent
  protected userWrapper: BaseComponent
  constructor() {
    super({ tag: "header", classNames: ["header"] })

    this.wrapper = new BaseComponent({ tag: "div", classNames: ["header-wrapper"] })
    this.userWrapper = new BaseComponent({ tag: "div", classNames: ["user-wrapper"] })

    this.render()
  }

  public render(): void {
    this.setTitle("fun-chat")
    this.setAbout("#")
    this.wrapper.appendChildComponent(this.userWrapper)
    this.appendChildComponent(this.wrapper)
  }

  public activeUser(user: TUserResponse | null): void {
    this.setUser(user)
  }

  private setTitle(text: string): void {
    const title = new BaseComponent({ tag: "h1", classNames: ["header__title"] })
    title.setAttribute("href", "")
    title.setTextContent(text)

    this.wrapper.appendChildComponent(title)
  }

  public setUser(user: TUserResponse | null): void {
    this.userWrapper.destroyChildren()
    console.log("setting")
    console.log(user)
    if (user !== null) {
      const name = new BaseComponent({ tag: "p", classNames: ["header__user-name"] })
      name.setTextContent(`Hello, ${user.login}!`)

      const exitButton = new Button("logout", () => console.log("logging out"))
      exitButton.addClass("exit-button")

      this.userWrapper.appendChildrenComponents([name, exitButton])
    }
  }

  private setAbout(url: string): void {
    const link = new BaseComponent({ tag: "a", classNames: ["header__about-link"] })
    link.setTextContent("About us")
    link.setAttribute("href", url)

    this.wrapper.appendChildComponent(link)
  }
}
