import BaseComponent from "../../common/base-component"
import OptionsModel from "../../model/options-model"
import PickingControls from "./picking-controls"
import Canvas from "./wheel"

export default class PickingContent extends BaseComponent {
  public controls: PickingControls
  public wheel: Canvas
  public model: OptionsModel

  public result: BaseComponent

  constructor() {
    super({ tag: "section", classNames: [] })
    this.model = new OptionsModel()
    this.controls = new PickingControls()
    this.wheel = new Canvas(700, 700, 5)

    this.result = new BaseComponent({ tag: "p", classNames: ["special"] })

    this.result.setTextContent("press start")

    this.appendChildrenComponents([this.controls, this.result, this.wheel])

    this.configBaseControls()
  }

  public updateResultContent(text: string): void {
    this.result.setTextContent(text)
  }

  public configBaseControls(): void {
    this.controls.createButton("back", () => this.handleBack())
    this.controls.createButton("turn off sound", () => this.toggleSound())
    this.controls.createButton("start", () => this.startWheel())
    this.controls.createTimerButton((time: string) => this.setupTimer(time))
  }

  public startWheel(): void {
    console.log("start wheel")
  }

  public setupTimer(time: string): string {
    return time
  }

  public handleBack(): void {
    console.log("route back")
  }

  public toggleSound(): void {
    console.log("toggle sound")
  }
}
