interface IBaseComponentParameters {
  tag?: string
  classNames?: string[]
}

export default class BaseComponent {
  private children: BaseComponent[]
  private node: HTMLElement

  constructor(options: IBaseComponentParameters, ...children: BaseComponent[]) {
    const { tag = "div", classNames = [] } = options
    this.children = []

    this.node = document.createElement(tag)
    classNames.forEach((className) => this.node.classList.add(className))

    if (children.length > 0) {
      this.appendChildrenComponents(children)
    }
  }

  public getNode(): HTMLElement {
    return this.node
  }

  public appendChildrenComponents(children: BaseComponent[]): void {
    children.forEach((child): void => {
      this.appendChildComponent(child)
    })
  }

  public appendChildComponent(child: HTMLElement | BaseComponent): void {
    const node = child instanceof BaseComponent ? child.getNode() : child

    if (!this.node.contains(node)) {
      this.node.append(node)
    }

    if (child instanceof BaseComponent && !this.children.includes(child)) {
      this.children.push(child)
    }
  }

  public removeChildComponent(child: HTMLElement | BaseComponent): void {
    const childNode = child instanceof BaseComponent ? child.getNode() : child

    if (this.node.contains(childNode)) {
      childNode.remove()
    }

    if (child instanceof BaseComponent) {
      const index = this.children.indexOf(child)
      if (index !== -1) {
        this.children.splice(index, 1)
      }
    }
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

  public destroyChildren(): void {
    this.children.forEach((child) => child.destroy())
    this.children.length = 0
  }

  public destroy(): void {
    this.destroyChildren()
    this.node.remove()
  }

  public setTextContent(text: string): void {
    this.node.textContent = text
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value)
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute)
  }

  public addClass(name: string): void {
    this.node.classList.add(name)
  }

  public removeClass(name: string): void {
    this.node.classList.remove(name)
  }

  public hide(): void {
    this.node.style.display = "none"
  }

  public show(): void {
    this.node.style.display = ""
  }
}
