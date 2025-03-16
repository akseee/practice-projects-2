import type { TOption } from "../utils/types"

export default class OptionsModel {
  private _options: TOption[]
  // public validOptions: TOption[]
  constructor() {
    this._options = []
    // this.validOptions = [...this.options].filter(
    //   (option) => option.weight > 0 && option.title !== "",
    // )
    const storedOptions = localStorage.getItem("options")
    if (storedOptions) {
      this._options = JSON.parse(storedOptions)
    }
  }

  public get options(): TOption[] {
    return this._options
  }

  public set options(newOptions: TOption[]) {
    this._options = newOptions
    localStorage.setItem("options", JSON.stringify(this._options))
  }
}
