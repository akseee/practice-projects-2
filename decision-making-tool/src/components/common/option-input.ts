import type { TOption } from "../utils/types"
import BaseComponent from "./base-component"
import Button from "./button"

type TInputOptions = TOption & {
  name: string
  value: string | number
}

const enum CSSClasses {
  OPTION_WRAPPER = "option-wrapper",
  LABEL = "label",
  INPUT = "input",
}

export default class OptionInput extends BaseComponent {
  constructor(public options: TOption) {
    super({ tag: "li", classNames: [CSSClasses.OPTION_WRAPPER] })

    this.createOption(options)
  }

  public createOption(options: TOption): void {
    const id = `option#${options.id}`
    const label = new BaseComponent({ tag: "label", classNames: [CSSClasses.LABEL] })
    label.setAttribute("for", id)
    label.setTextContent(`#${options.id}`)

    const titleInput = this.createInput({ ...options, name: "title", value: options.title })
    titleInput.setAttribute("id", id)

    const weightInput = this.createInput({ ...options, name: "weight", value: 1 })
    weightInput.setAttribute("type", "number")

    const deleteButton = new Button("Delete", () => console.log("click"))

    this.appendChildrenComponents([label, titleInput, weightInput, deleteButton])
  }

  public createInput(options: TInputOptions): BaseComponent {
    const input = new BaseComponent({ tag: "input", classNames: [CSSClasses.INPUT] })
    input.setAttribute("placeholder", options.name)
    input.setAttribute("value", String(options.value))
    input.setAttribute("name", options.name)

    return input
  }
}
