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
    this.count = Math.max(...this.options.map((option) => Number(option.id))) + 1
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
    const li = new OptionInput(option, this.removeOption.bind(this), this.updateData.bind(this))
    this.options.push(option)

    this.appendChildComponent(li)
    this.saveToLS()
  }

  public updateData(data: TOption): void {
    const index = this.options.findIndex((option) => option.id === data.id)
    if (index !== -1) {
      this.options[index] = data
      this.saveToLS()
    }
  }

  public removeOption(id: string, node: OptionInput): void {
    this.options = this.options.filter((item) => item.id !== id)
    this.removeChildComponent(node)
    this.saveToLS()
  }

  public getOptions(): TOption[] {
    return this.options
  }

  public clearList(): void {
    this.destroyChildren()
    this.options.length = 0
    this.saveToLS()
  }

  public saveToLS(): void {
    localStorage.setItem("options", JSON.stringify(this.options))
  }
}
