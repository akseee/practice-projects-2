export const enum EnumPages {
  CHATS = "chats",
  ABOUT = "about",
  LOGIN = "login",
  NOT_FOUND = "not-found",
}

export type TRoutes = {
  name: EnumPages
  callback: () => void
}
