import type { TOption } from "../utils/types"

const optionsMock = [
  { id: 1, weight: 2, title: "heavy rain" },
  { id: 2, weight: 2, title: "left4dead2" },
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

  public addOption(data: TOption): void {
    console.log(data)
    console.log(this.test)
  }

  public deleteById(id: number): void {
    this.options = this.options.filter((item) => item.id !== id)
    console.log("deletebyId")
  }

  public clearList(): void {
    this.options.length = 0
  }

  public pasteData(): void {
    console.log(this.test)
  }

  public loadFileData(): void {
    console.log(this.test)
  }

  public saveFileData(): void {
    console.log(this.test)
  }
}
console.log(ListModel)
