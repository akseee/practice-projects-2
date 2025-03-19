import BaseComponent from "../../common/base-component"
import type Router from "../../routes/router"

const CSSClasses = {
  ERROR: "not-found",
  ERROR_TEXT: "error-text",
}

export default class NotFoundContent extends BaseComponent {
  constructor(public router: Router) {
    super({ tag: "section", classNames: [] })

    this.appendChildrenComponents([])

    this.setErrorPage()
  }

  public setErrorPage(): void {
    const notFound = new BaseComponent({ tag: "h3", classNames: [CSSClasses.ERROR_TEXT] })
    notFound.setTextContent("Sorry, this page doesnt exist")
    this.appendChildComponent(notFound)
  }
}
