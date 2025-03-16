import BaseComponent from "../../common/base-component"
import OptionsModel from "../../model/options-model"
import PickingControls from "./picking-controls"

import type { TOption } from "../../utils/types"
import Wheel from "./wheel"

export default class PickingContent extends BaseComponent {
  public controls: PickingControls
  public model: OptionsModel
  public result: BaseComponent
  public time: number
  public wheel: Wheel

  constructor() {
    super({ tag: "section", classNames: [] })
    this.model = new OptionsModel()
    this.controls = new PickingControls()

    this.result = new BaseComponent({ tag: "p", classNames: ["special"] })
    this.result.setTextContent("Нажмите старт")

    this.time = 5

    const items: TOption[] = [
      { id: "0", title: "one", weight: 2 },
      { id: "1", title: "two", weight: 5 },
      { id: "2", title: "three", weight: 3 },
      { id: "3", title: "three", weight: 55 },
      { id: "2", title: "three", weight: 3 },
    ]
    this.wheel = new Wheel(items, this.time)

    this.wheel.onSliceChange = (): void => {
      // option: TOption
      // this.updateResultContent("Начало: " + option.title)
    }
    this.wheel.onSpinEnd = (): void => {
      // winningOption: TOption
      // this.updateResultContent("Победитель: " + winningOption.title)
    }

    this.appendChildrenComponents([this.controls, this.result, this.wheel])

    this.configBaseControls()
  }
  public updateResultContent(text: string): void {
    this.result.setTextContent(text)
  }

  public configBaseControls(): void {
    this.controls.createButton("back", () => this.handleBack())
    this.controls.createButton("turn off sound", () => this.toggleSound())
    this.controls.createTimerButton((time: string) => this.setupTimer(time))
  }

  public startWheel(): void {
    console.log("Запуск колеса")
    this.wheel.spinWheel()
  }

  public setupTimer(time: string): void {
    this.time = Number(time)
  }

  public handleBack(): void {
    console.log("Возврат назад")
  }

  public toggleSound(): void {
    console.log("Переключение звука")
  }
}
