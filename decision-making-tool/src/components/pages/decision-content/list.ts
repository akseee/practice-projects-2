import BaseComponent from "../../common/base-component"
import OptionInput from "../../common/option-input"
import type { TOption } from "../../utils/types"

const enum CSSClasses {
  OPTION_LIST = "option-list",
}

export default class OptionList extends BaseComponent {
  constructor(public list: TOption[]) {
    super({
      tag: "ul",
      classNames: [CSSClasses.OPTION_LIST],
    })

    list.forEach((option: TOption) => {
      this.addListItem(option)
    })
  }

  public addListItem(option: TOption): void {
    const li = new OptionInput(option)
    this.appendChildComponent(li)
  }

  public addOption(id: string): void {
    const li = new OptionInput(id)
    this.appendChildComponent(li)
  }
}
