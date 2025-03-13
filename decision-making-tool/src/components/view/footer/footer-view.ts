import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  FOOTER = "footer",
}

export default class FooterView extends View {
  constructor() {
    const parameters = {
      tag: "footer",
      classNames: [CSSClasses.WRAPPER, CSSClasses.FOOTER],
    }
    super(parameters)
  }
}
