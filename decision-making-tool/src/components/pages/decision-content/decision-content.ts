import BaseComponent from "../../common/base-component"
import ListModel from "../../model/list-model"
import Controls from "./controls"
import OptionList from "./list"

export default class DecisionContent extends BaseComponent {
  public list: OptionList
  public controls: Controls
  public model: ListModel

  constructor() {
    super({ tag: "section", classNames: [] })

    this.model = new ListModel()

    this.list = new OptionList(this.model.options)

    this.controls = new Controls()
    this.appendChildrenComponents([this.list, this.controls])

    this.configBaseControls()
  }

  public configBaseControls(): void {
    this.controls.createButton("add option", () => this.addOption())
  }

  public addOption(): void {
    this.list.addOption()
  }
}
