import BaseComponent from "../../common/base-component"
import OptionsModel from "../../model/options-model"
import DecisionContent from "../../pages/decision-content/decision-content"
import NotFoundContent from "../../pages/not-found/not-found"
import PickingContent from "../../pages/picking-content/picking-content"
import { EnumPages } from "../../routes/pages"
import Router, { type TRoute } from "../../routes/router"

import { View } from "../view"

const enum CSSClasses {
  WRAPPER = "wrapper",
  MAIN = "main",
}

export default class MainView extends View {
  protected router: Router

  public decisionContent: DecisionContent
  public pickingContent: PickingContent
  public notFound: NotFoundContent

  public model: OptionsModel

  private components: BaseComponent[]
  constructor() {
    super({
      tag: "main",
      classNames: [CSSClasses.WRAPPER, CSSClasses.MAIN],
    })

    const routes = this.createRoutes()
    this.router = new Router(routes)

    this.model = new OptionsModel()

    this.decisionContent = new DecisionContent(this.router, this.model)
    this.pickingContent = new PickingContent(this.router, this.model)
    this.notFound = new NotFoundContent(this.router)

    this.components = [this.decisionContent, this.pickingContent, this.notFound]
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

  public createRoutes(): TRoute[] {
    return [
      {
        path: ``,
        callback: (): void => {
          this.setContent(this.decisionContent)
        },
      },
      {
        path: EnumPages.WHEEL,
        callback: (): void => {
          this.setContent(this.pickingContent)
          this.pickingContent.updateWheel()
        },
      },
      {
        path: EnumPages.DECISION,
        callback: (): void => {
          this.setContent(this.decisionContent)
        },
      },
      {
        path: EnumPages.NOT_FOUND,
        callback: (): void => {
          this.setContent(this.notFound)
        },
      },
    ]
  }
}
