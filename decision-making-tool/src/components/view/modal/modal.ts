import BaseComponent from "../../common/base-component"
import Button from "../../common/button"

const enum CSSClasses {
  MODAL_WRAPPER = "modal-wrapper",
  MODAL_CONTAINER = "modal-container",
  MODAL_CONTENT = "modal-content",
  MODAL_TEXTAREA = "textarea",
  MODAL_TEXT = "text",
}

export default class Modal extends BaseComponent {
  public container: BaseComponent
  public content: BaseComponent

  constructor(public data: string) {
    super({ tag: "div", classNames: [CSSClasses.MODAL_WRAPPER] })
    this.container = new BaseComponent({ tag: "div", classNames: [CSSClasses.MODAL_CONTAINER] })
    this.content = new BaseComponent({ tag: "div", classNames: [CSSClasses.MODAL_CONTENT] })

    this.addListener("click", (event: Event) => {
      const target = event.target
      if (target instanceof HTMLElement && !target.closest(`.${CSSClasses.MODAL_CONTAINER}`)) {
        this.close()
      }
    })
    this.appendChildComponent(this.container)

    this.configureButtons()
    this.container.appendChildrenComponents([this.content])

    // this.configureTextarea(data)
    this.configureText(data)
  }

  public open(): void {
    document.body.append(this.getNode())
  }

  public close(): void {
    this.getNode().remove()
  }

  protected configureButtons(): void {
    const cancelButton = new Button("cancel", () => this.handleCancel())
    const confirmButton = new Button("confirm", () => this.handleConfirm())

    this.container.appendChildrenComponents([cancelButton, confirmButton])
  }

  public configureText(data: string): void {
    const text = new BaseComponent({ tag: "p", classNames: [CSSClasses.MODAL_TEXT] })
    text.setTextContent(data)
    this.content.appendChildComponent(text)
  }

  public configureTextarea(placeholder: string): void {
    const textArea = new BaseComponent({ tag: "input", classNames: [CSSClasses.MODAL_TEXTAREA] })
    textArea.setAttribute("placeholder", placeholder)
    this.content.appendChildComponent(textArea)
  }

  protected handleCancel(): void {
    this.close()
  }

  protected handleConfirm(): void {
    this.close()
  }
}
