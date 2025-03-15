import BaseComponent from "../../common/base-component"
import OptionInput from "../../common/option-input"
import type { TOption } from "../../utils/types"

const enum CSSClasses {
  OPTION_LIST = "option-list",
}

export default class OptionList extends BaseComponent {
  public count: number
  constructor(public list: TOption[]) {
    super({
      tag: "ul",
      classNames: [CSSClasses.OPTION_LIST],
    })

    list.forEach((option: TOption) => {
      this.addListItem(option)
    })

    this.count = list.length + 1
  }

  public addListItem(option: TOption): void {
    const li = new OptionInput(option)
    this.appendChildComponent(li)
  }

  public addOption(): void {
    const li = new OptionInput(String(this.count))
    this.count++
    this.appendChildComponent(li)
  }

  public getListValues(): TOption[] {
    const children = this.getChildren()

    const values: TOption[] = children
      .filter((child): child is OptionInput => child instanceof OptionInput)
      .map((optionInput) => optionInput.getValues())
      .filter((value): value is TOption => value !== undefined)

    return values
  }
}
