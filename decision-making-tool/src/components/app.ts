import BaseComponent from "./common/base-component"

import FooterView from "./view/footer/footer-view"
import HeaderView from "./view/header/header-view"
import MainView from "./view/main/main-view"

const enum CSSClasses {
  APP = "app",
}

export default class App extends BaseComponent {
  constructor() {
    super({
      tag: "div",
      classNames: [CSSClasses.APP],
    })
  }

  public render(): void {
    const header = new HeaderView()
    const main = new MainView()
    const footer = new FooterView()

    this.appendChildrenComponents([header, main, footer])
    document.body.append(this.getNode())
  }
}
