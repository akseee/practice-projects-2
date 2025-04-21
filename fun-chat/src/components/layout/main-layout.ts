import type BaseComponent from "../../shared/view/base-component"
import { View } from "../../shared/view/view"

export default class MainLayout extends View {
  constructor() {
    super({
      tag: "main",
      classNames: ["main"],
    })
  }

  public setContent(component: HTMLElement | BaseComponent): void {
    this.destroyChildren()

    this.appendChildComponent(component)
  }
}
