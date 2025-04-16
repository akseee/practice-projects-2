import BaseComponent from "../../shared/base-component"
// import { EnumPages } from "../../shared/routes"
import { View } from "../../shared/view"
// import Router, { type TRoute } from "../routing"

export default class MainLayout extends View {
  // protected router: Router
  private components: BaseComponent[]
  constructor() {
    super({
      tag: "main",
      classNames: ["main"],
    })

    // const routes = this.createRoutes()
    // this.router = new Router(routes)

    this.components = []
    this.components.forEach((element) => {
      this.appendChildComponent(element)
    })

    this.appendChildrenComponents(this.components)
  }

  public setContent(component: HTMLElement | BaseComponent): void {
    this.components.forEach((element) => {
      element.hide()
    })

    if (component instanceof BaseComponent) {
      component.show()
    } else {
      component.style.display = ""
    }
  }

  // public createRoutes(): TRoute[] {
  //   return [
  //     {
  //       path: "",
  //       callback: (): void => {
  //         this.setContent()
  //       },
  //     },
  //     {
  //       path: EnumPages.CHATS,
  //       callback: (): void => {
  //         this.setContent()
  //       },
  //     },

  //     {
  //       path: EnumPages.ABOUT,
  //       callback: (): void => {
  //         this.setContent()
  //       },
  //     },

  //     {
  //       path: EnumPages.NOT_FOUND,
  //       callback: (): void => {
  //         this.setContent()
  //       },
  //     },
  //   ]
  // }
}
