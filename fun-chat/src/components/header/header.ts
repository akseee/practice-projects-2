import BaseComponent from "../../shared/base-component"
import { View } from "../../shared/view"
import Button from "../button/button"

export default class Header extends View {
  protected wrapper: BaseComponent
  constructor() {
    super({ tag: "header", classNames: ["header"] })

    this.wrapper = new BaseComponent({ tag: "div", classNames: ["wrapper"] })
    this.setTitle("fun-chat")
    this.setAbout("#")
    this.setUser({ auth: true, name: "axe" })
    this.appendChildComponent(this.wrapper)
  }

  private setTitle(text: string): void {
    const title = new BaseComponent({ tag: "h1", classNames: ["title"] })
    title.setTextContent(text)
    this.wrapper.appendChildComponent(title)
  }

  public setUser(user: { auth: boolean; name: string }): void {
    const userWrapper = new BaseComponent({ tag: "div", classNames: ["user-wrapper"] })
    if (user.auth) {
      const name = new BaseComponent({ tag: "p", classNames: ["user-name"] })
      name.setTextContent(`Hello, ${user.name}!`)

      const exitButton = new Button()
      exitButton.setTextContent("logout")
      exitButton.addClass("exit-button")

      userWrapper.appendChildrenComponents([name, exitButton])
    }

    this.wrapper.appendChildComponent(userWrapper)
  }

  private setAbout(url: string): void {
    const link = new BaseComponent({ tag: "a", classNames: ["about-link"] })
    link.setTextContent("About us")
    link.setAttribute("href", url)

    this.wrapper.appendChildComponent(link)
  }
}
