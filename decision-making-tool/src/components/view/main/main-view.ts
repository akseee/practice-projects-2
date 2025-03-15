import type BaseComponent from "../../common/base-component"
import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  MAIN = "main",
}

export default class MainView extends View {
  constructor(content: BaseComponent) {
    const parameters = {
      tag: "main",
      classNames: [CSSClasses.WRAPPER, CSSClasses.MAIN],
    }
    super(parameters)
    this.setContent(content)
  }

  public setContent(component: HTMLElement | BaseComponent): void {
    this.destroyChildren()
    this.appendChildComponent(component)
  }
}
