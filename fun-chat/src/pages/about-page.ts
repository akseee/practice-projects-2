import AboutContent from "../components/about-content/about-content"
import BaseComponent from "../shared/base-component"

export default class AboutPage extends BaseComponent {
  public content: AboutContent
  constructor() {
    super({ tag: "section", classNames: ["about-page"] })

    this.content = new AboutContent()

    this.appendChildComponent(this.content)
  }
}
