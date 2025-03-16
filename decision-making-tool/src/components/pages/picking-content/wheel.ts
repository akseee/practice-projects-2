import BaseComponent from "../../common/base-component"

const enum CSSClasses {
  WHEEL_WRAPPER = "wheel-wrapper",
  CANVAS = "canvas",
}

export default class Canvas extends BaseComponent {
  private ctx: CanvasRenderingContext2D | null = null

  constructor(
    private width: number,
    private height: number,
    private slices: number,
  ) {
    super({ tag: "canvas", classNames: [CSSClasses.CANVAS] })

    this.width = width
    this.height = height

    this.setAttribute("width", String(width))
    this.setAttribute("height", String(height))

    const node = this.getNode()
    if (node instanceof HTMLCanvasElement) {
      this.ctx = node.getContext("2d")
    }

    this.drawExample()
  }

  public getContext(): CanvasRenderingContext2D | null {
    return this.ctx
  }

  private drawExample(): void {
    if (!this.ctx) return
    const center = { x: this.width / 2, y: this.height / 2 }
    const radius = this.width * 0.4

    const colors = ["#968cf2", "#b4adf1", "#7a72c5"]

    const wheel = new Wheel(center, radius, this.slices, colors)

    let angle = 0

    const animate = (): void => {
      if (!this.ctx) return
      angle += 0.01
      this.ctx.clearRect(0, 0, this.width, this.height)
      wheel.draw(this.ctx, angle)
      requestAnimationFrame(animate)
    }

    animate()
  }

  public animate(value: number, context: CanvasRenderingContext2D, element: Wheel): void {
    value += 0.1
    element.draw(context)
  }
}

class Wheel {
  constructor(
    public center: { x: number; y: number },
    public radius: number,
    public slices: number,
    public colors: string[],
  ) {
    this.center = center
    this.radius = radius
    this.colors = colors
    this.slices = slices
  }

  public draw(context: CanvasRenderingContext2D, angle = Math.PI): void {
    let color = 0
    for (let index = 0; index < this.slices; index++) {
      if (color > this.colors.length - 1) {
        color = 0
      }
      const startAngle = angle + 2 * Math.PI * (index / this.slices)
      const endAngle = angle + 2 * Math.PI * ((index + 1) / this.slices)

      context.beginPath()
      context.moveTo(this.center.x, this.center.y)
      context.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle)

      context.fillStyle = this.colors[color]
      context.fill()

      color++
    }
  }
}
