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
  public wheelOptions: TOption[]
  public time: number

  public startAngle: number = 0
  public targetAngle: number = 0
  public animationStartTime: number = 0
  public isSpinning: boolean = false
  public currentSliceIndex: number = -1

  public onSliceChange: (option: TOption) => void = () => {}
  public onSpinEnd: (option: TOption) => void = () => {}

  constructor() {
    super({ tag: "div", classNames: [CSSClasses.WHEEL] })
    this.wheelOptions = []
    this.time = 5

    this.startButton = new Button("Старт", () => this.spinWheel())
    this.startButton.addClass(CSSClasses.START_BUTTON)

    this.canvas = new Canvas(500, 500, this.wheelOptions)

    this.appendChildrenComponents([this.canvas, this.startButton])
  }

  public updateOptions(newOptions: TOption[]): void {
    this.wheelOptions = this.shuffleItems(newOptions)
    this.canvas.updateOptions(this.wheelOptions)
    this.canvas.draw()
  }

  public setTime(time: string): void {
    this.time = Number(time)
  }

  public spinWheel(): void {
    if (this.isSpinning) return
    this.startButton.disable()
    this.isSpinning = true
    this.startAngle = this.canvas.rotationAngle
    const fullRotations = 5
    const randomAngle = Math.random() * 2 * Math.PI
    this.targetAngle = this.startAngle + fullRotations * 2 * Math.PI + randomAngle
    this.animationStartTime = performance.now()
    requestAnimationFrame(this.animateSpin)
  }

  private animateSpin = (timestamp: number): void => {
    if (!this.isSpinning) return

    const elapsed = timestamp - this.animationStartTime
    const progress = Math.min(elapsed / (this.time * 1000), 1)
    const easedProgress = this.easeInOutQuad(progress)

    this.canvas.rotationAngle =
      this.startAngle + (this.targetAngle - this.startAngle) * easedProgress

    this.canvas.draw()

    const pointerAngle = -Math.PI / 2
    const effectiveAngle =
      (((pointerAngle - this.canvas.rotationAngle) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

    const currentIndex = this.canvas.getSliceIndexByAngle(effectiveAngle)
    if (currentIndex !== this.currentSliceIndex) {
      this.currentSliceIndex = currentIndex
      this.onSliceChange(this.canvas.getSliceByIndex(currentIndex).option)
    }

    if (progress < 1) {
      requestAnimationFrame(this.animateSpin)
    } else {
      this.onSpinEnd(this.canvas.getSliceByIndex(currentIndex).option)
      this.isSpinning = false
      this.startButton.enable()
    }
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  private shuffleItems(items: TOption[]): TOption[] {
    const shuffled = [...items]
    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomizedIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[randomizedIndex]] = [shuffled[randomizedIndex], shuffled[index]]
    }
    return shuffled
  }
}
