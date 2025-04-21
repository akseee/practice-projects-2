import BaseComponent from "../../shared/base-component"
import { View } from "../../shared/view"

export default class Footer extends View {
  protected wrapper: BaseComponent
  constructor() {
    super({ tag: "footer", classNames: ["footer"] })
    this.wrapper = new BaseComponent({ tag: "div", classNames: ["footer-wrapper"] })

    this.render()
  }

  public render(): void {
    this.setLink("")
    this.setLogo()
    this.setAuthor("akseee")

    this.appendChildComponent(this.wrapper)
  }

  private setLogo(): void {
    const link = new BaseComponent({ tag: "a", classNames: ["footer__logo-link"] })
    link.setAttribute("href", "https://rs.school/courses/javascript-preschool-ru")
    link.setTextContent("RSschool")

    this.wrapper.appendChildComponent(link)
  }

  private setAuthor(name: string): void {
    const author = new BaseComponent({ tag: "p", classNames: ["footer__authour"] })
    author.setTextContent(`made by @${name}`)

    this.wrapper.appendChildComponent(author)
  }

  private setLink(url: string): void {
    const link = new BaseComponent({ tag: "a", classNames: ["footer__link"] })
    const year = new Date().getFullYear()

    link.setTextContent(`GH-pages, ${year}`)
    link.setAttribute("href", url)

    this.wrapper.appendChildComponent(link)
  }
}
