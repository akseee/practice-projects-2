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
  public rotationAngle: number = 0

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
    const totalWeight = this.items.reduce((sum, item) => sum + item.weight, 0)
    let currentAngle = 0

    this.slicesData = this.items.map((item) => {
      const proportion = item.weight / totalWeight

      const sliceAngle = proportion * 2 * Math.PI
      const startAngle = currentAngle
      const endAngle = currentAngle + sliceAngle

      currentAngle = endAngle

      return {
        startAngle,
        endAngle,
        option: item,
        color: this.randomizeColor(),
      }
    })
  }

  public randomizeColor(): string {
    const hue = Math.floor(Math.random() * 360)
    return `hsla(${hue}, ${70}%, ${70}%, 1)`
  }

  public draw(): void {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.ctx.save()
    this.ctx.translate(this.center.x, this.center.y)
    this.ctx.rotate(this.rotationAngle)
    this.ctx.translate(-this.center.x, -this.center.y)

    for (const slice of this.slicesData) {
      this.drawSlice(slice)
      this.drawSliceText(slice)
    }

    this.ctx.restore()
    this.drawCursor()
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

  private drawSlice(slice: Slice): void {
    if (!this.ctx) return
    this.ctx.beginPath()
    this.ctx.moveTo(this.center.x, this.center.y)
    this.ctx.arc(this.center.x, this.center.y, this.radius, slice.startAngle, slice.endAngle)
    this.ctx.fillStyle = slice.color
    this.ctx.fill()
  }

  private drawSliceText(slice: Slice): void {
    if (!this.ctx) return

    const midAngle = (slice.startAngle + slice.endAngle) / 2
    const textRadius = this.radius * 0.6
    const x = this.center.x + Math.cos(midAngle) * textRadius
    const y = this.center.y + Math.sin(midAngle) * textRadius

    this.ctx.save()
    this.ctx.translate(x, y)
    this.ctx.rotate(midAngle)

    this.ctx.font = "16px Arial"
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"

    const text = slice.option.title
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fillText(text, 0, 0)

    this.ctx.restore()
  }

  private drawCursor(): void {
    if (!this.ctx) return
    this.ctx.beginPath()
    this.ctx.moveTo(this.center.x, this.center.y - this.radius + 30)
    this.ctx.lineTo(this.center.x - 20, this.center.y - this.radius)
    this.ctx.lineTo(this.center.x + 20, this.center.y - this.radius)
    this.ctx.closePath()
    this.ctx.fillStyle = "#ffffff"
    this.ctx.lineWidth = 2
    this.ctx.fill()
  }
}
