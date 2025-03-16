import BaseComponent from "../../common/base-component"
import type { Slice, TOption } from "../../utils/types"

const enum CSSClasses {
  CANVAS = "canvas",
}

export default class Canvas extends BaseComponent {
  private ctx: CanvasRenderingContext2D | null = null
  private slicesData: Slice[] = []
  public center: { x: number; y: number }
  public radius: number

  constructor(
    private width: number,
    private height: number,
    public items: TOption[],
  ) {
    super({ tag: "canvas", classNames: [CSSClasses.CANVAS] })

    this.setAttribute("width", String(width))
    this.setAttribute("height", String(height))

    const node = this.getNode()
    if (node instanceof HTMLCanvasElement) {
      this.ctx = node.getContext("2d")
    }
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.radius = this.width * 0.4

    this.computeSlices()
    this.draw()
  }

  public computeSlices(): void {
    this.slicesData = this.items.map((item, index) => {
      const sliceAngle = (2 * Math.PI) / this.items.length
      const startAngle = index * sliceAngle
      const endAngle = (index + 1) * sliceAngle
      return { startAngle, endAngle, option: item }
    })
  }

  public draw(): void {
    const colors = [" #968cf2", "#7a72c5", "#b4adf1"]
    let color = 0

    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.width, this.height)

    for (let index = 0; index < this.slicesData.length; index++) {
      if (color > colors.length - 1) {
        color = 0
      }

      const startAngle = 2 * Math.PI * (index / this.slicesData.length)
      const endAngle = 2 * Math.PI * ((index + 1) / this.slicesData.length)

      this.ctx.beginPath()
      this.ctx.moveTo(this.center.x, this.center.y)
      this.ctx.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle)

      this.ctx.fillStyle = colors[color]
      this.ctx.fill()

      color++
    }

    const pointerLength = 30
    this.ctx.beginPath()
    this.ctx.fillStyle = "#FFFFFF"

    this.ctx.moveTo(this.center.x, this.center.y - this.radius + pointerLength)
    this.ctx.lineTo(this.center.x - 20, this.center.y - this.radius)
    this.ctx.lineTo(this.center.x + 20, this.center.y - this.radius)
    this.ctx.closePath()
    this.ctx.fill()
  }

  public getSliceIndexByAngle(angle: number): number {
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    for (let index = 0; index < this.slicesData.length; index++) {
      const slice = this.slicesData[index]
      if (normalizedAngle >= slice.startAngle && normalizedAngle < slice.endAngle) {
        return index
      }
    }
    return 0
  }

  public getSliceByIndex(index: number): Slice {
    return this.slicesData[index]
  }

  public getSliceByOption(option: TOption): Slice {
    return this.slicesData.find((slice) => slice.option.id === option.id)!
  }
}
