import type { TOption } from "../utils/types"

export default class OptionsModel {
  private _options: TOption[]
  private _valid: TOption[]
  constructor() {
    this._options = []

    this._valid = []

    const storedOptions = localStorage.getItem("options")
    if (storedOptions) {
      this._options = JSON.parse(storedOptions)
    }
    this.updateValidOptions()
  }

  public get options(): TOption[] {
    return this._options
  }

  public get valid(): TOption[] {
    return this._valid
  }

  public set valid(newValidOptions: TOption[]) {
    this._valid = newValidOptions
  }

  public set options(newOptions: TOption[]) {
    this._options = newOptions
    localStorage.setItem("options", JSON.stringify(this._options))
    this.updateValidOptions()
  }

  private updateValidOptions(): void {
    this.valid = this._options.filter((option) => option.weight > 0 && option.title !== "")
  }
}
