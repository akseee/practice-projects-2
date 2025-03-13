import BaseComponent from "./common/base-component"
import FooterView from "./view/footer/footer-view"
import HeaderView from "./view/header/header-view"
import MainView from "./view/main/main-view"

const enum CSSClasses {
  APP = "app",
}

export default class App extends BaseComponent {
  constructor() {
    const appParameters = {
      tag: "div",
      classNames: [CSSClasses.APP],
    }
    super(appParameters)

    document.body.append(this.getNode())
  }

  public render(): void {
    const header = new HeaderView()
    const main = new MainView()
    const footer = new FooterView()
    this.appendChildrenComponents([header, main, footer])
  }

  // public setup(): void {
  //   return console.log("setup")
  // }
}
