import BaseComponent from "../../shared/view/base-component"
import { EnumPages } from "../../shared/router/routes"
import { type TCurrentUser } from "../../shared/types/types"
import Button from "../button/button"
import { View } from "../../shared/view/view"
import type Router from "../../shared/router/routing"

export default class Header extends View {
  protected wrapper: BaseComponent
  protected userWrapper: BaseComponent
  constructor(private router: Router) {
    super({ tag: "header", classNames: ["header"] })

    this.wrapper = new BaseComponent({ tag: "div", classNames: ["header-wrapper"] })
    this.userWrapper = new BaseComponent({ tag: "div", classNames: ["user-wrapper"] })

    this.router = router

    this.render()
  }

  public render(): void {
    this.setTitle("fun-chat")
    this.setAbout()
    this.wrapper.appendChildComponent(this.userWrapper)
    this.appendChildComponent(this.wrapper)
  }

  public activeUser(user: TCurrentUser | null, logoutMethod?: () => Promise<void>): void {
    this.setUser(user, logoutMethod)
  }

  private setTitle(text: string): void {
    const title = new BaseComponent({ tag: "h1", classNames: ["header__title"] })
    const link = new BaseComponent({ tag: "a" })

    link.setAttribute("href", "")
    link.setTextContent(text)
    link.addListener("click", (event: Event) => {
      event.preventDefault()
      this.router.navigate("")
    })

    title.appendChildComponent(link)
    this.wrapper.appendChildComponent(title)
  }

  public setUser(user: TCurrentUser | null, logoutMethod?: () => Promise<void>): void {
    this.userWrapper.destroyChildren()
    if (user !== null) {
      const name = new BaseComponent({ tag: "p", classNames: ["header__user-name"] })
      name.setTextContent(`Hello, ${user.login}!`)

      const exitButton = new Button("logout", async () => {
        if (logoutMethod) {
          await logoutMethod()
        }
      })
      exitButton.addClass("exit-button")

      this.userWrapper.appendChildrenComponents([name, exitButton])
    }
  }

  private setAbout(): void {
    const link = new BaseComponent({ tag: "a", classNames: ["header__about-link"] })
    link.setTextContent("About the application")
    link.setAttribute("href", "#/" + EnumPages.ABOUT)
    link.addListener("click", (event: Event) => {
      event.preventDefault()
      this.router.navigate(EnumPages.ABOUT)
    })
    this.wrapper.appendChildComponent(link)
  }
}
