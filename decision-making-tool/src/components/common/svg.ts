import BaseComponent from "./base-component"

export default class Svg extends BaseComponent {
  constructor(public data: string) {
    super({ tag: "svg" })

    this.setAttribute("viewBox", "0 0 24 24")
    this.setAttribute("width", "24")
    this.setAttribute("height", "24")

    const use = new BaseComponent({ tag: "use" })
    use.setAttribute("href", data)

    this.appendChildComponent(use)
  }
}
