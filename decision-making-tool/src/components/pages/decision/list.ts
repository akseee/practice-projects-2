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
      const li = new OptionInput(option)
      this.addListItem(li)
    })
  }

  public addListItem(option: BaseComponent): void {
    this.appendChildComponent(option)
  }
}
