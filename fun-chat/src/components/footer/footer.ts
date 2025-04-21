import BaseComponent from "../../shared/view/base-component"
import { View } from "../../shared/view/view"

export default class Footer extends View {
  protected wrapper: BaseComponent
  constructor() {
    super({ tag: "footer", classNames: ["footer"] })
    this.wrapper = new BaseComponent({ tag: "div", classNames: ["footer-wrapper"] })

    this.render()
  }

  public render(): void {
    this.setAuthor("akseee", "https://github.com/akseee")
    this.setLogo()
    this.setLink()

    this.appendChildComponent(this.wrapper)
  }

  private setLogo(): void {
    const link = new BaseComponent({ tag: "a", classNames: ["footer__logo-link"] })
    link.setAttribute("href", "https://rs.school/courses/javascript-preschool-ru")
    link.setTextContent("RSschool")

    this.wrapper.appendChildComponent(link)
  }

  private setAuthor(name: string, link: string): void {
    const author = new BaseComponent({ tag: "a", classNames: ["footer__authour"] })
    author.setTextContent(`made by @${name}`)
    author.setAttribute("href", link)

    this.wrapper.appendChildComponent(author)
  }

  private setLink(): void {
    const link = new BaseComponent({ tag: "p", classNames: ["footer__year"] })

    link.setTextContent(`2025`)

    this.wrapper.appendChildComponent(link)
  }
}
