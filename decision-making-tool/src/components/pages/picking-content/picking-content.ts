import BaseComponent from "../../common/base-component"
import OptionsModel from "../../model/options-model"
import PickingControls from "./picking-controls"

import type { TOption } from "../../utils/types"
import Wheel from "./wheel"
import type Router from "../../routes/router"
import { EnumPages } from "../../routes/pages"

export default class PickingContent extends BaseComponent {
  public controls: PickingControls
  public model: OptionsModel
  public result: BaseComponent
  public wheel: Wheel

  public isMuted: boolean = false

  constructor(public router: Router) {
    console.log("creating")
    super({ tag: "section", classNames: [] })
    this.model = new OptionsModel()
    this.controls = new PickingControls()

    this.result = new BaseComponent({ tag: "p", classNames: ["special"] })
    this.result.setTextContent("Нажмите старт")

    const items: TOption[] = [
      { id: "0", title: "one", weight: 2 },
      { id: "1", title: "two", weight: 5 },
      { id: "2", title: "three", weight: 3 },
      { id: "3", title: "four", weight: 3 },
      { id: "4", title: "five", weight: 3 },
    ]

    this.wheel = new Wheel(items)

    this.appendChildrenComponents([this.controls, this.result, this.wheel])

    this.configBaseControls()
    this.wheel.onSliceChange = (winningOption: TOption): void => {
      this.updateResultContent(winningOption.title)
      this.result.removeClass("highlighted")
    }

    this.wheel.onSpinEnd = (winningOption: TOption): void => {
      this.updateResultContent(winningOption.title)
      this.result.addClass("highlighted")
      // if (!this.isMuted) {
      //   new Audio("").play().catch(() => {})
      // }
    }
  }
  public updateResultContent(text: string): void {
    this.result.setTextContent(text)
  }

  public configBaseControls(): void {
    this.controls.createButton("back", () => this.handleBack())
    this.controls.createButton("turn off sound", () => this.toggleSound())
    this.controls.createTimerButton((time: string) => this.setupTimer(time))
  }

  public setupTimer(time: string): void {
    this.wheel.setTime(time)
  }

  public handleBack(): void {
    console.log("handing back")
    this.router.navigate(EnumPages.DECISION)
  }

  public toggleSound(): void {
    this.isMuted = !this.isMuted
  }
}
