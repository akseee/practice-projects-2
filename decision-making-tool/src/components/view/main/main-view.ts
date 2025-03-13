import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  MAIN = "main",
}

export default class MainView extends View {
  constructor() {
    const parameters = {
      tag: "main",
      classNames: [CSSClasses.WRAPPER, CSSClasses.MAIN],
    }
    super(parameters)
  }
}
