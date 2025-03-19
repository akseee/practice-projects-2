import BaseComponent from "../../common/base-component"
import OptionsModel from "../../model/options-model"
import { EnumPages } from "../../routes/pages"
import type Router from "../../routes/router"
import type { TOption } from "../../utils/types"
import Modal from "../../view/modal/modal"

import DecisionControls from "./decision-controls"
import OptionList from "./list"

export default class DecisionContent extends BaseComponent {
  public list: OptionList
  public controls: DecisionControls
  public model: OptionsModel

  constructor(public router: Router) {
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
    const data = JSON.stringify(this.getAllData())
    this.openModal(data, "confirm")
  }

  public clearList(): void {
    this.list.clearList()
  }

  public loadFromFile(): void {}

  private getAllData(): TOption[] {
    const data = this.list.getOptions()
    return data
  }

  public start(): void {
    const data = this.list.getValidOptions()
    if (data.length < 2) {
      const text = `Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0`
      this.openModal(text, "close")
    } else {
      this.router.navigate(EnumPages.WHEEL)
    }
  }

  public openModal(data: string, type: string): void {
    const modal = new Modal(data, type)
    modal.open()
  }
}
