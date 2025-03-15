import BaseComponent from "../../common/base-component"
import OptionInput from "../../common/option-input"
import type { TOption } from "../../utils/types"

const enum CSSClasses {
  OPTION_LIST = "option-list",
}

export default class OptionList extends BaseComponent {
  public options: TOption[]
  public count: number
  constructor(public list: TOption[]) {
    super({
      tag: "ul",
      classNames: [CSSClasses.OPTION_LIST],
    })
    this.options = []
    this.renderList(list)
    this.count = list.length + 1
    console.log(this.options)
  }

  private renderList(list: TOption[]): void {
    list.forEach((option: TOption) => {
      this.addOption(option)
    })
  }

  public addOption(option?: TOption): void {
    if (!option) {
      option = { id: String(this.count), title: "", weight: 0 }
    }
    this.count++
    const li = new OptionInput(option, this.removeOption.bind(this))
    this.options.push(option)

    this.appendChildComponent(li)
  }

  public removeOption(id: string, node: OptionInput): void {
    this.options = this.options.filter((item) => item.id !== id)
    this.removeChildComponent(node)
  }

  public getListValues(): TOption[] {
    this.options = this.getChildren()
      .filter((child): child is OptionInput => child instanceof OptionInput) // Фильтруем только OptionInput
      .map((optionInput) => optionInput.getValues())

    return this.options
  }

  public clearList(): void {
    this.destroyChildren()
    this.options.length = 0
  }
}
