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
    public options: TOption,
    private removeOption: (id: string, node: OptionInput) => void,
  ) {
    super({ tag: "li", classNames: [CSSClasses.OPTION_WRAPPER] })
    this.options = options

    this.createFilledInOption(options)
  }

  public createFilledInOption(options: TOption): void {
    const id = `option#${options.id}`
    const label = new BaseComponent({ tag: "label", classNames: [CSSClasses.LABEL] })
    label.setAttribute("for", id)
    label.setTextContent(`#${options.id}`)

    const titleInput = this.createInput({ name: "title", value: options.title })
    titleInput.setAttribute("id", id)

    const weightInput = this.createInput({ name: "weight", value: options.weight })
    weightInput.setAttribute("type", "number")

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

  public getValues(): TOption {
    const titleNode = this.getNode().querySelector<HTMLInputElement>('input[name="title"]')
    const weightNode = this.getNode().querySelector<HTMLInputElement>('input[name="weight"]')

    if (!titleNode || !weightNode) {
      return { id: "0", title: "", weight: 0 }
    }

    return {
      id: this.options.id,
      title: titleNode.value,
      weight: Number(weightNode.value),
    }
  }

  public destroyInput(): void {
    this.removeOption(this.options.id, this)
  }
}
