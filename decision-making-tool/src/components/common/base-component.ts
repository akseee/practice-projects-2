export interface IBaseComponentParameters {
  tag?: string
  classNames?: string[]
}

export default class BaseComponent {
  private children: BaseComponent[]
  private node: HTMLElement

  constructor(options: IBaseComponentParameters, ...children: BaseComponent[]) {
    const { tag = "div", classNames = [] } = options
    this.children = children

    this.node = document.createElement(tag)
    classNames.forEach((className) => this.node.classList.add(className))

    if (children.length > 0) {
      this.appendChildrenComponents(children)
    }
  }

  public appendChildrenComponents(children: BaseComponent[]): void {
    children.forEach((child): void => {
      this.appendChildComponent(child)
    })
  }

  public getNode(): HTMLElement {
    return this.node
  }

  public appendChildComponent(child: BaseComponent): void {
    this.children.push(child)
    this.node.append(child.getNode())
  }

  public getChildren(): BaseComponent[] {
    return this.children
  }

  public addListener(type: string, listener: (event: Event) => void): void {
    this.node.addEventListener(type, listener)
  }

  public removeListener(type: string, listener: (event: Event) => void): void {
    this.node.removeEventListener(type, listener)
  }

  protected destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy()
    })
  }

  protected destroy(): void {
    this.destroyChildren()
    this.node.remove()
  }
}
