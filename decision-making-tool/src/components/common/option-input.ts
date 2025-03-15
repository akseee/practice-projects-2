import type { TOption } from "../utils/types"
import BaseComponent from "./base-component"
import Button from "./button"

type TInputOptions = {
  name: string
  value: string | number
}

const enum CSSClasses {
  OPTION_WRAPPER = "option-wrapper",
  LABEL = "label",
  INPUT = "input",
}

export default class OptionInput extends BaseComponent {
  public id: string
  constructor(public options: TOption | string) {
    super({ tag: "li", classNames: [CSSClasses.OPTION_WRAPPER] })
    this.options = options

    if (typeof options === "string") {
      this.createEmptyOption(options)
      this.id = options
    } else {
      this.createFilledInOption(options)
      this.id = options.id
    }
  }

  private createEmptyOption(id: string): void {
    const tag = `option#${id}}`
    const label = new BaseComponent({ tag: "label", classNames: [CSSClasses.LABEL] })
    label.setAttribute("for", tag)
    label.setTextContent(`#${id}`)

    const titleInput = this.createInput({ name: "title", value: "" })
    titleInput.setAttribute("id", id)

    const weightInput = this.createInput({ name: "weight", value: 0 })
    weightInput.setAttribute("type", "number")

    const deleteButton = new Button("Delete", () => this.destroyInput())

    this.appendChildrenComponents([label, titleInput, weightInput, deleteButton])
  }

  public createFilledInOption(options: TOption): void {
    const id = `option#${options.id}`
    const label = new BaseComponent({ tag: "label", classNames: [CSSClasses.LABEL] })
    label.setAttribute("for", id)
    label.setTextContent(`#${options.id}`)

    const titleInput = this.createInput({ name: "title", value: options.title })
    titleInput.setAttribute("id", id)

    const weightInput = this.createInput({ name: "weight", value: 0 })
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
      id: this.id,
      title: titleNode.value,
      weight: Number(weightNode.value),
    }
  }

  private destroyInput(): void {
    this.destroy()
  }
}
