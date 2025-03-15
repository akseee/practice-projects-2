import BaseComponent from "./common/base-component"
import DecisionContent from "./pages/decision-content/decision-content"
// import PickingContent from "./pages/picking-content/picking-content"

import FooterView from "./view/footer/footer-view"
import HeaderView from "./view/header/header-view"
import MainView from "./view/main/main-view"

const enum CSSClasses {
  APP = "app",
}

export default class App extends BaseComponent {
  // protected router: Router
  constructor() {
    const appParameters = {
      tag: "div",
      classNames: [CSSClasses.APP],
    }
    super(appParameters)
  }

  public render(): void {
    const decisionContent = new DecisionContent()
    // const pickingContent = new PickingContent()

    const header = new HeaderView()
    const main = new MainView(decisionContent)
    const footer = new FooterView()

    this.appendChildrenComponents([header, main, footer])
    document.body.append(this.getNode())
  }

  // public setup(): void {
  //   return console.log("setup")
  // }
}
