import BaseComponent from "../../common/base-component"
import Button from "../../common/button"
import type { TOption } from "../../utils/types"

const enum CSSClasses {
  CONTROLS_WRAPPER = "controls-wrapper",
}
export default class Controls extends BaseComponent {
  constructor() {
    super({ tag: "div", classNames: [CSSClasses.CONTROLS_WRAPPER] })
  }

  public createButton(text: string, callback: () => void): void {
    const button = new Button(text, callback)
    this.appendChildComponent(button)
  }

  public createLoadFileButton(text: string, callback: () => void): void {
    const fileInput = new BaseComponent({ tag: "input", classNames: ["file-input"] })
    fileInput.setAttribute("type", "file")
    fileInput.setAttribute("accept", "application/json")
    fileInput.setAttribute("style", "display:none")

    const button = new Button(text, callback)

    button.addListener("click", () => {
      fileInput.getNode().click()
    })

    this.appendChildrenComponents([fileInput, button])
  }

  public createSaveFileButton(text: string, data: TOption[]): void {
    const button = new Button(text, () => this.saveToFile(data))
    this.appendChildComponent(button)
  }

  public saveToFile(data: TOption[]): void {
    const json = JSON.stringify(data, null, 2)

    const blob = new Blob([json], { type: "application/json" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.href = url
    link.download = "data.json"

    link.click()
  }
}
