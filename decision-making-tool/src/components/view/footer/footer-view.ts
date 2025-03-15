import BaseComponent from "../../common/base-component"
import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  FOOTER = "footer",
  LINK = "link",
}

export default class FooterView extends View {
  constructor() {
    const parameters = {
      tag: "footer",
      classNames: [CSSClasses.WRAPPER, CSSClasses.FOOTER],
    }
    super(parameters)
    this.setLink("gh@akseee, 2025")
  }

  public setLink(text: string): void {
    this.destroyChildren()
    const link = new BaseComponent({ tag: "a", classNames: [CSSClasses.LINK] })
    link.setTextContent(text)
    link.setAttribute("href", "https://github.com/akseee")
    this.appendChildComponent(link)
  }
}
