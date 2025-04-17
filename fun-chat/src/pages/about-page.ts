import BaseComponent from "../shared/base-component"

export default class AboutPage extends BaseComponent {
  constructor() {
    super({ tag: "section", classNames: ["about-page"] })

    const title = new BaseComponent({ tag: "h2", classNames: ["about__title"] })
    title.setTextContent("About this application")
    this.appendChildComponent(title)
  }
}
