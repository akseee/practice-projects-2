import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  HEADER = "header",
}

export default class HeaderView extends View {
  constructor() {
    const parameters = {
      tag: "header",
      classNames: [CSSClasses.WRAPPER, CSSClasses.HEADER],
    }
    super(parameters)
  }
}
