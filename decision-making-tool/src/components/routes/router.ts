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
      this.navigate(path, true)
    })

    globalThis.addEventListener("popstate", () => {
      this.browserChangeHandler.bind(this)
    })

    globalThis.addEventListener("hashchange", () => {
      this.browserChangeHandler.bind(this)
    })
  }

  public navigate(url: string, replace: boolean = false): void {
    if (replace) {
      history.replaceState({}, "", `/${url}`)
    } else {
      history.pushState({}, "", `/${url}`)
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
    const path = globalThis.location.pathname
    return path.startsWith("/") ? path.slice(1) : path
  }
}
