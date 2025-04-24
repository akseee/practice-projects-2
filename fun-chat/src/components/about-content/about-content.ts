import BaseComponent from "../../shared/view/base-component"
import Button from "../button/button"

export default class AboutContent extends BaseComponent {
  public wrapper: BaseComponent
  constructor() {
    super({ tag: "div", classNames: ["about-content"] })

    this.wrapper = new BaseComponent({ tag: "div", classNames: ["about-wrapper"] })
    this.setTitle("About the application")
    this.setContent()
    this.appendChildComponent(this.wrapper)
  }

  private setTitle(text: string): void {
    const title = new BaseComponent({ tag: "h2", classNames: ["about__title"] })

    title.setTextContent(text)
    this.wrapper.appendChildComponent(title)
  }

  private setContent(): void {
    const text = new BaseComponent({ tag: "p", classNames: ["about__text"] })
    const text2 = new BaseComponent({ tag: "p", classNames: ["about__text"] })

    text.setTextContent(`What could be better than chatting with your friends using a chat app?`)
    text2.setTextContent(
      `The application was developed to demonstrate the Fun Chat assignment as part of the RSSchool JS/FE 2024Q4 course.`,
    )
    this.wrapper.appendChildrenComponents([text, text2])
  }

  public setNavigation(callback: () => void): void {
    const button = new Button("back", callback, "button")
    this.wrapper.appendChildComponent(button)
  }
}
