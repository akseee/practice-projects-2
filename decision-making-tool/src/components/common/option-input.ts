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

    const titleInput = this.createInput({ name: "title", value: options.title })
    titleInput.setAttribute("id", id)
    titleInput.getNode().addEventListener("input", () => this.updateOption())

    const weightInput = this.createInput({ name: "weight", value: options.weight })
    weightInput.setAttribute("type", "number")
    weightInput.getNode().addEventListener("input", () => this.updateOption())

    const deleteButton = new Button("Delete", () => this.destroyInput())
    this.appendChildrenComponents([label, titleInput, weightInput, deleteButton])
  }

  public createInput(options: TInputOptions): BaseComponent {
    const input = new BaseComponent({ tag: "input", classNames: [CSSClasses.INPUT] })
    input.setAttribute("placeholder", options.name)
    input.setAttribute("value", String(options.value))
    input.setAttribute("name", options.name)

    return input
  }

  public updateOption(): void {
    const titleNode = this.getNode().querySelector<HTMLInputElement>('input[name="title"]')
    const weightNode = this.getNode().querySelector<HTMLInputElement>('input[name="weight"]')

    if (!titleNode || !weightNode) return

    this.option.title = titleNode.value
    this.option.weight = Number(weightNode.value)

    this.updateData({ ...this.option })
  }

  public destroyInput(): void {
    this.removeOption(this.option.id, this)
  }
}
