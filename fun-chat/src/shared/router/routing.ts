import type UserState from "../../services/user-state-service"
import { EnumPages } from "./routes"

export type TRoute = {
  path: string
  callback: () => void
  isProtected?: boolean
  isUnauth?: boolean
}

export default class Router {
  constructor(
    protected routes: TRoute[],
    protected userState: UserState,
  ) {
    document.addEventListener("DOMContentLoaded", () => {
      const path = this.getCurrentPath()
      this.navigate(path, true)
    })

    globalThis.addEventListener("hashchange", () => {
      this.browserChangeHandler()
    })
  }

  public navigate(url: string, replace: boolean = false): void {
    const route = this.routes.find((routeItem) => routeItem.path === url)
    if (!route) {
      this.redirectToNotFound()
      return
    }

    const isAuth = this.userState.currentUser()

    if (route.isProtected && !isAuth) {
      this.navigate(EnumPages.LOGIN, true)
      return
    }

    if (isAuth && route.isUnauth) {
      this.navigate(EnumPages.CHATS, true)
      return
    }

    const newHash = `#/${url}`

    if (replace) {
      if (location.hash !== newHash) {
        history.replaceState(null, "", location.pathname + newHash)
      }
    } else {
      if (location.hash !== newHash) {
        location.hash = `/${url}`
      }
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
