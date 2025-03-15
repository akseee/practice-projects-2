import BaseComponent from "../../common/base-component"
import ListModel from "../../model/list-model"
import type { TOption } from "../../utils/types"
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
    this.controls.createButton("paste list", () => this.pasteList())
    this.controls.createButton("clear list", () => this.clearList())

    this.controls.createSaveFileButton("save list to file", this.getAllData())
    this.controls.createLoadFileButton("load list from file", () => this.loadFromFile())

    this.controls.createButton("start", () => this.start())
    this.controls.createButton("temp: check data", () =>
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

  private getValidData(): TOption[] {
    const data = this.list.getListValues().filter((value: TOption) => {
      return value.weight !== 0 && value.title !== ""
    })
    return data
  }

  private getAllData(): TOption[] {
    const data = this.list.getListValues()
    return data
  }

  public start(): void {
    const data = this.getValidData()
    console.log(data)
  }

  public saveToFile(): void {}

  public loadFromFile(): void {}
}
