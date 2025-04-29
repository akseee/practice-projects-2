import BaseComponent from "../../shared/view/base-component"

export default class Notifications extends BaseComponent {
  constructor() {
    super({ tag: "div", classNames: ["notifications"] })
  }

  public addNotification(text: string, type: string): void {
    const notification = new BaseComponent({ tag: "div", classNames: ["notification"] })
    const content = new BaseComponent({ tag: "p", classNames: ["notification__text"] })

    content.setTextContent(text)

    notification.appendChildComponent(content)

    if (type === "error") {
      notification.addClass("error")
      notification.removeClass("user")
    } else {
      notification.removeClass("error")
      notification.addClass("user")
    }
    this.appendChildComponent(notification)

    this.hideNotification(notification)
  }

  public checkChildren(): void {
    if (this.getChildren().length === 0 && this.getNode().parentNode) {
      this.destroy()
    }
  }

  public showNotification(text: string, type: string): void {
    if (!document.body.contains(this.getNode())) {
      document.querySelector(".body")!.append(this.getNode())
    }

    this.addNotification(text, type)
  }

  public hideNotification(element: BaseComponent): void {
    setTimeout(() => {
      this.removeChildComponent(element)
      element.destroy()
      this.checkChildren()
    }, 2000)
  }
}
