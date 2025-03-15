import BaseComponent from "../../common/base-component"
import OptionsModel from "../../model/options-model"
import type { TOption } from "../../utils/types"
import DecisionControls from "./decision-controls"
import OptionList from "./list"

export default class DecisionContent extends BaseComponent {
  public list: OptionList
  public controls: DecisionControls
  public model: OptionsModel

  constructor() {
    super({ tag: "section", classNames: [] })

    this.model = new OptionsModel()
    this.list = new OptionList(this.model.options)
    this.controls = new DecisionControls()

    this.appendChildrenComponents([this.controls, this.list])

    this.configBaseControls()
  }

  public configBaseControls(): void {
    this.controls.createButton("add option", () => this.addOption())
    this.controls.createButton("paste list", () => this.pasteList())
    this.controls.createButton("clear list", () => this.clearList())

    this.controls.createSaveFileButton("save list to file", this.getAllData())
    this.controls.createLoadFileButton("load list from file", () => this.loadFromFile())

    this.controls.createButton("start", () => this.start())
    this.controls.createButton("temp: check all data", () =>
      console.log(console.log(this.getAllData())),
    )
  }

  public addOption(): void {
    this.list.addOption()
  }

  public pasteList(): void {
    console.log("yet to be implemented")
  }

  public clearList(): void {
    this.list.clearList()
  }

  private getAllData(): TOption[] {
    const data = this.list.getListValues()
    return data
  }

  public start(): void {
    const data = this.getAllData()
    this.model.options = data
  }

  public saveToFile(): void {}

  public loadFromFile(): void {}
}
