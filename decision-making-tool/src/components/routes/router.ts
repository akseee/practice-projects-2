import { EnumPages } from "./pages"

export type TRoute = {
  path: string
  callback: () => void
}

// type TParameters = {
//   path: string
//   resource: string
// }

export default class Router {
  constructor(protected routes: TRoute[]) {
    document.addEventListener("DOMContentLoaded", () => {
      const path = this.getCurrentPath()
      this.navigate(path)
    })

    globalThis.addEventListener("popstate", () => {
      this.browserChangeHandler.bind(this)
    })

    globalThis.addEventListener("hashchange", () => {
      this.browserChangeHandler.bind(this)
    })
  }

  public navigate(url: string): void {
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
    this.navigate(path)
  }

  public getCurrentPath(): string {
    if (globalThis.location.hash) {
      return globalThis.location.hash.slice(1)
    }
    return globalThis.location.pathname.slice(1)
  }

  // public parseUrl(url: string): TParameters {
  //   const result: TParameters = {}
  //   const path = url.split("/")
  //   ;[result.path = "", result.resource = ""] = path
  //   return result
  // }
}
