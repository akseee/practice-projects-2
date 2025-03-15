import BaseComponent from "../../common/base-component"
import OptionList from "./list"

const optionsMock = [
  { id: 1, weight: 2, title: "heavy rain" },
  { id: 2, weight: 2, title: "left4dead2" },
]
export default class DecisionContent extends BaseComponent {
  public list: OptionList
  constructor() {
    super({ tag: "section", classNames: [] })

    this.list = new OptionList(optionsMock)

    this.appendChildComponent(this.list)
  }
}
