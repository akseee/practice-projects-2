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
  constructor(protected routes: TRoute[]) {}

  public navigate(url: string): void {
    const route = this.routes.find((routeItem) => routeItem.path === url)
    if (!route) {
      this.redirectToNotFound()
      return
    }
    console.log(route.callback)
    route.callback()
  }

  public redirectToNotFound(): void {
    const route = this.routes.find((routeItem) => routeItem.path === EnumPages.NOT_FOUND)
    if (!route) {
      return
    }
    route.callback()
  }
  // public parseUrl(url: string): TParameters {
  //   const result: TParameters = {}
  //   const path = url.split("/")
  //   ;[result.path = "", result.resource = ""] = path
  //   return result
  // }
}
