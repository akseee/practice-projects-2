import BaseComponent from "../../common/base-component"
import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  HEADER = "header",
  TITLE = "title",
}

export default class HeaderView extends View {
  constructor() {
    const parameters = {
      tag: "header",
      classNames: [CSSClasses.WRAPPER, CSSClasses.HEADER],
    }
    super(parameters)

    this.setTitle("Decision making tool")
  }

  public setTitle(text: string): void {
    this.destroyChildren()
    const title = new BaseComponent({ tag: "h1", classNames: [CSSClasses.TITLE] })
    title.setTextContent(text)
    this.appendChildComponent(title)
  }
}
