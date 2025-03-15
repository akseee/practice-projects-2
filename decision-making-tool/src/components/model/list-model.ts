import type { TOption } from "../utils/types"

const optionsMock = [
  { id: "1", weight: 2, title: "heavy rain" },
  { id: "2", weight: 2, title: "left4dead2" },
  { id: "3", title: "New Option", weight: 30 },
  { id: "4", title: "New Option", weight: 30 },
]

export default class ListModel {
  private _options: TOption[]
  public test: string

  constructor() {
    this._options = optionsMock
    this.test = "test"
  }

  public get options(): TOption[] {
    return this._options
  }

  private set options(newOptions) {
    this._options = newOptions
  }
}
