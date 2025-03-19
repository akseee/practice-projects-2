import BaseComponent from "../../common/base-component"
import type OptionsModel from "../../model/options-model"
import PickingControls from "./picking-controls"

import type { TOption } from "../../utils/types"
import Wheel from "./wheel"
import type Router from "../../routes/router"
import { EnumPages } from "../../routes/pages"

export default class PickingContent extends BaseComponent {
  public controls: PickingControls
  public result: BaseComponent
  public wheel: Wheel

  public isMuted: boolean = false

  constructor(
    public router: Router,
    public model: OptionsModel,
  ) {
    super({ tag: "section", classNames: [] })
    this.model = model
    this.controls = new PickingControls()

    this.result = new BaseComponent({ tag: "p", classNames: ["special"] })
    this.result.setTextContent("Нажмите старт")

    this.wheel = new Wheel()

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
    this.updateWheel()
  }

  public updateWheel(): void {
    this.wheel.updateOptions(this.model.valid)
    this.result.removeClass("highlighted")
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
    this.router.navigate(EnumPages.DECISION)
  }

  public toggleSound(): void {
    this.isMuted = !this.isMuted
  }
}
