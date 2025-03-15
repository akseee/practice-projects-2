import BaseComponent from "../../common/base-component"

const enum CSSClasses {
  WHEEL_WRAPPER = "wheel-wrapper",
}

export default class Wheel extends BaseComponent {
  constructor() {
    super({ tag: "div", classNames: [CSSClasses.WHEEL_WRAPPER] })
  }
}
