import { EnumPages } from "./pages"

export type TRoute = {
  path: string
  callback: () => void
}

export default class Router {
  constructor(protected routes: TRoute[]) {
    document.addEventListener("DOMContentLoaded", () => {
      const path = this.getCurrentPath()
      this.navigate(path, true)
    })

    // globalThis.addEventListener("popstate", () => {
    //   this.browserChangeHandler.bind(this)
    // })

    globalThis.addEventListener("hashchange", () => {
      this.browserChangeHandler()
    })
  }

  public navigate(url: string, replace: boolean = false): void {
    const newHash = `#/${url}`
    if (replace) {
      location.replace(newHash)
    } else {
      location.hash = newHash
    }

    const route = this.routes.find((routeItem) => routeItem.path === url)
    if (!route) {
      this.redirectToNotFound()
      return
    }
    route.callback()
  }

  public redirectToNotFound(): void {
    const route = this.routes.find((routeItem) => routeItem.path === EnumPages.NOT_FOUND)
    if (!route) {
      return
    }
    route.callback()
  }

  public browserChangeHandler(): void {
    const path = this.getCurrentPath()
    this.navigate(path, true)
  }

  public getCurrentPath(): string {
    return location.hash.slice(2) || ""
  }
}
