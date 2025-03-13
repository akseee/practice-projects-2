import BaseComponent from "../common/base-component"

interface IViewParameters {
  tag: string
  classNames: string[]
}

export abstract class View extends BaseComponent {
  constructor(parameters: IViewParameters) {
    const viewPrams = { tag: parameters.tag, classNames: parameters.classNames }
    super(viewPrams)
  }

  public getHtmlElement(): HTMLElement {
    return this.getNode()
  }
}
