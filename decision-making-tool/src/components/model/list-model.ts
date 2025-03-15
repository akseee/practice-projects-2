import type { TOption } from "../utils/types"

export default class ListModel {
  public options: TOption[]
  public test: string
  constructor() {
    this.options = []
    this.test = "test"
  }

  public deleteById(id: number): void {
    this.options.filter((item) => item.id !== id)
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

  public addOption(data: TOption): void {
    console.log(data)
    console.log(this.test)
  }
}
console.log(ListModel)
