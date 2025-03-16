import BaseComponent from "../../common/base-component"
import Button from "../../common/button"
import WheelTimer from "./wheel-timer"

const enum CSSClasses {
  CONTROLS_WRAPPER = "controls-wrapper",
}

export default class PickingControls extends BaseComponent {
  constructor() {
    super({ tag: "div", classNames: [CSSClasses.CONTROLS_WRAPPER] })
  }

  public createButton(text: string, callback: () => void): void {
    const button = new Button(text, callback)
    this.appendChildComponent(button)
  }

  public createTimerButton(callback: (time: string) => string): void {
    const clock = new WheelTimer(callback)
    this.appendChildComponent(clock)
  }
}
