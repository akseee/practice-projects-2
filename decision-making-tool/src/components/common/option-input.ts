import type { TOption } from "../utils/types"
import BaseComponent from "./base-component"
import Button from "./button"

type TInputOptions = {
  id?: string
  name: string
  value: string | number
}

const enum CSSClasses {
  OPTION_WRAPPER = "option-wrapper",
  LABEL = "label",
  INPUT = "input",
}

export default class OptionInput extends BaseComponent {
  constructor(
    public option: TOption,
    private removeOption: (id: string, node: OptionInput) => void,
    private updateData: (option: TOption) => void,
  ) {
    super({ tag: "li", classNames: [CSSClasses.OPTION_WRAPPER] })
    this.option = option

    this.createOption(this.option)
  }

  public createOption(options: TOption): void {
    const id = `option#${options.id}`
    const label = new BaseComponent({ tag: "label", classNames: [CSSClasses.LABEL] })
    label.setAttribute("for", id)
    label.setTextContent(`#${options.id}`)

    const deleteButton = new Button("Delete", () => this.destroyInput())
    const titleInput = this.createInput({ name: "title", value: options.title })
    const weightInput = this.createInput({ name: "weight", value: options.weight })

    titleInput.setAttribute("id", id)
    weightInput.setAttribute("type", "number")

    const updateOption = (): void => {
      const titleValue = titleInput.getValue()
      const weightValue = weightInput.getValue()

      if (!titleValue || !weightValue) return

      this.option.title = titleValue
      this.option.weight = Number(weightValue)

      this.updateData({ ...this.option })
    }

    titleInput.getNode().addEventListener("input", () => updateOption())
    weightInput.getNode().addEventListener("input", () => updateOption())

    this.appendChildrenComponents([label, titleInput, weightInput, deleteButton])
  }

  public createInput(options: TInputOptions): BaseComponent {
    const input = new BaseComponent({ tag: "input", classNames: [CSSClasses.INPUT] })
    input.setAttribute("placeholder", options.name)
    input.setAttribute("value", String(options.value))
    input.setAttribute("name", options.name)

    return input
  }

  public destroyInput(): void {
    this.removeOption(this.option.id, this)
  }
}
