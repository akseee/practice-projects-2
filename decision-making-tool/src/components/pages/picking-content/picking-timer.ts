import BaseComponent from "../../common/base-component"
import Svg from "../../common/svg"

const enum CSSClasses {
  TIMER_WRAPPER = "timer-wrapper",
}

export default class WheelTimer extends BaseComponent {
  constructor(public callback: (time: string) => void) {
    super({ tag: "label", classNames: [CSSClasses.TIMER_WRAPPER] })
    const svg = new Svg("../../../assets/timer.svg")

    const input = new BaseComponent({ tag: "input", classNames: [] })
    input.setAttribute("value", 5)
    input.setAttribute("placeholder", "sec")
    input.setAttribute("type", "number")
    input.setAttribute("min", "5")
    input.setAttribute("required", "true")
    input.setAttribute("defaultValue", "5")
    input.getNode().addEventListener("change", (event: Event) => {
      const target = event.target
      if (target instanceof HTMLInputElement && target) {
        if (Number(target.value) < 5) {
          target.value = "5"
        }
        callback(target.value)
      }
      return
    })

    this.appendChildrenComponents([svg, input])
  }
}
