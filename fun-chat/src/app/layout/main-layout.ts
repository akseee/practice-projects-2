import BaseComponent from "../../shared/base-component"
import { View } from "../../shared/view"

export default class MainLayout extends View {
  constructor() {
    super({
      tag: "main",
      classNames: ["main"],
    })
  }

  public setContent(component: HTMLElement | BaseComponent): void {
    this.destroyChildren()

    if (component instanceof BaseComponent) {
      this.appendChildComponent(component)
    }
  }
}
