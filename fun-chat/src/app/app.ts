import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import MainLayout from "./layout/main-layout"

export default class App {
  constructor() {}

  public render(): void {
    const main = new MainLayout()
    const footer = new Footer()
    const header = new Header()

    document.body.classList.add("body")
    document.body.append(header.getHtmlElement())
    document.body.append(main.getHtmlElement())
    document.body.append(footer.getHtmlElement())
  }
}
