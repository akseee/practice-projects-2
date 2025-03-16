import BaseComponent from "../../common/base-component"
import Button from "../../common/button"
import type { TOption } from "../../utils/types"
import Canvas from "./canvas"

const enum CSSClasses {
  WHEEL = "wheel-container",
  START_BUTTON = "start-button",
}

export default class Wheel extends BaseComponent {
  public startButton: Button
  public canvas: Canvas
  public items: TOption[]
  public time: number

  constructor(items: TOption[], time: number) {
    super({ tag: "div", classNames: [CSSClasses.WHEEL] })
    this.items = items
    this.time = time

    this.startButton = new Button("start", () => this.spinWheel())
    this.startButton.addClass(CSSClasses.START_BUTTON)

    this.canvas = new Canvas(700, 700, items)

    this.appendChildrenComponents([this.canvas, this.startButton])
  }

  // private getWeightedRandomOption(): TOption {}

  public spinWheel(): void {
    this.startButton.disable()
    // const duration = this.time * 1000

    requestAnimationFrame(this.animateSpin)
  }

  public animateSpin(): void {
    // currentTime: number
  }

  public onSliceChange(): void {
    console.log("onSpinEnd")
  }

  public onSpinEnd(): void {
    console.log("onSpinEnd")
  }
}
